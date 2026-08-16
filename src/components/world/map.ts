export type BlockId =
  | 'grass'
  | 'grassFull'
  | 'dirt'
  | 'stone'
  | 'brick'
  | 'planks'
  | 'path'
  | 'leaves'
  | 'leavesOrange'
  | 'leavesPine'
  | 'hedge'
  | 'log'
  | 'logBirch'
  | 'lamp'
  | 'glowstone'
  | 'chiseled'
  | 'slabBrick'
  | 'slabBrickTop'
  | 'fenceBrick'
  | 'stairBrick'
  | 'stairBrickN'
  | 'stairBrickS'
  | 'stairBrickE'
  | 'stairBrickW'
  | 'stairBrickNI'
  | 'stairBrickSI'
  | 'stairBrickEI'
  | 'stairBrickWI'
  | 'water'
  | 'snowCap'
  | 'lantern';

export interface BlockDef {
  top: string;
  side: string;
  bottom: string;
  emissive?: boolean;
  tint?: string;
}

export const BLOCK_DEFS: Record<BlockId, BlockDef> = {
  grass: { top: '/textures/grass_top.png', side: '/textures/dirt_grass.png', bottom: '/textures/dirt.png' },
  grassFull: { top: '/textures/grass_top.png', side: '/textures/grass_top.png', bottom: '/textures/dirt.png' },
  dirt: { top: '/textures/dirt.png', side: '/textures/dirt.png', bottom: '/textures/dirt.png' },
  stone: { top: '/textures/stone.png', side: '/textures/stone.png', bottom: '/textures/stone.png' },
  brick: { top: '/textures/brick_grey.png', side: '/textures/brick_grey.png', bottom: '/textures/brick_grey.png' },
  planks: { top: '/textures/wood.png', side: '/textures/wood.png', bottom: '/textures/wood.png' },
  path: { top: '/textures/gravel_stone.png', side: '/textures/gravel_stone.png', bottom: '/textures/gravel_stone.png' },
  leaves: { top: '/textures/leaves.png', side: '/textures/leaves.png', bottom: '/textures/leaves.png' },
  leavesOrange: { top: '/textures/leaves_orange.png', side: '/textures/leaves_orange.png', bottom: '/textures/leaves_orange.png' },
  leavesPine: { top: '/textures/leaves.png', side: '/textures/leaves.png', bottom: '/textures/leaves.png', tint: '#6fa055' },
  hedge: { top: '/textures/leaves.png', side: '/textures/leaves.png', bottom: '/textures/leaves.png' },
  log: { top: '/textures/trunk_top.png', side: '/textures/trunk_side.png', bottom: '/textures/trunk_top.png' },
  logBirch: { top: '/textures/trunk_white_top.png', side: '/textures/trunk_white_side.png', bottom: '/textures/trunk_white_top.png' },
  lamp: { top: '/textures/glass_frame.png', side: '/textures/glass_frame.png', bottom: '/textures/glass_frame.png', emissive: true },
  glowstone: { top: '/textures/glowstone.png', side: '/textures/glowstone.png', bottom: '/textures/glowstone.png', emissive: true },
  chiseled: { top: '/textures/chiseled_brick.png', side: '/textures/chiseled_brick.png', bottom: '/textures/chiseled_brick.png' },
  slabBrick: { top: '/textures/brick_grey.png', side: '/textures/brick_grey.png', bottom: '/textures/brick_grey.png' },
  slabBrickTop: { top: '/textures/brick_grey.png', side: '/textures/brick_grey.png', bottom: '/textures/brick_grey.png' },
  fenceBrick: { top: '/textures/brick_grey.png', side: '/textures/brick_grey.png', bottom: '/textures/brick_grey.png' },
  stairBrick: { top: '/textures/brick_grey.png', side: '/textures/brick_grey.png', bottom: '/textures/brick_grey.png' },
  stairBrickN: { top: '/textures/brick_grey.png', side: '/textures/brick_grey.png', bottom: '/textures/brick_grey.png' },
  stairBrickS: { top: '/textures/brick_grey.png', side: '/textures/brick_grey.png', bottom: '/textures/brick_grey.png' },
  stairBrickE: { top: '/textures/brick_grey.png', side: '/textures/brick_grey.png', bottom: '/textures/brick_grey.png' },
  stairBrickW: { top: '/textures/brick_grey.png', side: '/textures/brick_grey.png', bottom: '/textures/brick_grey.png' },
  stairBrickNI: { top: '/textures/brick_grey.png', side: '/textures/brick_grey.png', bottom: '/textures/brick_grey.png' },
  stairBrickSI: { top: '/textures/brick_grey.png', side: '/textures/brick_grey.png', bottom: '/textures/brick_grey.png' },
  stairBrickEI: { top: '/textures/brick_grey.png', side: '/textures/brick_grey.png', bottom: '/textures/brick_grey.png' },
  stairBrickWI: { top: '/textures/brick_grey.png', side: '/textures/brick_grey.png', bottom: '/textures/brick_grey.png' },
  water: { top: '/textures/water.png', side: '/textures/water.png', bottom: '/textures/water.png' },
  snowCap: { top: '/textures/snow.png', side: '/textures/stone_snow.png', bottom: '/textures/stone.png' },
  lantern: { top: '/textures/glowstone.png', side: '/textures/glowstone.png', bottom: '/textures/glowstone.png', emissive: true },
};

export const SHAPED_IDS = [
  'slabBrick',
  'slabBrickTop',
  'fenceBrick',
  'stairBrickN',
  'stairBrickS',
  'stairBrickE',
  'stairBrickW',
  'stairBrickNI',
  'stairBrickSI',
  'stairBrickEI',
  'stairBrickWI',
] as const satisfies readonly BlockId[];

export type ShapedBlockId = (typeof SHAPED_IDS)[number];

export const NON_OCCLUDING = new Set<BlockId>(['water', 'hedge', 'lamp', 'lantern', ...SHAPED_IDS]);

export interface MachineSpot {
  x: number;
  z: number;
  rotationY: number;
  projectIndex: number;
}

