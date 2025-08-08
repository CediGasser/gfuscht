<script lang="ts">
  import { browser } from '$app/environment'
  import WfcComponent from './WfcComponent.svelte'
  import tiles from './tilesets/directed_tiles.json'
  import ContinuousWfc from './ContinuousWfc.svelte'
  import Seo from '$lib/components/Seo.svelte'

  const HEIGHT = 10
  const WIDTH = 10

  let wfc = $state(new ContinuousWfc(tiles, WIDTH, HEIGHT))

  if (browser) wfc.collapseLowestEntropy()

  const onkeydown = (e: KeyboardEvent) => {
    if (e.key === 'd' || e.key === 'ArrowRight') wfc.shiftGridRight()
    if (e.key === 'a' || e.key === 'ArrowLeft') wfc.shiftGridLeft()
    if (e.key === 's' || e.key === 'ArrowDown') wfc.shiftGridDown()
    if (e.key === 'w' || e.key === 'ArrowUp') wfc.shiftGridUp()
  }
</script>

<Seo
  title="Wave Function Collapse"
  description="A Wave Function Collapse implementation in Svelte that allows for continuous generation."
  keywords="wave function collapse, wfc, svelte, continuous generation, procedural generation, tileset, animation"
/>

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
