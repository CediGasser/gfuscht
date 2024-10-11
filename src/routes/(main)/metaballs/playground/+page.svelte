<script lang="ts">
  import { ParameteredOne } from '$lib/experiments'
  import { GravitySystem } from '$lib/classes/GravitySystem'
  import { MetaballsPainter } from '$lib/classes/MetaballsPainter'
  import { GradientPainter } from '$lib/classes/GradientPainter'
  import type { IPointsPainter } from '$lib/types/CreativeCodingBasics'

  let width = 600
  let height = 600
  let isPlaying = $state(true)

  const painters = {
    Gradient: new GradientPainter(),
    Metaballs: new MetaballsPainter(),
  } as const

  let pointProvider = $state(GravitySystem.fromRandom(width, height, 10))

  let selectedPainter: keyof typeof painters = $state('Metaballs')
  let pointPainter: IPointsPainter = $derived(painters[selectedPainter])

  let negativeCharges = $state(false)

  const onRandomize = () => {
    pointProvider = GravitySystem.fromRandom(width, height, 10, negativeCharges)
    pointPainter.paint(pointProvider.getPoints())
  }
</script>

<main>
  <div class="options">
    <pointPainter.OptionsComponent pointsPainter={pointPainter} />
    <label for="painter">Painter</label>
    <select name="painter" bind:value={selectedPainter}>
      {#each Object.keys(painters) as painter}
        <option value={painter}>{painter}</option>
      {/each}
    </select>
    <div class="pointsProvider">
      <label for="randomCharges">Negative Charges</label>
      <input
        type="checkbox"
        name="randomCharges"
        bind:checked={negativeCharges}
        onchange={onRandomize}
      />

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