export interface DecorSpot {
  x: number;
  z: number;
  v: number;
  y?: number;
}

const decorSupportY = (spot: DecorSpot) => Math.ceil(spot.y ?? 1) - 1;

const MIN = -37;
const MAX = 37;
const PLAZA = 12;
const MOUNTAIN_EDGE = 16;

const key = (x: number, y: number, z: number) => `${x}|${y}|${z}`;

export function hash2(x: number, z: number): number {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

export function valueNoise(x: number, z: number, scale: number): number {
  const gx = Math.floor(x / scale);
  const gz = Math.floor(z / scale);
  const fx = x / scale - gx;
  const fz = z / scale - gz;
  const sx = fx * fx * (3 - 2 * fx);
  const sz = fz * fz * (3 - 2 * fz);
  const a = hash2(gx, gz);
  const b = hash2(gx + 1, gz);
  const c = hash2(gx, gz + 1);
  const d = hash2(gx + 1, gz + 1);
  return a + (b - a) * sx + (c - a) * sz + (a - b - c + d) * sx * sz;
}

export interface MachineBox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
}

const MACHINE_HALF_WIDTH = 0.95;
export const MACHINE_FORWARD = 0.15;
const MACHINE_BACK = -0.55 + MACHINE_FORWARD;
const MACHINE_FRONT = 0.61 + MACHINE_FORWARD;
const MACHINE_BASE_Y = 1;
const MACHINE_TOP_Y = 3.5;
const MACHINE_CELL_COVER = 0.25;

function machineBox(m: MachineSpot): MachineBox {
  const cx = m.x + 0.5;
  const cz = m.z + 0.5;
  const cos = Math.cos(m.rotationY);
  const sin = Math.sin(m.rotationY);
  const xs: number[] = [];
  const zs: number[] = [];
  for (const lx of [-MACHINE_HALF_WIDTH, MACHINE_HALF_WIDTH]) {
    for (const lz of [MACHINE_BACK, MACHINE_FRONT]) {
      xs.push(cx + lx * cos + lz * sin);
      zs.push(cz - lx * sin + lz * cos);
    }
  }
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: MACHINE_BASE_Y,
    maxY: MACHINE_TOP_Y,
    minZ: Math.min(...zs),
    maxZ: Math.max(...zs),
  };
}

function coveredCells(min: number, max: number): number[] {
  const out: number[] = [];
  for (let c = Math.floor(min); c < max; c++) {
    if (Math.min(max, c + 1) - Math.max(min, c) >= MACHINE_CELL_COVER) out.push(c);
  }
  return out;
}

const POND = { x: 16.5, z: 17, rx: 3.8, rz: 3 };

function inPond(x: number, z: number): boolean {
  const dx = (x - POND.x) / POND.rx;
  const dz = (z - POND.z) / POND.rz;
  return dx * dx + dz * dz <= 1;
}

function hillHeight(x: number, z: number): number {
  const d = Math.max(Math.abs(x), Math.abs(z));
  if (d <= PLAZA + 2) return 0;
  if (Math.abs(x) <= 2 && z >= 13 && z <= 18) return 0;
  if (inPond(x, z) || inPond(x + 1, z) || inPond(x - 1, z) || inPond(x, z + 1) || inPond(x, z - 1)) return 0;
  const n = valueNoise(x + 40, z + 40, 8);
  return Math.min(2, Math.max(0, Math.round((n - 0.5) * 5)));
}

function terrainHeight(x: number, z: number): number {
  const e = MAX - Math.max(Math.abs(x), Math.abs(z));
  if (e >= MOUNTAIN_EDGE) return hillHeight(x, z);
  const base = MOUNTAIN_EDGE - e;
  const n = valueNoise(x, z, 7);
  return Math.max(hillHeight(x, z), Math.min(26, Math.round(base * (0.6 + 0.8 * n))));
}

