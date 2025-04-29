<script lang="ts">
  import Sketch from '$lib/components/Sketch.svelte'
  import { sketches } from './sketches'

  let selectedIndex = $state(0)
  let sketch = $derived(sketches[selectedIndex])
</script>

<Sketch sketch={sketch.sketch}></Sketch>

<input
  type="range"
  min="0"
  max={sketches.length - 1}
  bind:value={selectedIndex}
  step="1"
  class="w-full"
/>
