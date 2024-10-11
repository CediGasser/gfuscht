<script lang="ts">
  import type { MetaballsPainter } from '$lib/classes/MetaballsPainter'

  let falloffTypes = {
    electricFieldFalloff: 'Electric Field',
    customPowerFalloff: 'Custom Power',
    toTheForthFalloff: 'To The Forth',
    constrainedFalloff: 'Constrained',
    cubedFalloff: 'Cubed',
  }

  type Props = {
    pointsPainter: MetaballsPainter
  }

  let { pointsPainter }: Props = $props()
</script>

<div class="pointsPainter">
  <label for="falloffFunction">Falloff Function </label>
  <select name="falloffFunction" bind:value={pointsPainter.falloffType}>
    {#each Object.entries(falloffTypes) as [type, name]}
      <option value={type}>{name}</option>
    {/each}
  </select>

  <label for="ballSize">Ball Size</label>
  <input
    type="range"
    name="ballSize"
    min="1"
    max="100"
    bind:value={pointsPainter.ballSize}
  />

  <label for="threshholdValue">Threshhold Value</label>
  <input
    type="range"
    name="threshholdValue"
    min="0.1"
    max="2"
    step="0.01"
    bind:value={pointsPainter.threshhold}
  />

  <label for="color">Color</label>
  <input type="color" name="color" bind:value={pointsPainter.color} />
</div>

<style>
  .pointsPainter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    border: 1px solid var(--theme-primary);
    border-radius: var(--theme-radius);
    width: 100%;
    padding: 4rem;
  }

  .pointsPainter > label {
    margin-top: 1rem;
  }
</style>
