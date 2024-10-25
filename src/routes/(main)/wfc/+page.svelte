<script lang="ts">
  import { browser } from "$app/environment";
  import tiles from "./less_tiles.json";
  import { Wfc } from "./wfc.svelte";

  const wfc = new Wfc(tiles, 10, 10);
  if (browser) {
    wfc.collapse(5, 5);
  }
</script>

<main>
  {#each wfc.grid as row}
    <div class="column">
      {#each row as tiles}
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
</main>

<style>
  main {
    height: 100vh;
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
    image-rendering: crisp-edges;
  }
</style>
