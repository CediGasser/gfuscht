export const TOP = 0;
export const RIGHT = 1;
export const BOTTOM = 2;
export const LEFT = 3;

export const SIDES = ["top", "right", "bottom", "left"] as const;
export type Side = (typeof SIDES)[number];

export type RawTile = {
  name: string;
  /**
   * Edges in the order top, right, bottom, left. An edge can be split into parts
   * with "|", read clockwise around the tile (e.g. "G|S": grass then sand). Two
   * edges fit when one is the other reversed, so unsplit sockets simply have to be equal.
   */
  sockets: string[];
  rotationVariants: number[];
  /** Relative frequency when a cell is collapsed, defaults to 1 */
  weight?: number;
};

export type Tile = {
  name: string;
  sockets: string[];
  rotation: number;
  weight: number;
};

export type Position = {
  x: number;
  y: number;
};

export type Direction = "up" | "right" | "down" | "left";

/** One cell's remaining options, as indices into `tiles`. Never mutated, only replaced. */
export type Cell = readonly number[];

export type WfcStep =
  | { type: "collapse"; pos: Position; tile: number }
  | { type: "reduce"; pos: Position; removed: number[] }
  | { type: "contradiction"; pos: Position; removed: number[] }
  | { type: "shift"; direction: Direction };

export type WfcResult = "done" | "contradiction";

export type WfcState = {
  cells: Cell[];
  stack: Position[];
  rngState: number;
};

export type SideConstraint = {
  side: Side;
  /** null when the cell is at the edge of the grid */
  neighbor: Position | null;
  /** Sockets the neighbor still allows on this side, null when there is no neighbor */
  allowed: string[] | null;
};

export type TileVerdict = {
  tile: number;
  /** Sides whose neighbor rules this tile out; empty means the tile fits */
  blockedBy: Side[];
};

export type CellInspection = {
  pos: Position;
  options: Cell;
  sides: SideConstraint[];
  /** Verdict for every tile of the tileset, not just the remaining options */
  verdicts: TileVerdict[];
};

const DIRECTION_OFFSETS: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
};

// Offset to the neighbor on each side, indexed like the sockets (TOP, RIGHT, BOTTOM, LEFT)
const SIDE_OFFSETS: Position[] = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

const opposite = (side: number) => (side + 2) % 4;

// Neighboring edges are read in opposite directions, see RawTile.sockets
export const reverseSocket = (socket: string) => socket.split("|").reverse().join("|");

export function generateTiles(tiles: RawTile[]): Tile[] {
  const result: Tile[] = [];
  for (const tile of tiles) {
    const sockets = tile.sockets;
    const weight = tile.weight ?? 1;
    for (const rotation of tile.rotationVariants) {
      switch (rotation) {
        case 0:
          result.push({ name: tile.name, sockets: tile.sockets, rotation: 0, weight });
          break;
        case 90:
          result.push({
            name: tile.name,
            sockets: [sockets[LEFT], sockets[TOP], sockets[RIGHT], sockets[BOTTOM]],
            rotation: 90,
            weight,
          });
          break;
        case 180:
          result.push({
            name: tile.name,
            sockets: [sockets[BOTTOM], sockets[LEFT], sockets[TOP], sockets[RIGHT]],
            rotation: 180,
            weight,
          });
          break;
        case 270:
          result.push({
            name: tile.name,
            sockets: [sockets[RIGHT], sockets[BOTTOM], sockets[LEFT], sockets[TOP]],
            rotation: 270,
            weight,
          });
          break;
      }
    }
  }
  return result;
}

/** mulberry32: small seedable PRNG, so a run can be replayed from its seed. */
export class Rng {
  state: number;

  constructor(seed: number) {
    this.state = seed;
  }

