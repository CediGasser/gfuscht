<script lang="ts">
  import { browser } from "$app/environment";
  import WfcComponent from "./WfcComponent.svelte";
  import tiles from "./tilesets/directed_tiles.json";
  import ContinuousWfc from "./ContinuousWfc.svelte";

  const HEIGHT = 10;
  const WIDTH = 10;

  let wfc = $state(new ContinuousWfc(tiles, WIDTH, HEIGHT));

  if (browser) wfc.collapseLowestEntropy();

  const onkeydown = (e: KeyboardEvent) => {
    if (e.key === "d" || e.key === "ArrowRight") wfc.shiftGridRight();
    if (e.key === "a" || e.key === "ArrowLeft") wfc.shiftGridLeft();
    if (e.key === "s" || e.key === "ArrowDown") wfc.shiftGridDown();
    if (e.key === "w" || e.key === "ArrowUp") wfc.shiftGridUp();
  };
</script>

<svelte:window {onkeydown} />

<main>
  <WfcComponent {wfc} />
  <div>
    <label for="animationDelay">Animation Delay</label>
    <input
      name="animationDelay"
      type="number"
      bind:value={wfc.animationDelay}
      min="0"
      max="1000"
    />
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
