<script lang="ts">
  import { browser } from "$app/environment";
  import tiles from "./directed_tiles.json";
  import { Wfc } from "./wfc.svelte";

  const wfc = new Wfc(tiles, 10, 10);

  const start = async () => {
    await wfc.collapse(5, 5, 0);
    console.log("done");
  };

  if (browser) start();
</script>

<main>
  <div class="canvas">
    {#each wfc.grid as column}
      <div class="column">
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
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  div.canvas {
    display: flex;
    flex-direction: row;
  }
  div.column {
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
</style>