function buildWorld() {
  const blocks = new Map<string, BlockId>();
  const solid = new Set<string>();

  const set = (x: number, y: number, z: number, id: BlockId) => {
    blocks.set(key(x, y, z), id);
    if (id !== 'water') solid.add(key(x, y, z));
  };
  const has = (x: number, y: number, z: number) => blocks.has(key(x, y, z));

  const heights = new Map<string, number>();
  for (let x = MIN; x <= MAX; x++) {
    for (let z = MIN; z <= MAX; z++) {
      heights.set(`${x}|${z}`, terrainHeight(x, z));
    }
  }
  const heightAt = (x: number, z: number) => heights.get(`${x}|${z}`) ?? 0;

  for (let x = MIN; x <= MAX; x++) {
    for (let z = MIN; z <= MAX; z++) {
      const h = heightAt(x, z);
      const inPlaza = Math.abs(x) <= PLAZA && Math.abs(z) <= PLAZA;

      if (inPlaza) {
        const onEdge = Math.abs(x) === PLAZA || Math.abs(z) === PLAZA;
        set(x, 0, z, onEdge ? 'brick' : 'stone');
        continue;
      }
      if (h === 0 && inPond(x, z)) {
        set(x, -1, z, 'dirt');
        set(x, 0, z, 'water');
        continue;
      }
      set(x, 0, z, 'grass');

      const snowy = h >= 19 || (h >= 17 && hash2(x * 31, z * 37) < 0.4);
      const rocky = h >= 16 || (h >= 13 && hash2(x * 41, z * 43) < 0.3);
      for (let y = 1; y <= h; y++) {
        if (y === h) {
          set(x, y, z, snowy ? 'snowCap' : rocky ? 'stone' : 'grassFull');
        } else {
          set(x, y, z, hash2(x * 13 + y, z * 17) < 0.12 || y > h - 3 && rocky ? 'stone' : 'dirt');
        }
      }
      if (h > 0 && h < 13 && hash2(x * 19, z * 23 + h) < 0.05) {
        set(x, h + 1, z, 'leaves');
      }
    }
  }

  const USER_TERRAIN: [number, number, number, BlockId | null][] = [
    [-15, 2, 22, 'grassFull'],
    [-14, 2, 22, 'grassFull'],
    [-13, 2, 22, 'grassFull'],
    [-12, 1, -21, 'log'],
    [-12, 1, 15, null],
    [-12, 1, 16, null],
    [-12, 1, 17, null],
    [-12, 2, -21, 'log'],
    [-12, 2, 21, 'grassFull'],
    [-12, 2, 22, 'grassFull'],
    [-12, 3, -21, 'log'],
    [-12, 4, -21, 'log'],
    [-12, 5, -21, 'log'],
    [-11, 1, -15, null],
    [-11, 1, 15, null],
    [-11, 1, 16, null],
    [-11, 1, 17, 'grassFull'],
    [-11, 2, 15, null],
    [-11, 2, 20, 'grassFull'],
    [-11, 2, 21, 'grassFull'],
    [-11, 2, 22, 'grassFull'],
    [-10, 1, -15, null],
    [-10, 1, 15, null],
    [-10, 1, 16, null],
    [-10, 1, 17, 'grassFull'],
    [-10, 1, 18, 'grassFull'],
    [-10, 2, 15, null],
    [-10, 2, 16, null],
    [-10, 2, 17, null],
    [-10, 2, 18, null],
    [-10, 2, 20, 'grassFull'],
    [-10, 2, 21, 'grassFull'],
    [-10, 2, 22, 'grassFull'],
    [-9, 1, 15, null],
    [-9, 1, 16, null],
    [-9, 1, 17, 'grassFull'],
    [-9, 1, 18, 'grassFull'],
    [-9, 2, 15, null],
    [-9, 2, 16, null],
    [-9, 2, 17, null],
    [-9, 2, 18, 'grassFull'],
    [-9, 2, 20, 'grassFull'],
    [-9, 2, 21, 'grassFull'],
    [-9, 2, 22, 'grassFull'],
    [-8, 1, 15, null],
    [-8, 1, 16, 'grassFull'],
    [-8, 1, 17, 'grassFull'],
    [-8, 1, 18, 'grassFull'],
    [-8, 2, 15, null],
    [-8, 2, 16, null],
    [-8, 2, 17, null],
    [-8, 2, 18, 'grassFull'],
    [-8, 2, 21, 'grassFull'],
    [-8, 2, 22, 'grassFull'],
    [-8, 3, 17, null],
    [-7, 1, 15, null],
    [-7, 1, 16, 'grassFull'],
    [-7, 1, 17, 'grassFull'],
    [-7, 1, 18, 'grassFull'],
    [-7, 2, 15, null],
    [-7, 2, 16, null],
    [-7, 2, 17, null],
    [-7, 2, 18, 'grassFull'],
    [-7, 2, 21, 'grassFull'],
    [-7, 2, 22, 'grassFull'],
    [-6, 1, 15, null],
    [-6, 1, 16, 'grassFull'],
    [-6, 1, 17, 'grassFull'],
    [-6, 1, 18, 'grassFull'],
    [-6, 2, 15, null],
    [-6, 2, 16, null],
    [-6, 2, 17, null],
    [-6, 2, 18, 'grassFull'],
    [-6, 2, 21, 'grassFull'],
    [-6, 2, 22, 'grassFull'],
    [-5, 1, 15, null],
    [-5, 1, 16, 'grassFull'],
    [-5, 1, 17, 'grassFull'],
    [-5, 1, 18, 'grassFull'],
    [-5, 2, 15, null],
    [-5, 2, 16, null],
    [-5, 2, 17, null],
    [-5, 2, 18, 'grassFull'],
    [-5, 2, 21, 'grassFull'],
    [-5, 2, 22, 'grassFull'],
    [-4, 1, 15, null],
    [-4, 1, 16, 'grassFull'],
    [-4, 1, 17, 'grassFull'],
    [-4, 1, 18, 'grassFull'],
    [-4, 2, 15, null],
    [-4, 2, 16, null],
    [-4, 2, 17, null],
    [-4, 2, 18, 'grassFull'],
    [-4, 2, 22, 'grassFull'],
    [-3, 1, 15, null],
    [-3, 1, 16, null],
    [-3, 1, 17, 'grassFull'],
    [-3, 1, 18, 'grassFull'],
    [-3, 2, 15, null],
    [-3, 2, 16, null],
    [-3, 2, 17, null],
    [-3, 2, 18, 'grassFull'],
    [-3, 2, 22, 'grassFull'],
    [-3, 3, 20, null],
    [-2, 1, 17, 'grassFull'],
    [-2, 1, 18, 'grassFull'],
    [-1, 1, 18, 'grassFull'],
    [-1, 2, 18, null],
    [-1, 3, 22, null],
    [0, 1, 17, null],
    [0, 1, 18, 'grassFull'],
    [1, 1, 18, 'grassFull'],
    [1, 1, 19, 'grassFull'],
    [1, 1, 20, 'grassFull'],
    [1, 2, 19, null],
    [1, 2, 20, null],
    [1, 3, 20, null],
    [2, 1, 18, 'grassFull'],
    [2, 1, 19, 'grassFull'],
    [2, 1, 20, 'grassFull'],
    [2, 1, 21, 'grassFull'],
    [2, 2, 19, null],
    [2, 2, 20, null],
    [2, 2, 21, null],
    [3, 1, -20, 'grassFull'],
    [3, 1, 15, null],
    [3, 1, 16, null],
    [3, 1, 17, null],
    [3, 1, 18, 'grassFull'],
    [3, 1, 19, 'grassFull'],
    [3, 1, 20, 'grassFull'],
    [3, 1, 21, 'grassFull'],
    [3, 2, 15, null],
    [3, 2, 16, null],
    [3, 2, 17, null],
    [3, 2, 18, null],
    [3, 2, 19, null],
    [3, 2, 20, null],
    [3, 2, 21, null],
    [4, 1, -20, 'grassFull'],
    [4, 1, 15, null],
    [4, 1, 16, null],
    [4, 1, 17, 'grassFull'],
    [4, 1, 18, 'grassFull'],
    [4, 1, 19, 'grassFull'],
    [4, 1, 20, 'grassFull'],
    [4, 2, 15, null],
    [4, 2, 16, null],
    [4, 2, 17, null],
    [4, 2, 18, null],
    [4, 2, 19, null],
    [4, 2, 20, null],
    [4, 3, 15, null],
    [5, 1, -20, 'grassFull'],
    [5, 1, -19, 'grassFull'],
    [5, 1, -18, 'grassFull'],
    [5, 1, 15, null],
    [5, 1, 16, 'grassFull'],
    [6, 1, -18, 'grassFull'],
    [6, 1, -17, 'grassFull'],
    [6, 1, 15, null],
    [6, 2, -19, 'log'],
    [6, 3, -19, 'log'],
    [6, 4, -19, 'log'],
    [7, 1, -17, 'grassFull'],
    [7, 1, -16, null],
    [7, 1, -15, null],
    [7, 1, 15, null],
    [8, 1, -16, null],
    [8, 1, -15, null],
    [8, 1, 15, null],
    [8, 1, 16, null],
    [9, 1, -16, null],
    [9, 1, -15, null],
    [9, 1, 15, null],
    [9, 1, 16, null],
    [10, 1, -17, null],
    [10, 1, -16, null],
    [10, 1, -15, null],
    [10, 1, 16, null],
    [10, 1, 17, null],
    [10, 1, 18, null],
    [11, 0, 16, 'grass'],
    [11, 1, 20, 'grassFull'],
    [11, 1, 21, 'grassFull'],
    [12, 1, 21, 'grassFull'],
    [13, 1, 21, 'grassFull'],
    [15, 1, 5, null],
    [15, 1, 6, null],
    [15, 1, 7, 'grassFull'],
    [15, 1, 8, 'grassFull'],
    [15, 1, 9, 'grassFull'],
    [15, 1, 10, null],
    [15, 1, 11, null],
    [15, 2, 6, null],
    [15, 2, 7, null],
    [15, 2, 8, null],
    [15, 2, 9, null],
    [15, 2, 10, null],
    [16, 1, 6, 'grassFull'],
    [16, 1, 7, 'grassFull'],
    [16, 1, 8, 'grassFull'],
    [16, 1, 9, 'grassFull'],
    [16, 1, 10, 'grassFull'],
    [16, 1, 11, null],
    [16, 2, 6, null],
    [16, 2, 7, null],
    [16, 2, 8, null],
    [16, 2, 9, null],
    [16, 2, 10, null],
    [16, 3, 9, null],
    [-21, 1, 2, 'grassFull'],
    [-21, 1, 3, 'grassFull'],
    [-21, 1, 4, 'grassFull'],
    [-21, 1, 5, 'grassFull'],
    [-21, 1, 6, 'grassFull'],
    [-21, 1, 7, 'grassFull'],
    [-21, 1, 8, 'grassFull'],
    [-21, 1, 9, 'grassFull'],
    [-20, 1, 5, 'grassFull'],
    [-20, 1, 6, 'grassFull'],
    [-20, 1, 7, 'grassFull'],
    [-20, 1, 8, 'grassFull'],
    [-11, 1, -15, null],
    [-10, 1, -15, null],
    [4, 2, -21, null],
    [4, 3, -22, null],
    [4, 3, -21, null],
    [4, 4, -21, null],
    [4, 5, -21, 'leavesPine'],
    [4, 5, -20, 'leavesPine'],
    [4, 5, -19, 'leavesPine'],
    [4, 5, -18, 'leavesPine'],
    [4, 5, -17, 'leavesPine'],
    [4, 6, -21, null],
    [4, 6, -20, 'leavesPine'],
    [4, 6, -19, 'leavesPine'],
    [4, 6, -18, 'leavesPine'],
    [5, 5, -21, 'leavesPine'],
    [5, 5, -20, 'leavesPine'],
    [5, 5, -19, 'leavesPine'],
    [5, 5, -18, 'leavesPine'],
    [5, 5, -17, 'leavesPine'],
    [5, 6, -21, 'leavesPine'],
    [5, 6, -20, 'leavesPine'],
    [5, 6, -19, 'leavesPine'],
    [5, 6, -18, 'leavesPine'],
    [5, 6, -17, 'leavesPine'],
    [5, 7, -20, 'leavesPine'],
    [5, 7, -19, 'leavesPine'],
    [5, 7, -18, 'leavesPine'],
    [6, 5, -21, 'leavesPine'],
    [6, 5, -20, 'leavesPine'],
    [6, 5, -19, 'log'],
    [6, 5, -18, 'leavesPine'],
    [6, 5, -17, 'leavesPine'],
    [6, 6, -21, 'leavesPine'],
    [6, 6, -20, 'leavesPine'],
    [6, 6, -19, 'log'],
    [6, 6, -18, 'leavesPine'],
    [6, 6, -17, 'leavesPine'],
    [6, 7, -21, null],
    [6, 7, -20, 'leavesPine'],
    [6, 7, -19, 'leavesPine'],
    [6, 7, -18, 'leavesPine'],
    [6, 8, -19, 'leavesPine'],
    [7, 5, -21, 'leavesPine'],
    [7, 5, -20, 'leavesPine'],
    [7, 5, -19, 'leavesPine'],
    [7, 5, -18, 'leavesPine'],
    [7, 5, -17, 'leavesPine'],
    [7, 6, -21, 'leavesPine'],
    [7, 6, -20, 'leavesPine'],
    [7, 6, -19, 'leavesPine'],
    [7, 6, -18, 'leavesPine'],
    [7, 6, -17, 'leavesPine'],
    [7, 7, -20, 'leavesPine'],
    [7, 7, -19, 'leavesPine'],
    [7, 7, -18, 'leavesPine'],
    [8, 5, -21, 'leavesPine'],
    [8, 5, -20, 'leavesPine'],
    [8, 5, -19, 'leavesPine'],
    [8, 5, -18, 'leavesPine'],
    [8, 5, -17, 'leavesPine'],
    [8, 6, -20, 'leavesPine'],
    [8, 6, -19, 'leavesPine'],
    [8, 6, -18, 'leavesPine'],
    [9, 1, -15, null],
    [9, 1, 15, null],
    [9, 2, -15, null],
    [9, 2, 15, null],
    [10, 1, -15, null],
    [16, 1, -21, null],
    [17, 1, -21, null],
  ];
  const TERRAIN_IDS = new Set<BlockId>(['grass', 'grassFull', 'dirt', 'stone', 'snowCap']);
  const applyUserTerrain = () => {
    for (const [x, y, z, id] of USER_TERRAIN) {
      if (id === null) {
        blocks.delete(key(x, y, z));
        solid.delete(key(x, y, z));
      } else {
        set(x, y, z, id);
      }
    }
  };
  applyUserTerrain();
  for (const [x, , z] of USER_TERRAIN) {
    let top = 0;
    for (let y = 30; y >= 1; y--) {
      const b = blocks.get(key(x, y, z));
      if (b !== undefined && TERRAIN_IDS.has(b)) {
        top = y;
        break;
      }
    }
    heights.set(`${x}|${z}`, top);
  }

  for (let x = -3; x <= 3; x++) {
    for (let z = -3; z <= 3; z++) {
      const m = Math.max(Math.abs(x), Math.abs(z));
      if (m === 3) {
        set(x, 1, z, 'brick');
        if (Math.abs(x) === 3 && Math.abs(z) === 3) set(x, 2, z, 'brick');
      } else {
        set(x, 1, z, 'water');
      }
    }
  }
  set(0, 1, 0, 'brick');
  set(0, 2, 0, 'brick');
  set(0, 3, 0, 'brick');
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
    set(dx, 2, dz, 'water');
    set(dx, 3, dz, 'water');
    set(dx, 4, dz, 'water');
  }
  set(0, 4, 0, 'glowstone');
  set(0, 5, 0, 'water');
  const FOUNTAIN_RIM: [number, number, number, BlockId][] = [
    [-3, 1, -2, 'stairBrickS'],
    [-3, 1, 0, 'slabBrick'],
    [-3, 1, 2, 'stairBrickN'],
    [-3, 2, -3, 'fenceBrick'],
    [-3, 2, 3, 'fenceBrick'],
    [-2, 1, -3, 'stairBrickE'],
    [-2, 1, 3, 'stairBrickE'],
    [0, 1, -3, 'slabBrick'],
    [0, 1, 3, 'slabBrick'],
    [2, 1, -3, 'stairBrickW'],
    [2, 1, 3, 'stairBrickW'],
    [3, 1, -2, 'stairBrickS'],
    [3, 1, 0, 'slabBrick'],
    [3, 1, 2, 'stairBrickN'],
    [3, 2, -3, 'fenceBrick'],
    [3, 2, 3, 'fenceBrick'],
  ];
  for (const [x, y, z, id] of FOUNTAIN_RIM) set(x, y, z, id);
  const flowers: DecorSpot[] = [];
  for (let x = -4; x <= 4; x++) {
    for (let z = -4; z <= 4; z++) {
      if (Math.max(Math.abs(x), Math.abs(z)) !== 4) continue;
      if (Math.abs(x) <= 1 || Math.abs(z) <= 1) continue;
      set(x, 1, z, 'hedge');
      if (hash2(x * 3 + 1, z * 3 + 2) < 0.6) {
        flowers.push({ x, z, v: Math.floor(hash2(x + 9, z + 4) * 12), y: 1.38 + hash2(x, z) * 0.3 });
      }
    }
  }

  for (const [lx, lz] of [[3, 3], [-3, 3], [3, -3], [-3, -3]] as const) {
    set(lx, 3, lz, 'lantern');
  }

  const machines: MachineSpot[] = [
    { x: 0, z: -10, rotationY: 0, projectIndex: 1 },
    { x: -6, z: -10, rotationY: 0, projectIndex: 0 },
    { x: 6, z: -10, rotationY: 0, projectIndex: 2 },
    { x: -10, z: 0, rotationY: Math.PI / 2, projectIndex: 3 },
    { x: 10, z: 0, rotationY: -Math.PI / 2, projectIndex: 4 },
    { x: 0, z: 10, rotationY: Math.PI, projectIndex: 5 },
  ];

  const machineCells = new Set<string>();
  const machineBoxes: MachineBox[] = [];
  for (const m of machines) {
    const box = machineBox(m);
    machineBoxes.push(box);
    for (const cx of coveredCells(box.minX, box.maxX)) {
      for (const cy of coveredCells(box.minY, box.maxY)) {
        for (const cz of coveredCells(box.minZ, box.maxZ)) {
          machineCells.add(key(cx, cy, cz));
        }
      }
    }
    const alongX = m.rotationY === 0 || Math.abs(m.rotationY) === Math.PI;
    for (let i = -1; i <= 1; i++) {
      const bx = alongX ? m.x + i : m.x;
      const bz = alongX ? m.z : m.z + i;
      blocks.set(key(bx, 0, bz), 'planks');
      const fx = alongX ? bx : bx + (m.rotationY > 0 ? 1 : -1);
      const fz = alongX ? bz + (m.rotationY === 0 ? 1 : -1) : bz;
      blocks.set(key(fx, 0, fz), 'planks');
    }
  }

  const USER_RUIN: [number, number, number, BlockId][] = [
    [-12, 1, -12, 'slabBrick'],
    [-12, 2, -12, 'glowstone'],
    [-11, 1, -12, 'stairBrickEI'],
    [-12, 1, -11, 'stairBrickSI'],
    [-12, 1, -10, 'slabBrickTop'],
    [-10, 1, -12, 'slabBrickTop'],
    [-12, 2, -10, 'fenceBrick'],
    [-12, 3, -10, 'slabBrick'],
    [-12, 3, -11, 'stairBrickN'],
    [-12, 3, -12, 'slabBrickTop'],
    [-11, 3, -12, 'stairBrickW'],
    [-10, 2, -12, 'fenceBrick'],
    [-10, 3, -12, 'slabBrick'],
    [-13, 1, -13, 'slabBrickTop'],
    [-13, 2, -13, 'fenceBrick'],
    [-13, 1, -12, 'stairBrickNI'],
    [-13, 3, -12, 'stairBrickN'],
    [-13, 3, -13, 'slabBrick'],
    [-12, 3, -13, 'stairBrickW'],
    [-12, 1, -13, 'stairBrickWI'],
    [-12, 4, -12, 'slabBrick'],
    [-11, 1, -13, 'leavesPine'],
    [-13, 1, -11, 'leavesPine'],
  ];
  const USER_EDGE: [number, number, number, BlockId][] = [
    [-12, 1, -2, 'stairBrickSI'],
    [-12, 1, -1, 'stairBrickS'],
    [-12, 1, 0, 'slabBrickTop'],
    [-12, 1, 1, 'stairBrickN'],
    [-12, 1, 2, 'stairBrickNI'],
    [-12, 2, -2, 'fenceBrick'],
    [-12, 2, 0, 'glowstone'],
    [-12, 2, 2, 'fenceBrick'],
    [-12, 3, -2, 'stairBrickS'],
    [-12, 3, -1, 'stairBrickSI'],
    [-12, 3, 0, 'slabBrick'],
    [-12, 3, 1, 'stairBrickNI'],
    [-12, 3, 2, 'stairBrickN'],
    [-12, 4, 0, 'slabBrick'],
  ];
  const STAIR_CW: Record<string, string> = { N: 'W', W: 'S', S: 'E', E: 'N' };
  const rotateStair = (id: BlockId): BlockId => {
    const m = /^stairBrick([NSEW])(I?)$/.exec(id);
    return m ? (`stairBrick${STAIR_CW[m[1]]}${m[2]}` as BlockId) : id;
  };
  for (let k = 0; k < 4; k++) {
    for (const [bx, by, bz, bid] of [...USER_RUIN, ...USER_EDGE]) {
      let x = bx;
      let z = bz;
      let id = bid;
      for (let r = 0; r < k; r++) {
        const nx = z;
        z = -x;
        x = nx;
        id = rotateStair(id);
      }
      set(x, by, z, id);
    }
  }

  const isClearGrass = (x: number, z: number) =>
    heightAt(x, z) === 0 &&
    blocks.get(key(x, 0, z)) === 'grass' &&
    !has(x, 1, z);

  const trees: { x: number; z: number }[] = [];
  const leafAt = (x: number, y: number, z: number, leaf: BlockId) => {
    if (!has(x, y, z)) set(x, y, z, leaf);
  };
  const canopy = (tx: number, tz: number, y: number, radius: number, leaf: BlockId, trimCorners: boolean) => {
    for (let x = tx - radius; x <= tx + radius; x++) {
      for (let z = tz - radius; z <= tz + radius; z++) {
        if (x === tx && z === tz) continue;
        const corner = Math.abs(x - tx) === radius && Math.abs(z - tz) === radius;
        if (corner && trimCorners) continue;
        if (corner && hash2(x * 7 + y, z * 7) > 0.6) continue;
        leafAt(x, y, z, leaf);
      }
    }
  };
  const treeAt = (tx: number, tz: number, base: number) => {
    const kind = hash2(tx * 3 + 5, tz * 3 + 1);
    const y0 = base + 1;
    if (kind < 0.12) {
      set(tx, y0, tz, 'log');
      canopy(tx, tz, y0, 1, 'leaves', false);
      canopy(tx, tz, y0 + 1, 1, 'leaves', true);
      leafAt(tx, y0 + 1, tz, 'leaves');
    } else if (kind < 0.42) {
      const th = 4 + Math.floor(hash2(tx * 3, tz * 3) * 2);
      const leaf: BlockId = hash2(tx, tz + 51) < 0.25 ? 'leavesOrange' : 'leaves';
      for (let y = y0; y < y0 + th; y++) set(tx, y, tz, 'log');
      canopy(tx, tz, y0 + th - 3, 2, leaf, false);
      canopy(tx, tz, y0 + th - 2, 2, leaf, false);
      canopy(tx, tz, y0 + th - 1, 1, leaf, false);
      canopy(tx, tz, y0 + th, 1, leaf, true);
      leafAt(tx, y0 + th, tz, leaf);
    } else if (kind < 0.62) {
      const th = 5 + Math.floor(hash2(tx * 5, tz * 5) * 3);
      for (let y = y0; y < y0 + th; y++) set(tx, y, tz, 'logBirch');
      canopy(tx, tz, y0 + th - 3, 2, 'leaves', true);
      canopy(tx, tz, y0 + th - 2, 2, 'leaves', true);
      canopy(tx, tz, y0 + th - 1, 1, 'leaves', false);
      canopy(tx, tz, y0 + th, 1, 'leaves', true);
      leafAt(tx, y0 + th, tz, 'leaves');
    } else if (kind < 0.78) {
      const th = 7 + Math.floor(hash2(tx * 7, tz * 7) * 3);
      const leaf: BlockId = hash2(tx + 4, tz + 51) < 0.2 ? 'leavesOrange' : 'leaves';
      for (let y = y0; y < y0 + th; y++) set(tx, y, tz, 'log');
      canopy(tx, tz, y0 + th - 4, 2, leaf, false);
      canopy(tx, tz, y0 + th - 3, 3, leaf, true);
      canopy(tx, tz, y0 + th - 2, 3, leaf, true);
      canopy(tx, tz, y0 + th - 1, 2, leaf, false);
      canopy(tx, tz, y0 + th, 1, leaf, false);
      leafAt(tx, y0 + th, tz, leaf);
      canopy(tx, tz, y0 + th + 1, 1, leaf, true);
      leafAt(tx, y0 + th + 1, tz, leaf);
    } else {
      const th = 6 + Math.floor(hash2(tx * 9, tz * 9) * 4);
      for (let y = y0; y < y0 + th; y++) set(tx, y, tz, 'log');
      let layer = y0 + 2;
      let wide = hash2(tx + 2, tz + 7) < 0.5;
      while (layer < y0 + th - 1) {
        canopy(tx, tz, layer, wide ? 2 : 1, 'leavesPine', true);
        wide = !wide;
        layer++;
      }
      canopy(tx, tz, y0 + th - 1, 1, 'leavesPine', true);
      leafAt(tx, y0 + th - 1, tz, 'leavesPine');
      leafAt(tx, y0 + th, tz, 'leavesPine');
      leafAt(tx, y0 + th + 1, tz, 'leavesPine');
    }
    trees.push({ x: tx, z: tz });
  };

  const groundFor = (x: number, z: number): number | null => {
    const h = heightAt(x, z);
    if (h === 0) return isClearGrass(x, z) && !inPond(x, z) ? 0 : null;
    if (h > 9) return null;
    return blocks.get(key(x, h, z)) === 'grassFull' && !has(x, h + 1, z) ? h : null;
  };

  for (let gx = MIN; gx < MAX; gx += 6) {
    for (let gz = MIN; gz < MAX; gz += 6) {
      const px = gx + 1 + Math.floor(hash2(gx, gz) * 4);
      const pz = gz + 1 + Math.floor(hash2(gz, gx) * 4);
      if (hash2(px + 13, pz + 29) > 0.85) continue;
      const base = groundFor(px, pz);
      if (base === null) continue;
      let clear = true;
      for (let x = px - 1; x <= px + 1 && clear; x++) {
        for (let z = pz - 1; z <= pz + 1 && clear; z++) {
          const g = groundFor(x, z);
          if (g === null || Math.abs(g - base) > 1) clear = false;
          if (Math.abs(x) <= 2 && z >= 13 && z <= 18) clear = false;
          if (Math.abs(x) <= PLAZA + 2 && Math.abs(z) <= PLAZA + 2) clear = false;
        }
      }
      if (clear) treeAt(px, pz, base);
    }
  }

  for (let x = MIN; x <= MAX; x++) {
    for (let z = MIN; z <= MAX; z++) {
      if (!isClearGrass(x, z) || inPond(x, z)) continue;
      if (Math.abs(x) <= PLAZA + 2 && Math.abs(z) <= PLAZA + 2) continue;
      const r = hash2(x * 23 + 5, z * 29 + 3);
      if (r < 0.012) {
        set(x, 1, z, 'leaves');
        if (hash2(x, z + 77) < 0.5 && isClearGrass(x + 1, z)) set(x + 1, 1, z, 'leaves');
      } else if (r > 0.994 && heightAt(x + 3, z) + heightAt(x - 3, z) + heightAt(x, z + 3) + heightAt(x, z - 3) > 0) {
        set(x, 1, z, 'stone');
        if (hash2(x + 5, z) < 0.5 && isClearGrass(x + 1, z)) set(x + 1, 1, z, 'stone');
        if (hash2(x + 6, z) < 0.3) set(x, 2, z, 'stone');
      }
    }
  }

  applyUserTerrain();

  const tufts: DecorSpot[] = [];
  const mushrooms: DecorSpot[] = [];
  const rocks: DecorSpot[] = [];
  for (let x = MIN; x <= MAX; x++) {
    for (let z = MIN; z <= MAX; z++) {
      const r = hash2(x * 3 + 7, z * 5 + 11);
      const h = heightAt(x, z);
      const meadow = valueNoise(x + 100, z - 100, 9);
      const flowerKind = () => Math.floor(hash2(x + 3, z + 8) * 12);
      const tuftChance = 0.15 + valueNoise(x, z, 6) * 0.3;
      const flowerChance = meadow > 0.62 ? 0.35 : 0.05;
      if (h > 0) {
        if (blocks.get(key(x, h, z)) !== 'grassFull' || has(x, h + 1, z)) continue;
        const low = h <= 3;
        if (r < (low ? tuftChance : 0.2)) {
          tufts.push({ x, z, v: Math.floor(hash2(x, z) * 3), y: h + 1 });
        } else if (r < (low ? tuftChance + flowerChance : 0.26)) {
          flowers.push({ x, z, v: flowerKind(), y: h + 1 });
        }
        continue;
      }
      if (!isClearGrass(x, z) || inPond(x, z)) continue;
      if (r < tuftChance) {
        tufts.push({ x, z, v: Math.floor(hash2(x, z) * 3) });
      } else if (r < tuftChance + flowerChance) {
        flowers.push({ x, z, v: flowerKind() });
      } else if (r > 0.988) {
        rocks.push({ x, z, v: 0 });
      }
    }
  }
  const shroomKeys = new Set<string>();
  for (const t of trees) {
    for (let x = t.x - 2; x <= t.x + 2; x++) {
      for (let z = t.z - 2; z <= t.z + 2; z++) {
        if (!isClearGrass(x, z) || inPond(x, z) || shroomKeys.has(`${x}|${z}`)) continue;
        if (hash2(x * 11 + 3, z * 13 + 17) < 0.18) {
          shroomKeys.add(`${x}|${z}`);
          mushrooms.push({ x, z, v: hash2(x, z + 1) < 0.5 ? 0 : 1 });
        }
      }
    }
  }

  const byId = new Map<BlockId, Set<string>>();
  const occluders = new Set<string>();
  for (const [k, id] of blocks) {
    let keys = byId.get(id);
    if (!keys) byId.set(id, (keys = new Set<string>()));
    keys.add(k);
    if (!NON_OCCLUDING.has(id)) occluders.add(k);
  }

  const decor = { tufts, mushrooms, rocks, flowers };
  const decorCells = new Set<string>();
  for (const spots of Object.values(decor)) {
    for (const spot of spots) {
      const support = decorSupportY(spot);
      decorCells.add(key(spot.x, support, spot.z));
      decorCells.add(key(spot.x, support + 1, spot.z));
    }
  }

  return { blocks, solid, byId, occluders, machines, machineCells, machineBoxes, decor, decorCells };
}

