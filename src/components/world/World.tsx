'use client';

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { KeyboardControls, PointerLockControls, Sky } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  BrightnessContrast,
  GodRays,
  HueSaturation,
  SMAA,
  Vignette,
} from '@react-three/postprocessing';
import { BoxGeometry, Camera, EdgesGeometry, Group, InstancedMesh, Matrix4, Mesh, MeshBasicMaterial, Object3D, Quaternion } from 'three';
import { personalProjects } from '@/lib/data';
import { BLOCK_DEFS, BlockId, EDITS, hash2, MACHINE_FORWARD, mapVersions, PLAYER_STATE, resetWorld, valueNoise, WORLD } from './map';
import VoxelMap from './VoxelMap';
import Decorations from './Decorations';
import Lanterns from './Lanterns';
import Player from './Player';
import ArcadeMachine from './ArcadeMachine';
import NameTag from './NameTag';
import ProjectPanel from './ProjectPanel';
import { disposeMeshes } from './dispose';

type PointerLockControlsImpl = { lock: () => void; unlock: () => void; domElement?: HTMLElement; camera: Camera };

const KEY_MAP = [
  { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
  { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
  { name: 'left', keys: ['KeyA', 'ArrowLeft'] },
  { name: 'right', keys: ['KeyD', 'ArrowRight'] },
  { name: 'jump', keys: ['Space'] },
];


const GLOWSTONE_LIGHTS: [number, number, number][] = [
  [0.5, 5.2, 0.5],
  [-11.5, 2.6, -11.5],
  [-11.5, 2.6, 12.5],
  [12.5, 2.6, 12.5],
  [12.5, 2.6, -11.5],
  [-11.5, 2.6, 0.5],
  [12.5, 2.6, 0.5],
  [0.5, 2.6, -11.5],
  [0.5, 2.6, 12.5],
];

function VoxelClouds() {
  const group = useRef<Group>(null);

  const mesh = useMemo(() => {
    const spots: [number, number][] = [];
    for (let x = -160; x <= 160; x += 8) {
      for (let z = -160; z <= 160; z += 8) {
        if (valueNoise(x, z, 24) > 0.58) spots.push([x, z]);
      }
    }
    const geometry = new BoxGeometry(8, 1.6, 8);
    const material = new MeshBasicMaterial({
      color: '#d9a58e',
      transparent: true,
      opacity: 0.55,
      fog: false,
    });
    const instanced = new InstancedMesh(geometry, material, spots.length);
    const matrix = new Matrix4();
    spots.forEach(([x, z], i) => {
      matrix.setPosition(x, 64 + hash2(x, z) * 3, z);
      instanced.setMatrixAt(i, matrix);
    });
    instanced.instanceMatrix.needsUpdate = true;
    return instanced;
  }, []);

  useEffect(() => () => disposeMeshes([mesh]), [mesh]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.position.x = ((group.current.position.x + delta * 0.7 + 160) % 320) - 160;
  });

  return (
    <group ref={group}>
      <primitive object={mesh} />
    </group>
  );
}

const PALETTE: BlockId[] = [
  'brick',
  'chiseled',
  'slabBrick',
  'stairBrick',
  'fenceBrick',
  'glowstone',
  'lantern',
  'stone',
  'planks',
  'log',
  'logBirch',
  'leaves',
  'leavesOrange',
  'leavesPine',
  'hedge',
  'grass',
  'dirt',
  'path',
  'lamp',
  'water',
];

const BUILD_ENABLED = process.env.NODE_ENV === 'development';

const CONTROLS: [string, string][] = [
  ['WASD', 'Move'],
  ['Space', 'Jump'],
  ['Mouse', 'Look around'],
  ['E', 'Inspect machine'],
  ...(BUILD_ENABLED
    ? ([
        ['B', 'Build mode'],
        ['Scroll', 'Pick block'],
        ['LMB / RMB', 'Break / Place'],
      ] as [string, string][])
    : []),
  ['Esc', 'Pause'],
];

const MC_BUTTON =
  'font-minecraft px-6 py-2.5 text-sm text-white bg-[#727272] hover:bg-[#8a8a9e] border-2 border-black shadow-[inset_-2px_-4px_0_rgba(0,0,0,0.4),inset_2px_2px_0_rgba(255,255,255,0.35)] [text-shadow:2px_2px_0_rgba(0,0,0,0.5)] cursor-pointer';

const LOW_END =
  typeof navigator !== 'undefined' &&
  ((navigator.hardwareConcurrency ?? 8) <= 4 || ((navigator as { deviceMemory?: number }).deviceMemory ?? 8) <= 4);

export default function World() {
  const controlsRef = useRef<PointerLockControlsImpl | null>(null);
  const [locked, setLocked] = useState(false);
  const [near, setNear] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [resumeHint, setResumeHint] = useState(false);
  const lockChangeAt = useRef(0);
  const savedQuat = useRef<Quaternion | null>(null);
  const dropNextMove = useRef(false);
  const requestLock = useCallback(() => {
    const el = controlsRef.current?.domElement;
    if (!el || document.pointerLockElement === el) return;
    try {
      const p = el.requestPointerLock() as unknown as Promise<void> | undefined;
      p?.catch?.(() => setResumeHint(true));
    } catch {
      setResumeHint(true);
    }
  }, []);
  const onLock = useCallback(() => {
    lockChangeAt.current = performance.now();
    if (savedQuat.current) controlsRef.current?.camera.quaternion.copy(savedQuat.current);
    dropNextMove.current = true;
    setLocked(true);
    setActiveProject(null);
    setResumeHint(false);
  }, []);
  const onUnlock = useCallback(() => {
    lockChangeAt.current = performance.now();
    savedQuat.current = controlsRef.current?.camera.quaternion.clone() ?? null;
    setLocked(false);
  }, []);

  useEffect(() => {
    const filter = (e: MouseEvent) => {
      if (!document.pointerLockElement) return;
      if (dropNextMove.current) {
        dropNextMove.current = false;
        lockChangeAt.current = performance.now();
        e.stopImmediatePropagation();
        return;
      }
      const recent = performance.now() - lockChangeAt.current < 300;
      if (recent && (Math.abs(e.movementX) > 250 || Math.abs(e.movementY) > 250)) e.stopImmediatePropagation();
    };
    window.addEventListener('mousemove', filter, true);
    return () => window.removeEventListener('mousemove', filter, true);
  }, []);
  const [sun, setSun] = useState<Mesh | null>(null);
  const [buildMode, setBuildMode] = useState(false);
  const [selected, setSelected] = useState(0);
  const [versions, setVersions] = useState(() => {
    resetWorld();
    return mapVersions();
  });
  const onMapChange = useCallback(() => setVersions(mapVersions()), []);
  const highlightRef = useRef<Object3D | null>(null);
  const highlightEdges = useMemo(() => new EdgesGeometry(new BoxGeometry(1.02, 1.02, 1.02)), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyE' && locked && near !== null && activeProject === null) {
        setActiveProject(WORLD.machines[near].projectIndex);
        controlsRef.current?.unlock();
      }

      if (e.code === 'KeyB' && locked && BUILD_ENABLED) {
        setBuildMode((b) => !b);
      }
      if (e.code === 'KeyG' && locked && BUILD_ENABLED) {
        const json = JSON.stringify(EDITS);
        const pos = `PLAYER ${JSON.stringify({
          x: +PLAYER_STATE.x.toFixed(2),
          y: +PLAYER_STATE.y.toFixed(2),
          z: +PLAYER_STATE.z.toFixed(2),
          yaw: +PLAYER_STATE.yaw.toFixed(2),
        })}`;
        console.log(pos);
        console.log('WORLD_EDITS', json);
        navigator.clipboard?.writeText(json).catch(() => {});
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Escape' && activeProject !== null) {
        setActiveProject(null);
        setResumeHint(true);
        requestLock();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [locked, near, activeProject, requestLock]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!locked || !buildMode) return;
      setSelected((s) => (s + (e.deltaY > 0 ? 1 : PALETTE.length - 1)) % PALETTE.length);
    };
    const onContextMenu = (e: Event) => {
      if (document.pointerLockElement) e.preventDefault();
    };
    window.addEventListener('wheel', onWheel);
    document.addEventListener('contextmenu', onContextMenu);
    return () => {
      window.removeEventListener('wheel', onWheel);
      document.removeEventListener('contextmenu', onContextMenu);
    };
  }, [locked, buildMode]);

  return (
    <div className="fixed inset-0 bg-[#0e0d12]">
      <KeyboardControls map={KEY_MAP}>
        <Canvas
          shadows={LOW_END ? true : 'soft'}
          dpr={LOW_END ? 1 : [1, 1.5]}
          gl={{ antialias: false, stencil: false, powerPreference: 'high-performance' }}
          camera={{ fov: 75, near: 0.1, far: 300 }}
        >
          <Suspense fallback={null}>
            <Sky
              sunPosition={[40, 15, -28]}
              turbidity={12}
              rayleigh={5}
              mieCoefficient={0.006}
              mieDirectionalG={0.95}
            />
            <fog attach="fog" args={['#8f5e56', 45, 170]} />
            <hemisphereLight args={['#5d548f', '#3a2f2a', 0.5]} />
            <ambientLight color="#665884" intensity={0.28} />
            <directionalLight
              position={[40, 20, -28]}
              color="#ff9a54"
              intensity={1.4}
              castShadow
              shadow-mapSize={LOW_END ? [1024, 1024] : [2048, 2048]}
              shadow-camera-left={-55}
              shadow-camera-right={55}
              shadow-camera-top={55}
              shadow-camera-bottom={-55}
              shadow-camera-far={180}
              shadow-bias={-0.0004}
            />
            {GLOWSTONE_LIGHTS.map((p, i) => (
              <pointLight key={i} position={p} color="#ffd080" intensity={10} distance={12} decay={1.8} />
            ))}
            <mesh ref={(m: Mesh | null) => setSun(m)} position={[185, 82, -130]}>
              <sphereGeometry args={[6, 24, 24]} />
              <meshBasicMaterial color="#e8894a" fog={false} />
            </mesh>
            <VoxelClouds />

            <VoxelMap versions={versions} />
            <Decorations version={versions.decor} />
            <Lanterns version={versions.layers.get('lantern') ?? 0} />
            <lineSegments
              ref={(o: Object3D | null) => {
                highlightRef.current = o;
              }}
              geometry={highlightEdges}
              visible={false}
            >
              <lineBasicMaterial color="#ffffff" />
            </lineSegments>
            {WORLD.machines.map((m, i) => (
              <ArcadeMachine
                key={i}
                position={[m.x + 0.5 + Math.sin(m.rotationY) * MACHINE_FORWARD, 1, m.z + 0.5 + Math.cos(m.rotationY) * MACHINE_FORWARD]}
                rotationY={m.rotationY}
                project={personalProjects[m.projectIndex]}
                highlighted={near === i}
              />
            ))}
            {WORLD.machines.map((m, i) => (
              <NameTag
                key={`tag${i}`}
                text={personalProjects[m.projectIndex].title}
                position={[m.x + 0.5, 3.9, m.z + 0.5]}
              />
            ))}

            <Player
              active={locked && activeProject === null}
              buildMode={buildMode}
              selectedBlock={PALETTE[selected]}
              highlightRef={highlightRef}
              onMapChange={onMapChange}
              onNearMachine={setNear}
              onPickBlock={(id) => {
                const i = PALETTE.indexOf(id);
                if (i >= 0) setSelected(i);
              }}
            />
            <PointerLockControls
              ref={(instance) => {
                controlsRef.current = instance as PointerLockControlsImpl | null;
              }}
              pointerSpeed={1.8}
              selector="#no-auto-lock"
              onLock={onLock}
              onUnlock={onUnlock}
            />

            {sun && !LOW_END && (
              <EffectComposer>
                <SMAA />
                <GodRays sun={sun} samples={40} density={0.94} decay={0.92} weight={0.09} exposure={0.08} clampMax={1} blur />
                <Bloom mipmapBlur luminanceThreshold={1} intensity={0.85} />
                <HueSaturation saturation={0.18} />
                <BrightnessContrast contrast={0.07} />
                <Vignette offset={0.25} darkness={0.5} />
              </EffectComposer>
            )}
            {sun && LOW_END && (
              <EffectComposer multisampling={0}>
                <Bloom mipmapBlur luminanceThreshold={1} intensity={0.7} />
                <Vignette offset={0.25} darkness={0.5} />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      </KeyboardControls>

      {locked && (
        <>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="w-1 h-1 bg-white/90 shadow-[0_0_2px_rgba(0,0,0,0.8)]" />
          </div>
          {near !== null && activeProject === null && (
            <div className="absolute left-1/2 bottom-16 -translate-x-1/2 z-20 pointer-events-none">
              <span className="font-minecraft text-sm text-white bg-black/60 border-2 border-black px-4 py-2 [text-shadow:2px_2px_0_rgba(0,0,0,0.8)]">
                Press E to inspect
              </span>
            </div>
          )}
          {buildMode && (
            <div className="absolute left-1/2 bottom-4 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-3 bg-black/60 border-2 border-black px-4 py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BLOCK_DEFS[PALETTE[selected]].side}
                alt={PALETTE[selected]}
                className="w-8 h-8 border-2 border-black"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="font-minecraft text-[10px] text-white leading-relaxed [text-shadow:2px_2px_0_rgba(0,0,0,0.8)]">
                <p>{PALETTE[selected]}</p>
                <p className="text-white/60">scroll block · MMB pick · RMB place · LMB break · G export</p>
              </div>
            </div>
          )}
        </>
      )}

      {activeProject !== null && (
        <ProjectPanel
          project={personalProjects[activeProject]}
          onClose={() => {
            setActiveProject(null);
            requestLock();
          }}
        />
      )}

      {!locked && activeProject === null && resumeHint && (
        <div className="absolute inset-0 z-30 flex items-end justify-center pb-10 cursor-pointer" onClick={requestLock}>
          <span className="font-minecraft text-xs text-white/90 bg-black/50 px-4 py-2 [text-shadow:2px_2px_0_rgba(0,0,0,0.6)]">
            click to resume
          </span>
        </div>
      )}

      {!locked && activeProject === null && !resumeHint && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg bg-[#2a2933] border-4 border-black shadow-[inset_2px_2px_0_rgba(255,255,255,0.15),inset_-2px_-2px_0_rgba(0,0,0,0.5)] p-8 space-y-6">
            <h1 className="font-minecraft text-3xl text-center text-mauve [text-shadow:3px_3px_0_rgba(0,0,0,0.6)]">
              kryo&apos;s world
            </h1>
            <div className="grid grid-cols-2 gap-2">
              {CONTROLS.map(([keyName, desc]) => (
                <div
                  key={keyName}
                  className="flex items-center justify-between gap-3 bg-[#1c1b22] border-2 border-black shadow-[inset_1px_1px_0_rgba(255,255,255,0.08)] px-3 py-2"
                >
                  <span className="font-minecraft text-xs text-white/70">{desc}</span>
                  <span className="font-minecraft text-xs text-white bg-[#727272] border-2 border-black px-2 py-1 shadow-[inset_-1px_-2px_0_rgba(0,0,0,0.4),inset_1px_1px_0_rgba(255,255,255,0.35)] [text-shadow:1px_1px_0_rgba(0,0,0,0.5)]">
                    {keyName}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={requestLock} className={`${MC_BUTTON} w-full text-base bg-mauve-dark hover:bg-mauve`}>
                Click to play
              </button>
              <Link href="/" className={`${MC_BUTTON} w-full text-xs text-center`}>
                Back to kryo.dev
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
