'use client';

import { useEffect, useEffectEvent, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { Object3D, Vector3 } from 'three';
import {
  blockAt,
  BlockId,
  intersectsMachine,
  isMachineCell,
  isSolid,
  placeBlock,
  PLAYER_STATE,
  removeBlock,
  SPAWN,
  SPAWN_YAW,
  WORLD,
  WORLD_BOUNDS,
} from './map';

const GRAVITY = 26;
const SPEED = 4.5;
const JUMP_VELOCITY = 8.5;
const HALF_WIDTH = 0.3;
const HEIGHT = 1.8;
const EYE_HEIGHT = 1.62;
const INTERACT_RANGE = 3.2;

function collides(pos: Vector3): boolean {
  const minX = Math.floor(pos.x - HALF_WIDTH);
  const maxX = Math.floor(pos.x + HALF_WIDTH);
  const minY = Math.floor(pos.y);
  const maxY = Math.floor(pos.y + HEIGHT - 0.001);
  const minZ = Math.floor(pos.z - HALF_WIDTH);
  const maxZ = Math.floor(pos.z + HALF_WIDTH);
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        if (isSolid(x, y, z)) return true;
      }
    }
  }
  return intersectsMachine(
    pos.x - HALF_WIDTH,
    pos.x + HALF_WIDTH,
    pos.y,
    pos.y + HEIGHT,
    pos.z - HALF_WIDTH,
    pos.z + HALF_WIDTH
  );
}

type RayTarget = {
  hit: [number, number, number];
  prev: [number, number, number];
  normalY: number;
  yFrac: number;
  machine: boolean;
} | null;

function raycastVoxel(origin: Vector3, dir: Vector3, maxDist: number): RayTarget {
  let x = Math.floor(origin.x);
  let y = Math.floor(origin.y);
  let z = Math.floor(origin.z);
  const stepX = dir.x > 0 ? 1 : -1;
  const stepY = dir.y > 0 ? 1 : -1;
  const stepZ = dir.z > 0 ? 1 : -1;
  const tDeltaX = Math.abs(1 / (dir.x || 1e-10));
  const tDeltaY = Math.abs(1 / (dir.y || 1e-10));
  const tDeltaZ = Math.abs(1 / (dir.z || 1e-10));
  let tMaxX = tDeltaX * (dir.x > 0 ? x + 1 - origin.x : origin.x - x);
  let tMaxY = tDeltaY * (dir.y > 0 ? y + 1 - origin.y : origin.y - y);
  let tMaxZ = tDeltaZ * (dir.z > 0 ? z + 1 - origin.z : origin.z - z);
  let px = x;
  let py = y;
  let pz = z;
  let t = 0;
  let axis = 1;
  while (t <= maxDist) {
    const machine = isMachineCell(x, y, z);
    if ((blockAt(x, y, z) !== undefined || machine) && t > 0) {
      const hitY = origin.y + dir.y * t;
      return {
        hit: [x, y, z],
        prev: [px, py, pz],
        normalY: axis === 1 ? -stepY : 0,
        yFrac: hitY - Math.floor(hitY),
        machine,
      };
    }
    px = x;
    py = y;
    pz = z;
    if (tMaxX < tMaxY && tMaxX < tMaxZ) {
      x += stepX;
      t = tMaxX;
      tMaxX += tDeltaX;
      axis = 0;
    } else if (tMaxY < tMaxZ) {
      y += stepY;
      t = tMaxY;
      tMaxY += tDeltaY;
      axis = 1;
    } else {
      z += stepZ;
      t = tMaxZ;
      tMaxZ += tDeltaZ;
      axis = 2;
    }
  }
  return null;
}

