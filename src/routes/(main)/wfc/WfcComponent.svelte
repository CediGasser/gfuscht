<script lang="ts">
  import type { Wfc } from "./Wfc.svelte";

  interface Props {
    wfc: Wfc;
  }

  const { wfc }: Props = $props();
</script>

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

<style>
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
</style>
