'use client';

import { useEffect, useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import {
  MeshStandardMaterial,
  NearestFilter,
  NearestMipmapLinearFilter,
  RepeatWrapping,
  SRGBColorSpace,
  Texture,
} from 'three';
import { Project } from '@/lib/data';

const BODY = '#1c1b22';
const BODY_LIGHT = '#2a2933';

const TILE_SIZE = 0.75;

const TILED_MATERIALS = new Map<string, MeshStandardMaterial[]>();

function tiledBoxMaterials(source: Texture, [w, h, d]: [number, number, number]) {
  const cacheKey = `${source.uuid}|${w}|${h}|${d}`;
  const cached = TILED_MATERIALS.get(cacheKey);
  if (cached) return cached;
  const faces: [number, number][] = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  const materials = faces.map(([fw, fh]) => {
    const tex = source.clone();
    tex.wrapS = RepeatWrapping;
    tex.wrapT = RepeatWrapping;
    tex.repeat.set(fw / TILE_SIZE, fh / TILE_SIZE);
    tex.magFilter = NearestFilter;
    tex.minFilter = NearestMipmapLinearFilter;
    tex.anisotropy = 4;
    tex.colorSpace = SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.needsUpdate = true;
    return new MeshStandardMaterial({ map: tex, roughness: 1 });
  });
  TILED_MATERIALS.set(cacheKey, materials);
  return materials;
}

function marqueeColor(project: Project): string {
  if (project.isPrivate) return '#9d7cff';
  if (project.wip) return '#eab308';
  return project.isOpenSource ? '#22c55e' : '#ff2a55';
}

export default function ArcadeMachine({
  position,
  rotationY,
  project,
  highlighted,
}: {
  position: [number, number, number];
  rotationY: number;
  project: Project;
  highlighted: boolean;
}) {
  const loaded = useTexture([
    project.image,
    '/textures/wood_red.png',
    '/textures/wood.png',
  ]);

  const { screenTex, sideMaterials, deckMaterials, screenSize } = useMemo(() => {
    const [source, side, deck] = loaded;
    const screen = source.clone();
    screen.colorSpace = SRGBColorSpace;
    screen.anisotropy = 8;
    screen.needsUpdate = true;
    const image = screen.image as { width?: number; height?: number } | undefined;
    const aspect = image?.width && image?.height ? image.width / image.height : 1.6;
    const width = Math.min(1.34, 0.82 * aspect);
    return {
      screenTex: screen,
      sideMaterials: tiledBoxMaterials(side, [0.2, 2.2, 0.9]),
      deckMaterials: tiledBoxMaterials(deck, [1.5, 0.14, 0.5]),
      screenSize: [width, width / aspect] as [number, number],
    };
  }, [loaded]);

  useEffect(() => () => screenTex.dispose(), [screenTex]);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 1.1, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2.2, 0.7]} />
        <meshStandardMaterial color={BODY} roughness={0.9} />
      </mesh>

      <mesh position={[-0.85, 1.1, -0.1]} material={sideMaterials} castShadow receiveShadow>
        <boxGeometry args={[0.2, 2.2, 0.9]} />
      </mesh>
      <mesh position={[0.85, 1.1, -0.1]} material={sideMaterials} castShadow receiveShadow>
        <boxGeometry args={[0.2, 2.2, 0.9]} />
      </mesh>

      <mesh position={[0, 2.35, -0.05]} castShadow>
        <boxGeometry args={[1.9, 0.3, 0.85]} />
        <meshStandardMaterial color={BODY_LIGHT} roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.35, 0.38]}>
        <planeGeometry args={[1.8, 0.22]} />
        <meshStandardMaterial
          color={marqueeColor(project)}
          emissive={marqueeColor(project)}
          emissiveIntensity={highlighted ? 5 : 1.8}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 1.55, 0.26]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[1.46, 1.0, 0.06]} />
        <meshStandardMaterial color="#0a0a0d" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.55, 0.3]} rotation={[-0.12, 0, 0]}>
        <planeGeometry args={screenSize} />
        <meshStandardMaterial
          map={screenTex}
          emissiveMap={screenTex}
          emissive="#ffffff"
          emissiveIntensity={1.1}
          toneMapped={false}
          roughness={0.6}
        />
      </mesh>

      <mesh position={[0, 0.92, 0.35]} rotation={[-0.35, 0, 0]} material={deckMaterials} castShadow>
        <boxGeometry args={[1.5, 0.14, 0.5]} />
      </mesh>
      {[-0.35, 0, 0.35].map((x, i) => (
        <mesh key={i} position={[x, 1.02, 0.42]} rotation={[-0.35, 0, 0]}>
          <boxGeometry args={[0.12, 0.05, 0.12]} />
          <meshStandardMaterial
            color={['#e04444', '#44c060', '#4488e0'][i]}
            emissive={['#e04444', '#44c060', '#4488e0'][i]}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      <mesh position={[-0.6, 0.05, 0.15]} castShadow>
        <boxGeometry args={[0.25, 0.1, 0.25]} />
        <meshStandardMaterial color={BODY} />
      </mesh>
      <mesh position={[0.6, 0.05, 0.15]} castShadow>
        <boxGeometry args={[0.25, 0.1, 0.25]} />
        <meshStandardMaterial color={BODY} />
      </mesh>
    </group>
  );
}
