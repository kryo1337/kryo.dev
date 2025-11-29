'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, Center, Resize, OrbitControls } from '@react-three/drei';
import { useMemo } from 'react';
import { Mesh, DoubleSide } from 'three';

useGLTF.preload('/models/skull.glb');

function Skull() {
  const { nodes } = useGLTF('/models/skull.glb');

  const geometry = useMemo(() => {
    const foundNode = Object.values(nodes).find((node) => (node as Mesh).isMesh);
    return foundNode ? (foundNode as Mesh).geometry : null;
  }, [nodes]);

  const geo = geometry || undefined;

  return (
    <group dispose={null}>
      <Resize scale={1.5}>
        <mesh rotation={[0, 0, 0]}>
          {geo ? (
            <primitive object={geo} attach="geometry" />
          ) : (
            <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          )}

          <meshStandardMaterial
            color="#E0B0FF"
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

export default function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas style={{ background: 'transparent' }} camera={{ position: [0, 0, 5], fov: 30, near: 0.1, far: 100 }}>
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <ambientLight intensity={1} />

        <group rotation={[-1.5, 0, 0]}>
          <Center>
            <Skull />
          </Center>
        </group>

        <Environment preset="city" />
        <OrbitControls
          autoRotate
          autoRotateSpeed={5}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