  next() {
    let t = (this.state = (this.state + 0x6d2b79f5) | 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  pick<T>(items: readonly T[]): T {
    return items[Math.floor(this.next() * items.length)];
  }

  pickWeighted<T>(items: readonly T[], weight: (item: T) => number): T {
    let rest = this.next() * items.reduce((sum, item) => sum + weight(item), 0);
    for (const item of items) {
      rest -= weight(item);
      if (rest < 0) return item;
    }
    return items[items.length - 1];
  }
}

export const randomSeed = () => Math.floor(Math.random() * 2 ** 31);

export default class Wfc {
  readonly tiles: Tile[];
  readonly width: number;
  readonly height: number;

  cells: Cell[];
  stack: Position[] = [];
  private rng: Rng;
  private allTiles: Cell;

  constructor(tileset: RawTile[], width: number, height: number, seed = randomSeed()) {
    this.width = width;
    this.height = height;
    this.tiles = generateTiles(tileset);
    this.allTiles = this.tiles.map((_, i) => i);
    this.cells = Array.from({ length: width * height }, () => this.allTiles);
    this.rng = new Rng(seed);
  }

  index({ x, y }: Position) {
    return y * this.width + x;
  }

  cellAt(pos: Position, cells: readonly Cell[] = this.cells) {
    return cells[this.index(pos)];
  }

  get rngState() {
    return this.rng.state;
  }

  getState(): WfcState {
    return { cells: this.cells.slice(), stack: this.stack.slice(), rngState: this.rngState };
  }

  setState(state: WfcState) {
    this.cells = state.cells.slice();
    this.stack = state.stack.slice();
    this.rng.state = state.rngState;
  }

  private neighbor({ x, y }: Position, side: number): Position | null {
    const nx = x + SIDE_OFFSETS[side].x;
    const ny = y + SIDE_OFFSETS[side].y;
    if (nx < 0 || ny < 0 || nx >= this.width || ny >= this.height) return null;
    return { x: nx, y: ny };
  }

  private neighbors(pos: Position) {
    return [TOP, RIGHT, BOTTOM, LEFT]
      .map((side) => this.neighbor(pos, side))
      .filter((n): n is Position => n !== null);
  }

  /** Sockets the neighbor on `side` still allows, or null if there is no neighbor. */
  private allowedSockets(pos: Position, side: number, cells: readonly Cell[]) {
    const neighbor = this.neighbor(pos, side);
    if (!neighbor) return null;
    const facing = opposite(side);
    return new Set(this.cellAt(neighbor, cells).map((t) => reverseSocket(this.tiles[t].sockets[facing])));
  }

  private pushToStack(positions: Position[]) {
    for (const pos of positions) {
      if (!this.stack.some((p) => p.x === pos.x && p.y === pos.y)) this.stack.push(pos);
    }
  }

  private pushOpenNeighbors(pos: Position) {
    this.pushToStack(this.neighbors(pos).filter((n) => this.cellAt(n).length > 1));
  }

  public reduce(pos: Position) {
    const allowed = [TOP, RIGHT, BOTTOM, LEFT].map((side) => this.allowedSockets(pos, side, this.cells));
    const options = this.cellAt(pos);
    const kept: number[] = [];
    const removed: number[] = [];
    for (const tile of options) {
      const sockets = this.tiles[tile].sockets;
      const fits = allowed.every((set, side) => !set || set.has(sockets[side]));
      (fits ? kept : removed).push(tile);
    }
    if (removed.length > 0) this.cells[this.index(pos)] = kept;
    return removed;
  }

  public getLowestEntropyTile() {
    let minEntropy = Infinity;
    let minEntropyTiles: Position[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const entropy = this.cellAt({ x, y }).length;
        if (entropy < minEntropy && entropy > 1) {
          minEntropy = entropy;
          minEntropyTiles = [{ x, y }];
        } else if (entropy === minEntropy) {
          minEntropyTiles.push({ x, y });
        }
      }
    }
    if (minEntropyTiles.length === 0) return null;
    return this.rng.pick(minEntropyTiles);
  }

  /**
   * Runs the algorithm one step at a time: every reduction of a cell on the
   * propagation stack and every collapse is its own step. Reads the live state on
   * each iteration, so the grid can be shifted between steps. Stops at the first
   * contradiction.
   */
  public *steps(): Generator<WfcStep, WfcResult> {
    while (true) {
      const pos = this.stack.pop();
      if (pos) {
        const removed = this.reduce(pos);
        if (this.cellAt(pos).length === 0) {
          yield { type: "contradiction", pos, removed };
          return "contradiction";
        }
        if (removed.length > 0) this.pushOpenNeighbors(pos);
        yield { type: "reduce", pos, removed };
        continue;
      }

      const next = this.getLowestEntropyTile();
      if (!next) return "done";

      const tile = this.rng.pickWeighted(this.cellAt(next), (t) => this.tiles[t].weight);
      this.cells[this.index(next)] = [tile];
      this.pushOpenNeighbors(next);
      yield { type: "collapse", pos: next, tile };
    }
  }

  /** Runs to completion and returns the result. */
  public run(): WfcResult {
    const steps = this.steps();
    let result = steps.next();
    while (!result.done) result = steps.next();
    return result.value;
  }

  /**
   * Moves the view one cell in `direction`: the grid content moves the other way,
   * the new edge is filled with all tiles and queued for propagation.
   */
  public shift(direction: Direction) {
    const { x: dx, y: dy } = DIRECTION_OFFSETS[direction];
    const inBounds = ({ x, y }: Position) => x >= 0 && y >= 0 && x < this.width && y < this.height;
    const old = this.cells;
    const newEdge: Position[] = [];

    this.cells = old.map((_, i) => {
      const x = i % this.width;
      const y = Math.floor(i / this.width);
      const source = { x: x + dx, y: y + dy };
      if (inBounds(source)) return old[this.index(source)];
      newEdge.push({ x, y });
      return this.allTiles;
    });

    this.stack = this.stack.map(({ x, y }) => ({ x: x - dx, y: y - dy })).filter(inBounds);
    this.pushToStack(newEdge);
  }

  /** Explains a cell: what's left, what its neighbors allow and why each tile fits or not. */
  public inspect(pos: Position, cells: readonly Cell[] = this.cells): CellInspection {
    const allowed = [TOP, RIGHT, BOTTOM, LEFT].map((side) => this.allowedSockets(pos, side, cells));
    return {
      pos,
      options: this.cellAt(pos, cells),
      sides: allowed.map((set, side) => ({
        side: SIDES[side],
        neighbor: this.neighbor(pos, side),
        allowed: set && [...set].sort(),
      })),
      verdicts: this.allTiles.map((tile) => ({
        tile,
        blockedBy: allowed
          .map((set, side) => (set && !set.has(this.tiles[tile].sockets[side]) ? SIDES[side] : null))
          .filter((s): s is Side => s !== null),
      })),
    };
  }
}