const DEV = process.env.NODE_ENV === 'development';

const globalStore = globalThis as unknown as {
  __kryoWorld?: ReturnType<typeof buildWorld>;
  __kryoEdits?: WorldEdit[];
  __kryoHistory?: CellHistory[];
};

export const WORLD = DEV ? (globalStore.__kryoWorld ??= buildWorld()) : buildWorld();

export const SPAWN: [number, number, number] = [0.5, 1, -3.8];
export const SPAWN_YAW = Math.PI;

export function isSolid(x: number, y: number, z: number): boolean {
  return WORLD.solid.has(key(x, y, z));
}

export function isMachineCell(x: number, y: number, z: number): boolean {
  return WORLD.machineCells.has(key(x, y, z));
}

export function intersectsMachine(
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  minZ: number,
  maxZ: number
): boolean {
  for (const b of WORLD.machineBoxes) {
    if (
      minX < b.maxX && maxX > b.minX &&
      minY < b.maxY && maxY > b.minY &&
      minZ < b.maxZ && maxZ > b.minZ
    ) {
      return true;
    }
  }
  return false;
}

function decorVisible(spot: DecorSpot): boolean {
  const support = decorSupportY(spot);
  return WORLD.blocks.has(key(spot.x, support, spot.z)) && !WORLD.blocks.has(key(spot.x, support + 1, spot.z));
}

