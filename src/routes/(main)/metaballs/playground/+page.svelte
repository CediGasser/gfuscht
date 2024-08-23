<script lang="ts">
  import { ParameteredOne } from '$lib/experiments'
  import { GravitySystem } from '$lib/classes/GravitySystem'
  import type { FalloffType } from '$lib/classes/FalloffFunctions'

  let falloffType: FalloffType = 'electricFieldFalloff'

  let falloffTypes = {
    electricFieldFalloff: 'Electric Field',
    customPowerFalloff: 'Custom Power',
    toTheForthFalloff: 'To The Forth',
    constrainedFalloff: 'Constrained',
    cubedFalloff: 'Cubed',
  }

  let width = 600
  let height = 600
  let ballSize = 20
  let threshholdValue = 0.5
  let gravitySystem = GravitySystem.fromRandom(width, height, 10)
</script>

<main>
  <ParameteredOne
    {gravitySystem}
    {width}
    {height}
    {falloffType}
    {ballSize}
    {threshholdValue}
  />
  <div>
    <label for="falloffFunction">Falloff Function </label>
    <select name="falloffFunction" bind:value={falloffType}>
      {#each Object.entries(falloffTypes) as [type, name]}
        <option value={type}>{name}</option>
      {/each}
    </select>

    <button
      on:click={() =>
        (gravitySystem = GravitySystem.fromRandom(width, height, 10))}
      >Randomize</button
    >

    <label for="ballSize">Ball Size</label>
    <input
      type="range"
      name="ballSize"
      min="1"
      max="200"
      bind:value={ballSize}
    />

    <label for="threshholdValue">Threshhold Value</label>
    <input
      type="range"
      name="threshholdValue"
      min="0"
      max="4"
      step="0.01"
      bind:value={threshholdValue}
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
    background-color: aliceblue;
  }

  select {
    margin-top: 1rem;
    height: 2rem;
  }
</style>
