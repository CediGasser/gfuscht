<script lang="ts">
  import type Wfc from "./Wfc.svelte";

  interface Props {
    wfc: Wfc;
  }
  const { wfc }: Props = $props();

  const isTileInPropagationStack = (x: number, y: number) =>
    wfc.propagationStack.some(
      (stackEntry) => stackEntry.x === x && stackEntry.y === y,
    );
</script>

<div class="flex-row">
  {#each wfc.grid as column, x}
    <div class="flex-column">
      {#each column as tiles, y}
        {@const isPropagating = isTileInPropagationStack(x, y)}
        <div class="tile" class:is-propagating={isPropagating}>
          {#if tiles.length === 1}
            {@const tile = tiles[0]}
            <img
              style="--rotation: {tile.rotation}deg;"
              src="/wfc-images/{tile.name}"
              alt={tile.name}
            />
          {:else if tiles.length < 1}
            <span>X</span>
          {:else}
            <span>{tiles.length}</span>
          {/if}
        </div>
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
  .tile {
    width: 64px;
    height: 64px;
    display: inline-block;
    text-align: center;
    line-height: 64px;
    font-size: 24px;
  }
  .tile > img {
    transform: rotate(var(--rotation));
    width: 64px;
    height: 64px;
    image-rendering: pixelated;
  }
  .is-propagating {
    outline: 2px solid red;
  }
</style>