export default function Player({
  active,
  buildMode,
  selectedBlock,
  highlightRef,
  onMapChange,
  onNearMachine,
  onPickBlock,
}: {
  active: boolean;
  buildMode: boolean;
  selectedBlock: BlockId;
  highlightRef: React.RefObject<Object3D | null>;
  onMapChange: () => void;
  onNearMachine: (index: number | null) => void;
  onPickBlock: (id: BlockId) => void;
}) {
  const { camera } = useThree();
  const [, getKeys] = useKeyboardControls();
  const position = useRef(new Vector3(...SPAWN));
  const velocity = useRef(new Vector3());
  const onGround = useRef(false);
  const nearIndex = useRef<number | null>(null);
  const forward = useRef(new Vector3());
  const right = useRef(new Vector3());
  const move = useRef(new Vector3());
  const lookDir = useRef(new Vector3());
  const target = useRef<RayTarget>(null);

  useEffect(() => {
    camera.rotation.set(0, SPAWN_YAW - Math.PI, 0);
  }, [camera]);

  const onMouseDown = useEffectEvent((e: MouseEvent) => {
    if (!document.pointerLockElement || !buildMode) return;
    const t = target.current;
    if (!t || t.machine) return;
    if (e.button === 0) {
      if (removeBlock(...t.hit)) onMapChange();
    } else if (e.button === 1) {
      e.preventDefault();
      const id = blockAt(...t.hit);
      if (id) {
        const base = /^stairBrick/.test(id) ? 'stairBrick' : id === 'slabBrickTop' ? 'slabBrick' : id;
        onPickBlock(base as BlockId);
      }
    } else if (e.button === 2) {
      const [bx, by, bz] = t.prev;
      const pos = position.current;
      const overlapsPlayer =
        bx < pos.x + HALF_WIDTH && bx + 1 > pos.x - HALF_WIDTH &&
        bz < pos.z + HALF_WIDTH && bz + 1 > pos.z - HALF_WIDTH &&
        by < pos.y + HEIGHT && by + 1 > pos.y;
      if (blockAt(bx, by, bz) === undefined && !overlapsPlayer) {
        let id = selectedBlock;
        const topHalf = t.normalY === -1 ? true : t.normalY === 1 ? false : t.yFrac > 0.5;
        if (id === 'slabBrick' && topHalf) {
          id = 'slabBrickTop';
        }
        if (id === 'stairBrick') {
          const d = lookDir.current;
          const facing = Math.abs(d.x) > Math.abs(d.z)
            ? d.x > 0 ? 'E' : 'W'
            : d.z > 0 ? 'S' : 'N';
          id = `stairBrick${facing}${topHalf ? 'I' : ''}` as typeof id;
        }
        if (placeBlock(bx, by, bz, id)) onMapChange();
      }
    }
  });

  useEffect(() => {
    const mouseDown = (e: MouseEvent) => onMouseDown(e);
    const onAuxClick = (e: MouseEvent) => {
      if (document.pointerLockElement && e.button === 1) e.preventDefault();
    };
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('auxclick', onAuxClick);
    return () => {
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('auxclick', onAuxClick);
    };
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const pos = position.current;
    const vel = velocity.current;

    if (active) {
      const keys = getKeys();
      camera.getWorldDirection(forward.current);
      forward.current.y = 0;
      forward.current.normalize();
      right.current.crossVectors(forward.current, camera.up).normalize();

      move.current.set(0, 0, 0);
      if (keys.forward) move.current.add(forward.current);
      if (keys.backward) move.current.sub(forward.current);
      if (keys.right) move.current.add(right.current);
      if (keys.left) move.current.sub(right.current);
      if (move.current.lengthSq() > 0) move.current.normalize().multiplyScalar(SPEED);

      vel.x = move.current.x;
      vel.z = move.current.z;
      if (keys.jump && onGround.current) {
        vel.y = JUMP_VELOCITY;
        onGround.current = false;
      }
    } else {
      vel.x = 0;
      vel.z = 0;
    }

    vel.y -= GRAVITY * dt;

    pos.x += vel.x * dt;
    if (collides(pos)) {
      pos.x -= vel.x * dt;
      vel.x = 0;
    }
    pos.z += vel.z * dt;
    if (collides(pos)) {
      pos.z -= vel.z * dt;
      vel.z = 0;
    }
    pos.y += vel.y * dt;
    if (collides(pos)) {
      const falling = vel.y < 0;
      pos.y -= vel.y * dt;
      vel.y = 0;
      onGround.current = falling;
    } else if (vel.y !== 0) {
      onGround.current = false;
    }

    pos.x = Math.min(Math.max(pos.x, WORLD_BOUNDS.min), WORLD_BOUNDS.max);
    pos.z = Math.min(Math.max(pos.z, WORLD_BOUNDS.min), WORLD_BOUNDS.max);
    if (pos.y < -20) {
      pos.set(...SPAWN);
      vel.set(0, 0, 0);
    }

    camera.position.set(pos.x, pos.y + EYE_HEIGHT, pos.z);
    PLAYER_STATE.x = pos.x;
    PLAYER_STATE.y = pos.y;
    PLAYER_STATE.z = pos.z;
    camera.getWorldDirection(lookDir.current);
    PLAYER_STATE.yaw = Math.atan2(lookDir.current.x, lookDir.current.z);

    if (buildMode && active) {
      camera.getWorldDirection(lookDir.current);
      target.current = raycastVoxel(camera.position, lookDir.current, 7);
    } else {
      target.current = null;
    }
    const highlight = highlightRef.current;
    if (highlight) {
      if (target.current && !target.current.machine) {
        const [hx, hy, hz] = target.current.hit;
        highlight.position.set(hx + 0.5, hy + 0.5, hz + 0.5);
        highlight.visible = true;
      } else {
        highlight.visible = false;
      }
    }

    let closest: number | null = null;
    let closestDist = INTERACT_RANGE;
    WORLD.machines.forEach((m, i) => {
      const dx = m.x + 0.5 - pos.x;
      const dz = m.z + 0.5 - pos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < closestDist) {
        closest = i;
        closestDist = dist;
      }
    });
    if (closest !== nearIndex.current) {
      nearIndex.current = closest;
      onNearMachine(closest);
    }
  });

  return null;
}
