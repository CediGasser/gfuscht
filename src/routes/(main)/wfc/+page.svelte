<script lang="ts">
  import { browser } from "$app/environment";
  import tiles from "./directed_tiles.json";
  import { Wfc } from "./wfc.svelte";

  const HEIGHT = 10;
  const WIDTH = 10;
  let wfc = $state(new Wfc(tiles, WIDTH, HEIGHT));
  let initialLoaded = $state(false);

  const start = async () => {
    const tile = wfc.getLowestEntropyTile();
    if (tile) await wfc.collapse(tile.x, tile.y, 0);
    console.log("done");
    initialLoaded = true;
  };

  if (browser) start();

  const shiftGridRight = () => {
    const newWfc = new Wfc(tiles, WIDTH, HEIGHT);
    for (let x = 1; x < WIDTH; x++) {
      newWfc.grid[x - 1] = wfc.grid[x];
    }
    newWfc.grid[WIDTH - 1] = Array.from({ length: HEIGHT }, () => newWfc.tiles);
    wfc = newWfc;
    wfc.propagate(
      Array.from({ length: HEIGHT }, (_, y) => ({ x: WIDTH - 1, y })),
    );
    start();
  };

  const shiftGridLeft = () => {
    const newWfc = new Wfc(tiles, WIDTH, HEIGHT);
    for (let x = 0; x < WIDTH - 1; x++) {
      newWfc.grid[x + 1] = wfc.grid[x];
    }
    newWfc.grid[0] = Array.from({ length: HEIGHT }, () => newWfc.tiles);
    wfc = newWfc;
    wfc.propagate(Array.from({ length: HEIGHT }, (_, y) => ({ x: 0, y })));
    start();
  };

  const shiftGridDown = () => {
    const newWfc = new Wfc(tiles, WIDTH, HEIGHT);
    for (let y = 1; y < HEIGHT; y++) {
      newWfc.grid.forEach((column, x) => {
        column[y - 1] = wfc.grid[x][y];
      });
    }
    newWfc.grid.forEach((column) => {
      column[HEIGHT - 1] = newWfc.tiles;
    });
    wfc = newWfc;
    wfc.propagate(
      Array.from({ length: WIDTH }, (_, x) => ({ x, y: HEIGHT - 1 })),
    );
    start();
  };

  const shiftGridUp = () => {
    const newWfc = new Wfc(tiles, WIDTH, HEIGHT);
    for (let y = 0; y < HEIGHT - 1; y++) {
      newWfc.grid.forEach((column, x) => {
        column[y + 1] = wfc.grid[x][y];
      });
    }
    newWfc.grid.forEach((column) => {
      column[0] = newWfc.tiles;
    });
    wfc = newWfc;
    wfc.propagate(Array.from({ length: WIDTH }, (_, x) => ({ x, y: 0 })));
    start();
  };
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === "d") shiftGridRight();
    if (e.key === "a") shiftGridLeft();
    if (e.key === "s") shiftGridDown();
    if (e.key === "w") shiftGridUp();
  }}
/>
<main>
  <div class="flex-row">
    {#each wfc.grid as column}
      <div class="flex-column">
        {#each column as tiles}
          {#if tiles.length === 1}
            {@const tile = tiles[0]}
            <img
              style="--rotation: {tile.rotation}deg;"
              class="tile"
              src="/wfc-images/{tile.name}"
              alt={tile.name}
            />
          {:else if tiles.length < 1}
            <span class="tile">X</span>
          {:else}
            <span class="tile">{tiles.length}</span>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
  {#if initialLoaded}
    <div class="flex-column wasd">
      <kbd class="wasdW">W</kbd>
      <div class="flex-row">
        <kbd>A</kbd>
        <kbd>S</kbd>
        <kbd>D</kbd>
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
  }
  span.tile {
    width: 64px;
    height: 64px;
    display: inline-block;
    text-align: center;
    line-height: 64px;
    font-size: 24px;
  }
  img {
    transform: rotate(var(--rotation));
    width: 64px;
    height: 64px;
    image-rendering: pixelated;
  }
  .wasd {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 2rem;
    font-size: 4rem;
  }
  kbd {
    margin: 0 1rem;
    width: 100%;
    text-align: center;
  }
</style>
