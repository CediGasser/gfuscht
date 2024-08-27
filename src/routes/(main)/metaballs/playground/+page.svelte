<script lang="ts">
  import { ParameteredOne } from '$lib/experiments'
  import { GravitySystem } from '$lib/classes/GravitySystem'
  import { MetaballsPainter } from '$lib/classes/MetaballsPainter'

  let falloffTypes = {
    electricFieldFalloff: 'Electric Field',
    customPowerFalloff: 'Custom Power',
    toTheForthFalloff: 'To The Forth',
    constrainedFalloff: 'Constrained',
    cubedFalloff: 'Cubed',
  }

  let width = 600
  let height = 600
  let isPlaying = $state(true)

  let pointProvider = $state(GravitySystem.fromRandom(width, height, 10))

  let pointPainter = $state(new MetaballsPainter())
</script>

<main>
  <div class="options">
    <label for="falloffFunction">Falloff Function </label>
    <select name="falloffFunction" bind:value={pointPainter.falloffType}>
      {#each Object.entries(falloffTypes) as [type, name]}
        <option value={type}>{name}</option>
      {/each}
    </select>

    <button
      onclick={() =>
        (pointProvider = GravitySystem.fromRandom(width, height, 10))}
      >Randomize</button
    >

    <label for="ballSize">Ball Size</label>
    <input
      type="range"
      name="ballSize"
      min="1"
      max="200"
      bind:value={pointPainter.ballSize}
    />

    <label for="threshholdValue">Threshhold Value</label>
    <input
      type="range"
      name="threshholdValue"
      min="0"
      max="4"
      step="0.01"
      bind:value={pointPainter.threshhold}
    />
  </div>
  <div>
    <label for="forceCoefficent">Force Coefficent</label>
    <input
      type="range"
      name="forceCoefficent"
      min="0"
      max="0.5"
      step="0.001"
      bind:value={pointProvider.forceCoeficient}
    />

    <label for="maxVelocity">Max Velocity</label>
    <input
      type="range"
      name="maxVelocity"
      min="0"
      max="10"
      step="0.1"
      bind:value={pointProvider.maxVelocity}
    />

    <label for="borderZone">Border Zone</label>
    <input
      type="range"
      name="borderZone"
      min="0"
      max="100"
      bind:value={pointProvider.borderZone}
    />
  </div>
  <div>
    <ParameteredOne
      provider={pointProvider}
      painter={pointPainter}
      {width}
      {height}
      bind:isPlaying
    />

    <div class="controlls">
      {#if isPlaying}
        <button onclick={() => (isPlaying = false)}>Pause</button>
      {:else}
        <button onclick={() => (isPlaying = true)}>Play</button>
      {/if}
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 1rem;
  }

  div.controlls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 1rem;
  }

  div.options {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
  }

  select {
    margin-top: 1rem;
    height: 2rem;
  }
</style>
