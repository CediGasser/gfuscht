<script lang="ts">
  import { ParameteredOne } from '$lib/experiments'
  import * as falloffFunctions from '$lib/classes/FalloffFunctions'

  let power = 1
  let falloffFunction = falloffFunctions.smileFalloff
  let threshholdFunction = (value: number): boolean => value > 5
</script>

<main>
  <ParameteredOne borderZone={300}/>
  <div>
    <label for="falloffFunction">Falloff Function </label>
    <select name="falloffFunction" bind:value={falloffFunction}>
      {#each Object.values(falloffFunctions) as func}
        <option value={func}>{func.name}</option>
      {/each}
    </select>
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