type DecorGroups = Record<keyof typeof WORLD.decor, DecorSpot[]>;

let decorCache: { version: number; spots: DecorGroups } | null = null;

export function visibleDecor(version: number): DecorGroups {
  if (!decorCache || decorCache.version !== version) {
    const spots = {} as DecorGroups;
    for (const [name, all] of Object.entries(WORLD.decor) as [keyof DecorGroups, DecorSpot[]][]) {
      spots[name] = all.filter(decorVisible);
    }
    decorCache = { version, spots };
  }
  return decorCache.spots;
}

export interface WorldEdit {
  op: 'place' | 'remove';
  x: number;
  y: number;
  z: number;
  id?: BlockId;
}

export const EDITS: WorldEdit[] = DEV ? (globalStore.__kryoEdits ??= []) : [];

interface CellHistory {
  x: number;
  y: number;
  z: number;
  prev: BlockId | undefined;
}

export interface MapVersions {
  layers: ReadonlyMap<BlockId, number>;
  decor: number;
}

const NEIGHBOUR_OFFSETS: [number, number, number][] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

const layerVersions = new Map<BlockId, number>();
let decorVersion = 0;
const history: CellHistory[] = DEV ? (globalStore.__kryoHistory ??= []) : [];

const bumpLayer = (id: BlockId) => layerVersions.set(id, (layerVersions.get(id) ?? 0) + 1);

