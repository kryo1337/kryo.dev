'use client';

import { useEffect, useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import {
  DoubleSide,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  NearestFilter,
  PlaneGeometry,
  Quaternion,
  SRGBColorSpace,
  Texture,
  Vector3,
} from 'three';
import { DecorSpot, hash2, visibleDecor } from './map';
import { disposeMeshes } from './dispose';

const TUFT_TEXTURES = ['/textures/grass1.png', '/textures/grass2.png', '/textures/grass4.png'];
const MUSHROOM_TEXTURES = ['/textures/mushroom_red.png', '/textures/mushroom_brown.png'];
const ROCK_TEXTURE = '/textures/rock_moss.png';
const FLOWER_TEXTURES = [
  'poppy',
  'dandelion',
  'blue_orchid',
  'allium',
  'cornflower',
  'daisy',
  'tulip_red',
  'tulip_orange',
  'tulip_pink',
  'tulip_white',
  'azure_bluet',
  'lily',
].map((n) => `/textures/flower_${n}.png`);

function SpriteLayer({
  spots,
  texture,
  size,
  tint,
}: {
  spots: DecorSpot[];
  texture: Texture;
  size: number;
  tint?: string;
}) {
  const meshes = useMemo(() => {
    const geometry = new PlaneGeometry(size, size);
    geometry.translate(0, size / 2, 0);
    const material = new MeshStandardMaterial({
      map: texture,
      color: tint ?? '#ffffff',
      alphaTest: 0.5,
      side: DoubleSide,
      roughness: 1,
      metalness: 0,
    });
    const matrix = new Matrix4();
    const quaternion = new Quaternion();
    const up = new Vector3(0, 1, 0);
    const position = new Vector3();
    const scale = new Vector3();
    return [Math.PI / 4, -Math.PI / 4].map((baseAngle) => {
      const mesh = new InstancedMesh(geometry, material, spots.length);
      spots.forEach((spot, i) => {
        const jx = (hash2(spot.x * 17, spot.z * 23) - 0.5) * 0.5;
        const jz = (hash2(spot.x * 29, spot.z * 31) - 0.5) * 0.5;
        const s = 0.7 + hash2(spot.x * 37, spot.z * 41) * 0.5;
        position.set(spot.x + 0.5 + jx, spot.y ?? 1, spot.z + 0.5 + jz);
        quaternion.setFromAxisAngle(up, baseAngle + hash2(spot.x, spot.z) * 0.8);
        scale.set(s, s, s);
        matrix.compose(position, quaternion, scale);
        mesh.setMatrixAt(i, matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
      mesh.receiveShadow = true;
      return mesh;
    });
  }, [spots, texture, size, tint]);

  useEffect(() => () => disposeMeshes(meshes), [meshes]);

  return (
    <group>
      {meshes.map((mesh, i) => (
        <primitive key={i} object={mesh} />
      ))}
    </group>
  );
}

export default function Decorations({ version }: { version: number }) {
  const loaded = useTexture([...TUFT_TEXTURES, ...MUSHROOM_TEXTURES, ROCK_TEXTURE, ...FLOWER_TEXTURES]);

  const textures = useMemo(
    () =>
      loaded.map((source) => {
        const tex = source.clone();
        tex.magFilter = NearestFilter;
        tex.minFilter = NearestFilter;
        tex.colorSpace = SRGBColorSpace;
        tex.generateMipmaps = false;
        return tex;
      }),
    [loaded]
  );

  useEffect(() => () => textures.forEach((texture) => texture.dispose()), [textures]);

  const decor = visibleDecor(version);

  const groups = useMemo(() => {
    const byVariant = (spots: DecorSpot[], count: number) => {
      const out: DecorSpot[][] = Array.from({ length: count }, () => []);
      for (const spot of spots) out[spot.v % count].push(spot);
      return out;
    };
    return {
      tufts: byVariant(decor.tufts, 3),
      mushrooms: byVariant(decor.mushrooms, 2),
      flowers: byVariant(decor.flowers, FLOWER_TEXTURES.length),
    };
  }, [decor]);

  return (
    <group>
      {groups.tufts.map((spots, i) => (
        <SpriteLayer key={`tuft${i}`} spots={spots} texture={textures[i]} size={0.9} />
      ))}
      {groups.mushrooms.map((spots, i) => (
        <SpriteLayer key={`shroom${i}`} spots={spots} texture={textures[3 + i]} size={0.55} />
      ))}
      <SpriteLayer spots={decor.rocks} texture={textures[5]} size={0.7} />
      {groups.flowers.map((spots, i) => (
        <SpriteLayer key={`flower${i}`} spots={spots} texture={textures[6 + i]} size={0.7} />
      ))}
    </group>
  );
}
