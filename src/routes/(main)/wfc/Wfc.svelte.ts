import { sleep } from "$lib/utils";

const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

type RawTile = {
  name: string;
  sockets: string[];
  rotationVariants: number[];
};

type Tile = {
  name: string;
  sockets: string[];
  rotation: number;
};

type Position = {
  x: number;
  y: number;
};

function generateTiles(tiles: RawTile[]): Tile[] {
  const result: Tile[] = [];
  for (const tile of tiles) {
    const sockets = tile.sockets;
    for (const rotation of tile.rotationVariants) {
      switch (rotation) {
        case 0:
          result.push({ name: tile.name, sockets: tile.sockets, rotation: 0 });
          break;
        case 90:
          result.push({
            name: tile.name,
            sockets: [sockets[LEFT], sockets[TOP], sockets[RIGHT], sockets[BOTTOM]],
            rotation: 90,
          });
          break;
        case 180:
          result.push({
            name: tile.name,
            sockets: [sockets[BOTTOM], sockets[LEFT], sockets[TOP], sockets[RIGHT]],
            rotation: 180,
          });
          break;
        case 270:
          result.push({
            name: tile.name,
            sockets: [sockets[RIGHT], sockets[BOTTOM], sockets[LEFT], sockets[TOP]],
            rotation: 270,
          });
          break;
      }
    }
  }
  return result;
}

export default class Wfc {
  private _grid: Tile[][][] = $state([[]]);
  private isPropagating = false;

  protected _propagationStack: Position[] = $state([]);
  protected width: number;
  protected height: number;

  public tiles: Tile[] = [];
  public animationDelay = $state(100);

  get propagationStack() {
    return this._propagationStack;
  }
  get grid() {
    return this._grid;
  }
  set grid(value) {
    this._grid = value;
  }

  constructor(tileset: RawTile[], width: number, height: number) {
    this.width = width;
    this.height = height;

    this.tiles = generateTiles(tileset);

    this.grid = Array.from({ length: this.width }, () =>
      Array.from({ length: this.height }, () => this.tiles),
    )
  }

  private getNeighbors({ x, y }: Position) {
    const neighbors: { [key: string]: Position } = {}
    if (x > 0) neighbors.left = { x: x - 1, y };
    if (x < this.width - 1) neighbors.right = { x: x + 1, y };
    if (y > 0) neighbors.top = { x, y: y - 1 };
    if (y < this.height - 1) neighbors.bottom = { x, y: y + 1 };
    return neighbors;
  }

  public reduce({ x, y }: Position) {
    const tileOptions = this.grid[x][y];
    const neighbors = this.getNeighbors({ x, y });

    const topSockets = neighbors.top && this.grid[neighbors.top.x][neighbors.top.y].map((t) => t.sockets[BOTTOM]);
    const rightSockets = neighbors.right && this.grid[neighbors.right.x][neighbors.right.y].map((t) => t.sockets[LEFT]);
    const bottomSockets = neighbors.bottom && this.grid[neighbors.bottom.x][neighbors.bottom.y].map((t) => t.sockets[TOP]);
    const leftSockets = neighbors.left && this.grid[neighbors.left.x][neighbors.left.y].map((t) => t.sockets[RIGHT]);

    this.grid[x][y] = tileOptions.filter((tile) => {
      if (topSockets && !topSockets.includes(tile.sockets[TOP])) return false;
      if (rightSockets && !rightSockets.includes(tile.sockets[RIGHT])) return false;
      if (bottomSockets && !bottomSockets.includes(tile.sockets[BOTTOM])) return false;
      if (leftSockets && !leftSockets.includes(tile.sockets[LEFT])) return false;
      return true;
    });
  }

  public async propagate(positions: Position[]) {
    this._propagationStack.push(...positions);

    if (this.isPropagating) return;
    this.isPropagating = true;

    while (this._propagationStack.length > 0) {
      const position = this._propagationStack.pop() as Position;
      const optionCount = this._grid[position.x][position.y].length;
      this.reduce(position);
      const newOptionCount = this._grid[position.x][position.y].length;

      if (optionCount > newOptionCount) {
        const neighbors = Object.values(this.getNeighbors(position)).filter(
          (neighbor) => this.grid[neighbor.x][neighbor.y].length > 1,
        );
        this._propagationStack.push(...neighbors);
      }
      if (this.animationDelay > 0) await sleep(this.animationDelay);
    }

    this.isPropagating = false;
  }

  public getLowestEntropyTile() {
    let minEntropy = Infinity;
    let minEntropyTiles: Position[] = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const tileOptions = this.grid[x][y];
        const entropy = tileOptions.length;
        if (entropy < minEntropy && entropy > 1) {
          minEntropy = entropy;
          minEntropyTiles = [{ x, y }];
        } else if (entropy === minEntropy) {
          minEntropyTiles.push({ x, y });
        }
      }
    }
    if (minEntropyTiles.length === 0) return null;
    const minEntropyTile = minEntropyTiles[Math.floor(Math.random() * minEntropyTiles.length)];
    return minEntropyTile;
  }

  public async collapse({ x, y }: Position) {
    if (this.isPropagating) return;

    const tileOptions = this.grid[x][y];

    const tileIndex = Math.floor(Math.random() * tileOptions.length);
    this.grid[x][y] = [tileOptions[tileIndex]];

    const neighbors = Object.values(this.getNeighbors({ x, y })).filter(
      (neighbor) => this.grid[neighbor.x][neighbor.y].length > 1,
    );

    await this.propagate(neighbors) // stack of positions to propagate

    // choose lowest entropy tile next
    const nextTile = this.getLowestEntropyTile();
    if (nextTile)
      await this.collapse(nextTile);
  }

  public async collapseLowestEntropy() {
    const tile = this.getLowestEntropyTile();
    if (tile) await this.collapse(tile);
  }

}
