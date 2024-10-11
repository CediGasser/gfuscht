<script lang="ts">
  import type { GradientPainter } from '$lib/classes/GradientPainter'

  let falloffTypes = {
    electricFieldFalloff: 'Electric Field',
    customPowerFalloff: 'Custom Power',
    toTheForthFalloff: 'To The Forth',
    constrainedFalloff: 'Constrained',
    cubedFalloff: 'Cubed',
  }

  type Props = {
    pointsPainter: GradientPainter
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
