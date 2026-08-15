'use client';

import { useEffect, useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import {
  BoxGeometry,
  Color,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  NearestFilter,
  Quaternion,
  SRGBColorSpace,
  Vector3,
} from 'three';
import { layerPositions } from './map';
import { disposeMeshes } from './dispose';

interface Part {
  size: [number, number, number];
  offset: [number, number, number];
  material: 'core' | 'frame' | 'cap';
}

const PARTS: Part[] = [
  { size: [0.42, 0.5, 0.42], offset: [0, 0.3, 0], material: 'core' },
  { size: [0.56, 0.1, 0.56], offset: [0, 0.05, 0], material: 'frame' },
  { size: [0.56, 0.1, 0.56], offset: [0, 0.55, 0], material: 'frame' },
  { size: [0.1, 0.6, 0.1], offset: [0.23, 0.3, 0.23], material: 'frame' },
  { size: [0.1, 0.6, 0.1], offset: [-0.23, 0.3, 0.23], material: 'frame' },
  { size: [0.1, 0.6, 0.1], offset: [0.23, 0.3, -0.23], material: 'frame' },
  { size: [0.1, 0.6, 0.1], offset: [-0.23, 0.3, -0.23], material: 'frame' },
  { size: [0.5, 0.12, 0.5], offset: [0, 0.66, 0], material: 'cap' },
  { size: [0.32, 0.12, 0.32], offset: [0, 0.78, 0], material: 'cap' },
  { size: [0.06, 0.16, 0.06], offset: [0.09, 0.9, 0], material: 'cap' },
  { size: [0.06, 0.16, 0.06], offset: [-0.09, 0.9, 0], material: 'cap' },
  { size: [0.24, 0.06, 0.06], offset: [0, 1.0, 0], material: 'cap' },
];

export default function Lanterns({ version }: { version: number }) {
  const loaded = useTexture('/textures/glowstone.png');

  const glowTex = useMemo(() => {
    const tex = loaded.clone();
    tex.magFilter = NearestFilter;
    tex.minFilter = NearestFilter;
    tex.colorSpace = SRGBColorSpace;
    tex.generateMipmaps = false;
    return tex;
  }, [loaded]);

  useEffect(() => () => glowTex.dispose(), [glowTex]);

  const spots = layerPositions('lantern', version);

  const meshes = useMemo(() => {
    const materials = {
      core: new MeshStandardMaterial({
        map: glowTex,
        emissive: new Color('#ffce7a'),
        emissiveMap: glowTex,
        emissiveIntensity: 3.4,
      }),
      frame: new MeshStandardMaterial({ color: '#8a8578', roughness: 0.85 }),
      cap: new MeshStandardMaterial({ color: '#343a4e', roughness: 0.9 }),
    };

    const matrix = new Matrix4();
    const quaternion = new Quaternion();
    const position = new Vector3();
    const scale = new Vector3();

    return PARTS.map((part) => {
      const geometry = new BoxGeometry(...part.size);
      geometry.translate(...part.offset);
      const mesh = new InstancedMesh(geometry, materials[part.material], spots.length);
      spots.forEach(([x, y, z], i) => {
        position.set(x + 0.5, y, z + 0.5);
        scale.setScalar(0.9);
        matrix.compose(position, quaternion, scale);
        mesh.setMatrixAt(i, matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
      mesh.castShadow = part.material !== 'core';
      return mesh;
    });
  }, [glowTex, spots]);

  useEffect(() => () => disposeMeshes(meshes), [meshes]);

  return (
    <group>
      {meshes.map((mesh, i) => (
        <primitive key={i} object={mesh} />
      ))}
    </group>
  );
}
