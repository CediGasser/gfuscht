import Wfc from "./Wfc.svelte";

export default class ContinuousWfc extends Wfc {
  shiftGridRight = () => {
    // Shift the grid right
    for (let x = 1; x < this.width; x++) {
      this.grid[x - 1] = this.grid[x];
    }

    // Fill the rightmost column with new tiles
    this.grid[this.width - 1] = Array.from({ length: this.height }, () => this.tiles);

    // Shift the propagation stack
    this._propagationStack = this._propagationStack.map(({ x, y }) => ({ x: x - 1, y }))
      .filter(({ x }) => x >= 0);

    // Add new tiles to the propagation stack
    this.propagate(
      Array.from({ length: this.height }, (_, y) => ({ x: this.width - 1, y })),
    ).then(() => {
      this.collapseLowestEntropy();
    });
  };

  shiftGridLeft = () => {
    // Shift the grid left
    for (let x = this.width - 1; x > 0; x--) {
      this.grid[x] = this.grid[x - 1];
    }

    // Fill the leftmost column with new tiles
    this.grid[0] = Array.from({ length: this.height }, () => this.tiles);


    // Shift the propagation stack
    this._propagationStack = this._propagationStack.map(({ x, y }) => ({ x: x + 1, y }))
      .filter(({ x }) => x < this.width);

    // Add new tiles to the propagation stack
    this.propagate(
      Array.from({ length: this.height }, (_, y) => ({ x: 0, y })),
    ).then(() => {
      this.collapseLowestEntropy();
    });
  }

  shiftGridDown = () => {
    // Shift the grid down
    for (let y = 1; y < this.height; y++) {
      this.grid.forEach((column, x) => {
        column[y - 1] = this.grid[x][y];
      });
    }

    // Fill the bottom row with new tiles
    this.grid.forEach((column) => {
      column[this.height - 1] = this.tiles;
    });

    // Shift the propagation stack
    this._propagationStack = this._propagationStack.map(({ x, y }) => ({ x, y: y - 1 }))
      .filter(({ y }) => y >= 0);

    // Add new tiles to the propagation stack
    this.propagate(
      Array.from({ length: this.width }, (_, x) => ({ x, y: this.height - 1 })),
    ).then(() => {
      this.collapseLowestEntropy();
    });
  };

  shiftGridUp = () => {
    // Shift the grid up
    for (let y = this.height - 1; y > 0; y--) {
      this.grid.forEach((column, x) => {
        column[y] = this.grid[x][y - 1];
      });
    }

    // Fill the top row with new tiles
    this.grid.forEach((column) => {
      column[0] = this.tiles;
    });

    // Shift the propagation stack
    this._propagationStack = this._propagationStack.map(({ x, y }) => ({ x, y: y + 1 }))
      .filter(({ y }) => y < this.height);

    // Add new tiles to the propagation stack
    this.propagate(
      Array.from({ length: this.width }, (_, x) => ({ x, y: 0 })),
    ).then(() => {
      this.collapseLowestEntropy();
    });
  };
}