export function mapVersions(): MapVersions {
  return { layers: new Map(layerVersions), decor: decorVersion };
}

function applyCell(x: number, y: number, z: number, id: BlockId | undefined) {
  const k = key(x, y, z);
  const prev = WORLD.blocks.get(k);
  if (prev === id) return;
  if (prev !== undefined) {
    WORLD.byId.get(prev)?.delete(k);
    bumpLayer(prev);
  }
  if (id === undefined) {
    WORLD.blocks.delete(k);
    WORLD.solid.delete(k);
    WORLD.occluders.delete(k);
  } else {
    WORLD.blocks.set(k, id);
    let keys = WORLD.byId.get(id);
    if (!keys) WORLD.byId.set(id, (keys = new Set<string>()));
    keys.add(k);
    if (id === 'water') {
      WORLD.solid.delete(k);
    } else {
      WORLD.solid.add(k);
    }
    if (NON_OCCLUDING.has(id)) {
      WORLD.occluders.delete(k);
    } else {
      WORLD.occluders.add(k);
    }
    bumpLayer(id);
  }
  for (const [dx, dy, dz] of NEIGHBOUR_OFFSETS) {
    const neighbour = WORLD.blocks.get(key(x + dx, y + dy, z + dz));
    if (neighbour !== undefined) bumpLayer(neighbour);
  }
  if (WORLD.decorCells.has(k)) decorVersion++;
}

