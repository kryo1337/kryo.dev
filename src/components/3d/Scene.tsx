'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Center, Resize, OrbitControls } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import { Mesh, DoubleSide, Group } from 'three';

useGLTF.preload('/models/skull.glb');

function Skull() {
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

function RotatingGroup({ children, isRotating }: { children: React.ReactNode; isRotating: boolean }) {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
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

export default function Scene() {
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

        <RotatingGroup isRotating={isRotating}>
          <Center>
            <Skull />
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
