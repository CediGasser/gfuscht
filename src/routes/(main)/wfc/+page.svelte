<script lang="ts">
  import { browser } from "$app/environment";
  import WfcComponent from "./WfcComponent.svelte";
  import tiles from "./tilesets/directed_tiles.json";
  import { ContinuousWfc } from "./ContinuousWfc.svelte";

  const HEIGHT = 10;
  const WIDTH = 10;

  let wfc = $state(new ContinuousWfc(tiles, WIDTH, HEIGHT));

  if (browser) wfc.collapseLowestEntropy();

  const onkeydown = (e: KeyboardEvent) => {
    if (e.key === "d") wfc.shiftGridRight();
    if (e.key === "a") wfc.shiftGridLeft();
    if (e.key === "s") wfc.shiftGridDown();
    if (e.key === "w") wfc.shiftGridUp();
  };
</script>

<svelte:window {onkeydown} />
<main>
  <WfcComponent {wfc} />
  <div>
    <input type="range" bind:value={wfc.animationDelay} min="0" max="1000" />
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
</style>
