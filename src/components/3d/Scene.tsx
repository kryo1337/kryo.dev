'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Center, Resize, OrbitControls } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import { Mesh, DoubleSide, Group, Vector3 } from 'three';

useGLTF.preload('/models/skull.glb');

function Skull({ color }: { color: string }) {
  const { nodes } = useGLTF('/models/skull.glb');

  const geometry = useMemo(() => {
    const foundNode = Object.values(nodes).find((node): node is Mesh => (node as Mesh).isMesh);
    return foundNode?.geometry ?? null;
  }, [nodes]);

  return (
    <group dispose={null}>
      <Resize scale={1.5}>
        <mesh rotation={[0, 0, 0]}>
          {geometry ? (
            <primitive object={geometry} attach="geometry" />
          ) : (
            <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          )}

          <meshStandardMaterial
            color={color}
            metalness={1}
            roughness={0.2}
            envMapIntensity={1}
            side={DoubleSide}
          />
        </mesh>
      </Resize>
    </group>
  );
}

function CameraReset({ isRotating }: { isRotating: boolean }) {
  const { camera } = useThree();
  const target = useMemo(() => new Vector3(0, 0, 5), []);

  useFrame((state, delta) => {
    if (isRotating) {
      if (camera.position.distanceTo(target) > 0.01) {
        state.camera.position.lerp(target, 4 * delta);
        state.camera.position.setLength(5);
        state.camera.lookAt(0, 0, 0);
      }
    }
  });
  return null;
}

function RotatingGroup({ children, isRotating, onReady }: { children: React.ReactNode; isRotating: boolean; onReady?: () => void }) {
  const groupRef = useRef<Group>(null);
  const readyRef = useRef(false);

  useFrame((state, delta) => {
    if (!readyRef.current && onReady) {
      readyRef.current = true;
      onReady();
    }

    if (groupRef.current && isRotating) {
      groupRef.current.rotation.z += delta * 1;
      if (groupRef.current.rotation.z > Math.PI * 2) {
        groupRef.current.rotation.z -= Math.PI * 2;
      }
    }
  });

  return (
    <group ref={groupRef} rotation={[-1.5, 0, 0]}>
      {children}
    </group>
  );
}

export default function Scene({ onReady, skullColor = '#E0B0FF' }: { onReady?: () => void; skullColor?: string }) {
  const [isRotating, setIsRotating] = useState(true);

  return (
    <div className="w-full h-full relative" style={{ minHeight: '300px' }}>
      <Canvas
        style={{ background: 'transparent' }}
        camera={{ position: [0, 0, 5], fov: 30, near: 0.1, far: 100 }}
        gl={{
          preserveDrawingBuffer: true,
          alpha: true,
          powerPreference: 'high-performance',
          antialias: true,
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <ambientLight intensity={1} />

        <CameraReset isRotating={isRotating} />

        <RotatingGroup isRotating={isRotating} onReady={onReady}>
          <Center>
            <Skull color={skullColor} />
          </Center>
        </RotatingGroup>

        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          onStart={() => setIsRotating(false)}
          onEnd={() => setIsRotating(true)}
        />
      </Canvas>
    </div>
  );
}
