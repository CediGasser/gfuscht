<script lang="ts">
  import { browser } from "$app/environment";
  import WfcComponent from "./WfcComponent.svelte";
  import tiles from "./directed_tiles.json";
  import { ContinuousWfc } from "./ContinuousWfc.svelte";

  const HEIGHT = 10;
  const WIDTH = 10;

  let wfc = $state(new ContinuousWfc(tiles, WIDTH, HEIGHT));
  let initialLoaded = $state(false);

  const start = async () => {
    const tile = wfc.getLowestEntropyTile();
    if (tile) await wfc.collapse(tile.x, tile.y, 10);
    console.log("done");
    initialLoaded = true;
  };

  if (browser) start();
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === "d") wfc.shiftGridRight();
    if (e.key === "a") wfc.shiftGridLeft();
    if (e.key === "s") wfc.shiftGridDown();
    if (e.key === "w") wfc.shiftGridUp();
  }}
/>
<main>
  <WfcComponent {wfc} />
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
