'use client';

import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import {
  BoxGeometry,
  BufferGeometry,
  Color,
  ExtrudeGeometry,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  NearestFilter,
  NearestMipmapLinearFilter,
  RepeatWrapping,
  Shape,
  SRGBColorSpace,
  Texture,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { BLOCK_DEFS, BlockId, hash2, layerPositions, MapVersions, ShapedBlockId, WORLD } from './map';
import { disposeMeshes } from './dispose';

function stairGeometry(dx: number, dz: number, inverted: boolean): BufferGeometry {
  const slabY = inverted ? 0.25 : -0.25;
  const stepY = inverted ? -0.25 : 0.25;
  const slab = new BoxGeometry(1, 0.5, 1).translate(0, slabY, 0);
  const step = new BoxGeometry(dx !== 0 ? 0.5 : 1, 0.5, dz !== 0 ? 0.5 : 1).translate(dx * 0.25, stepY, dz * 0.25);
  return mergeGeometries([slab, step], false);
}

const SHAPE_GEOMS: Partial<Record<BlockId, () => BufferGeometry>> & Record<ShapedBlockId, () => BufferGeometry> = {
  slabBrick: () => new BoxGeometry(1, 0.5, 1).translate(0, -0.25, 0),
  slabBrickTop: () => new BoxGeometry(1, 0.5, 1).translate(0, 0.25, 0),
  fenceBrick: () => new BoxGeometry(0.5, 1, 0.5),
  stairBrickN: () => stairGeometry(0, -1, false),
  stairBrickS: () => stairGeometry(0, 1, false),
  stairBrickE: () => stairGeometry(1, 0, false),
  stairBrickW: () => stairGeometry(-1, 0, false),
  stairBrickNI: () => stairGeometry(0, -1, true),
  stairBrickSI: () => stairGeometry(0, 1, true),
  stairBrickEI: () => stairGeometry(1, 0, true),
  stairBrickWI: () => stairGeometry(-1, 0, true),
};

const TEXTURE_PATHS = Array.from(
  new Set(Object.values(BLOCK_DEFS).flatMap((def) => [def.top, def.side, def.bottom]))
);

function BlockLayer({
  id,
  textures,
  version,
}: {
  id: BlockId;
  textures: Record<string, Texture>;
  version: number;
}) {
  const positions = layerPositions(id, version);

  const mesh = useMemo(() => {
    if (positions.length === 0) return null;
    const def = BLOCK_DEFS[id];
    const shape = SHAPE_GEOMS[id];
    const geometry = shape ? shape() : new BoxGeometry(1, 1, 1);
    const face = (path: string) => {
      const map = textures[path];
      const water = id === 'water';
      return new MeshStandardMaterial({
        map,
        color: def.tint ? new Color(def.tint) : new Color('#ffffff'),
        roughness: water ? 0.15 : 1,
        metalness: water ? 0.1 : 0,
        transparent: water,
        opacity: water ? 0.8 : 1,
        emissive: def.emissive ? new Color('#ffd9a0') : water ? new Color('#2a5f8a') : new Color('#000000'),
        emissiveMap: def.emissive || water ? map : null,
        emissiveIntensity: def.emissive ? 3.2 : water ? 0.55 : 0,
      });
    };
    const side = face(def.side);
    const materials = shape ? side : [side, side, face(def.top), face(def.bottom), side, side];
    const instanced = new InstancedMesh(geometry, materials, positions.length);
    const matrix = new Matrix4();
    positions.forEach(([x, y, z], i) => {
      const surface = id === 'water' && WORLD.blocks.get(`${x}|${y + 1}|${z}`) !== 'water';
      if (surface) {
        matrix.makeScale(1, 0.85, 1);
        matrix.setPosition(x + 0.5, y + 0.425, z + 0.5);
      } else if (id === 'hedge') {
        const hs = 0.42 + hash2(x, z) * 0.3;
        matrix.makeScale(1, hs, 1);
        matrix.setPosition(x + 0.5, y + hs / 2, z + 0.5);
      } else {
        matrix.identity();
        matrix.setPosition(x + 0.5, y + 0.5, z + 0.5);
      }
      instanced.setMatrixAt(i, matrix);
    });
    instanced.instanceMatrix.needsUpdate = true;
    instanced.castShadow = id !== 'water';
    instanced.receiveShadow = true;
    return instanced;
  }, [id, positions, textures]);

  useEffect(
    () => () => {
      if (mesh) disposeMeshes([mesh]);
    },
    [mesh]
  );

  return mesh ? <primitive object={mesh} /> : null;
}

const CASCADE_TOP = 4.85;
const CASCADE_WEDGES: { pos: [number, number, number]; rotY: number }[] = [
  { pos: [1, CASCADE_TOP, 0], rotY: 0 },
  { pos: [0, CASCADE_TOP, 1], rotY: Math.PI },
  { pos: [1, CASCADE_TOP, 1], rotY: -Math.PI / 2 },
  { pos: [0, CASCADE_TOP, 0], rotY: Math.PI / 2 },
];

function wedgeGeometry(): BufferGeometry {
  const shape = new Shape();
  shape.moveTo(0, 0);
  shape.lineTo(1, 0);
  shape.lineTo(0, 1);
  shape.closePath();
  return new ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false });
}

function FountainCascade({ texture }: { texture: Texture }) {
  const geometry = useMemo(() => wedgeGeometry(), []);
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8,
        roughness: 0.15,
        metalness: 0.1,
        emissive: new Color('#2a5f8a'),
        emissiveMap: texture,
        emissiveIntensity: 0.55,
      }),
    [texture]
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  return (
    <group>
      {CASCADE_WEDGES.map((w, i) => (
        <mesh key={i} position={w.pos} rotation={[0, w.rotY, 0]} geometry={geometry} material={material} />
      ))}
    </group>
  );
}

function WaterFlow({ advance }: { advance: (delta: number) => void }) {
  useFrame((_, delta) => advance(delta));
  return null;
}

export default function VoxelMap({ versions }: { versions: MapVersions }) {
  const loaded = useTexture(TEXTURE_PATHS);

  const { textures, advanceWater } = useMemo(() => {
    const map: Record<string, Texture> = {};
    TEXTURE_PATHS.forEach((path, i) => {
      const tex = loaded[i].clone();
      tex.magFilter = NearestFilter;
      tex.minFilter = NearestMipmapLinearFilter;
      tex.anisotropy = 4;
      tex.colorSpace = SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.needsUpdate = true;
      if (path === '/textures/water.png') {
        tex.wrapS = RepeatWrapping;
        tex.wrapT = RepeatWrapping;
      }
      map[path] = tex;
    });
    const water = map['/textures/water.png'];
    return {
      textures: map,
      advanceWater: (delta: number) => {
        water.offset.x = (water.offset.x + delta * 0.035) % 1;
        water.offset.y = (water.offset.y + delta * 0.02) % 1;
      },
    };
  }, [loaded]);

  useEffect(() => () => Object.values(textures).forEach((texture) => texture.dispose()), [textures]);

  return (
    <group>
      {(Object.keys(BLOCK_DEFS) as BlockId[]).filter((id) => id !== 'lantern').map((id) => (
        <BlockLayer key={id} id={id} textures={textures} version={versions.layers.get(id) ?? 0} />
      ))}
      <FountainCascade texture={textures['/textures/water.png']} />
      <WaterFlow advance={advanceWater} />
    </group>
  );
}
