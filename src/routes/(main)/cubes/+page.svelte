<script lang="ts">
  import Seo from '$lib/components/Seo.svelte'
  import Sketch from '$lib/components/Sketch.svelte'
  import { sketches } from './sketches'

  let selectedIndex = $state(6)
  let sketch = $derived(sketches[selectedIndex])
</script>

<Seo
  title="Cubes p5 sketch"
  description="A creative coding sketch that creates connected cubes from simple shapes."
  keywords="cubes, p5.js, sketch, creative coding, animation, 3D, shapes, svelte"
/>

<main>
  <Sketch sketch={sketch.sketch}></Sketch>
  <div class="past-iterations">
    <p>Scroll through the past iterations:</p>
    <input
      type="range"
      min="0"
      max={sketches.length - 1}
      bind:value={selectedIndex}
      step="1"
      class="w-full"
    />
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 4rem;
  }

  input[type='range'] {
    margin-top: 20px;
    width: 80%;
  }
</style>
