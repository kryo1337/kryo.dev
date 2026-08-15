'use client';

import { useEffect, useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import { NearestFilter, SRGBColorSpace } from 'three';
import { Project } from '@/lib/data';

const BODY = '#1c1b22';
const BODY_LIGHT = '#2a2933';

function marqueeColor(project: Project): string {
  if (project.wip) return '#eab308';
  return project.isOpenSource ? '#22c55e' : '#e11d48';
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

  const { screenTex, sideTex, deckTex, screenSize } = useMemo(() => {
    const [screen, side, deck] = loaded.map((source) => source.clone());
    screen.colorSpace = SRGBColorSpace;
    for (const tex of [side, deck]) {
      tex.magFilter = NearestFilter;
      tex.minFilter = NearestFilter;
      tex.colorSpace = SRGBColorSpace;
    }
    const image = screen.image as { width?: number; height?: number } | undefined;
    const aspect = image?.width && image?.height ? image.width / image.height : 1.6;
    const width = Math.min(1.2, 0.75 * aspect);
    return {
      screenTex: screen,
      sideTex: side,
      deckTex: deck,
      screenSize: [width, width / aspect] as [number, number],
    };
  }, [loaded]);

  useEffect(
    () => () => {
      for (const tex of [screenTex, sideTex, deckTex]) tex.dispose();
    },
    [screenTex, sideTex, deckTex]
  );

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 1.1, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 2.2, 0.7]} />
        <meshStandardMaterial color={BODY} roughness={0.9} />
      </mesh>

      <mesh position={[-0.85, 1.1, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 2.2, 0.9]} />
        <meshStandardMaterial map={sideTex} roughness={1} />
      </mesh>
      <mesh position={[0.85, 1.1, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 2.2, 0.9]} />
        <meshStandardMaterial map={sideTex} roughness={1} />
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
          emissiveIntensity={highlighted ? 3 : 1.6}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 1.55, 0.26]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[1.34, 0.92, 0.06]} />
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

      <mesh position={[0, 0.92, 0.35]} rotation={[-0.35, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 0.14, 0.5]} />
        <meshStandardMaterial map={deckTex} roughness={1} />
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