export function blockAt(x: number, y: number, z: number): BlockId | undefined {
  return WORLD.blocks.get(key(x, y, z));
}

const positionCache = new Map<BlockId, { version: number; positions: [number, number, number][] }>();

export function layerPositions(id: BlockId, version: number): [number, number, number][] {
  const cached = positionCache.get(id);
  if (cached && cached.version === version) return cached.positions;
  const occluders = WORLD.occluders;
  const positions: [number, number, number][] = [];
  for (const k of WORLD.byId.get(id) ?? []) {
    const [x, y, z] = k.split('|').map(Number);
    if (
      occluders.has(key(x + 1, y, z)) &&
      occluders.has(key(x - 1, y, z)) &&
      occluders.has(key(x, y + 1, z)) &&
      (y === 0 || occluders.has(key(x, y - 1, z))) &&
      occluders.has(key(x, y, z + 1)) &&
      occluders.has(key(x, y, z - 1))
    ) {
      continue;
    }
    positions.push([x, y, z]);
  }
  positionCache.set(id, { version, positions });
  return positions;
}

export function placeBlock(x: number, y: number, z: number, id: BlockId): boolean {
  const k = key(x, y, z);
  if (WORLD.machineCells.has(k) || WORLD.blocks.has(k)) return false;
  history.push({ x, y, z, prev: undefined });
  applyCell(x, y, z, id);
  EDITS.push({ op: 'place', x, y, z, id });
  return true;
}

export function removeBlock(x: number, y: number, z: number): boolean {
  const k = key(x, y, z);
  if (WORLD.machineCells.has(k)) return false;
  const prev = WORLD.blocks.get(k);
  if (prev === undefined) return false;
  history.push({ x, y, z, prev });
  applyCell(x, y, z, undefined);
  EDITS.push({ op: 'remove', x, y, z });
  return true;
}

export function resetWorld() {
  for (let i = history.length - 1; i >= 0; i--) {
    const h = history[i];
    applyCell(h.x, h.y, h.z, h.prev);
  }
  history.length = 0;
  EDITS.length = 0;
}

export const WORLD_BOUNDS = { min: MIN + 0.3, max: MAX + 0.7 };

export const PLAYER_STATE = { x: SPAWN[0], y: SPAWN[1], z: SPAWN[2], yaw: 0 };
