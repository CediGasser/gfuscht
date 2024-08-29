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

  const onRandomize = () => {
    pointProvider = GravitySystem.fromRandom(width, height, 10)
    pointPainter.paint(pointProvider.getPoints())
  }
</script>

<main>
  <div class="options">
    <div class="pointsPainter">
      <label for="falloffFunction">Falloff Function </label>
      <select name="falloffFunction" bind:value={pointPainter.falloffType}>
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
        bind:value={pointPainter.ballSize}
      />

      <label for="threshholdValue">Threshhold Value</label>
      <input
        type="range"
        name="threshholdValue"
        min="0.1"
        max="2"
        step="0.01"
        bind:value={pointPainter.threshhold}
      />

      <label for="color">Color</label>
      <input type="color" name="color" bind:value={pointPainter.color} />
    </div>

    <div class="pointsProvider">
      <button onclick={onRandomize}>Randomize</button>

      <label for="forceCoefficent">Force Coefficent</label>
      <input
        type="range"
        name="forceCoefficent"
        min="0"
        max="0.2"
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
        max="0.5"
        step="0.01"
        bind:value={pointProvider.borderZone}
      />

      <label for="borderPushBack">Border Push Back</label>
      <input
        type="range"
        name="borderPushBack"
        min="0"
        max="0.02"
        step="0.0001"
        bind:value={pointProvider.borderPushBack}
      />

      <label for="damping">Damping</label>
      <input
        type="range"
        name="damping"
        min="0"
        max="1"
        step="0.01"
        bind:value={pointProvider.damping}
      />
    </div>
  </div>
  <div class="simulation">
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
    gap: 1rem;
  }

  div.simulation {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
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
    width: 100%;
  }

  div.options > div {
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

  div.options > div > label {
    margin-top: 1rem;
  }
</style>
