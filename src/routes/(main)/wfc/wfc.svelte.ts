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

export class Wfc {
  private _grid: Tile[][][] = $state([[]]);
  protected width: number;
  protected height: number;
  public tiles: Tile[] = [];

  constructor(tileset: RawTile[], width: number, height: number) {
    this.width = width;
    this.height = height;

    this.tiles = generateTiles(tileset);

    this.grid = Array.from({ length: this.width }, () =>
      Array.from({ length: this.height }, () => this.tiles),
    )
  }

  private getNeighbors(x: number, y: number) {
    const neighbors: { [key: string]: { x: number, y: number } } = {}
    if (x > 0) neighbors.left = { x: x - 1, y };
    if (x < this.width - 1) neighbors.right = { x: x + 1, y };
    if (y > 0) neighbors.top = { x, y: y - 1 };
    if (y < this.height - 1) neighbors.bottom = { x, y: y + 1 };
    return neighbors;
  }

  public reduce(x: number, y: number) {
    const tileOptions = this.grid[x][y];
    const neighbors = this.getNeighbors(x, y);

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

  public propagate(stack: { x: number, y: number }[]) {
    while (stack.length > 0) {
      const { x, y } = stack.pop() as { x: number; y: number };
      const neighbors = Object.values(this.getNeighbors(x, y));
      for (const neighbor of neighbors) {
        const optionCount = this.grid[neighbor.x][neighbor.y].length;
        this.reduce(neighbor.x, neighbor.y);
        const newOptionCount = this.grid[neighbor.x][neighbor.y].length;
        if (optionCount > newOptionCount)
          stack.push(neighbor);
      }
    }
  }

  public getLowestEntropyTile() {
    let minEntropy = Infinity;
    let minEntropyTiles: { x: number, y: number }[] = [];
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

  public async collapse(x: number, y: number, delay = 5) {
    const tileOptions = this.grid[x][y];

    const tileIndex = Math.floor(Math.random() * tileOptions.length);
    this.grid[x][y] = [tileOptions[tileIndex]];

    this.propagate([{ x, y }]) // stack of positions to propagate
    if (delay > 0) await sleep(delay);

    // choose lowest entropy tile next
    const nextTile = this.getLowestEntropyTile();
    if (nextTile)
      await this.collapse(nextTile.x, nextTile.y, delay);
  }

  public collapseLowestEntropy() {
    const tile = this.getLowestEntropyTile();
    if (tile) this.collapse(tile.x, tile.y);
  }

  get grid() {
    return this._grid;
  }
  set grid(value) {
    this._grid = value;
  }
}
