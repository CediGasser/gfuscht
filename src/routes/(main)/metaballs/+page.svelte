<script lang="ts">
  import { First, BlackWhite, BlackWhiteBalls, IdkBlob } from '$lib/experiments'
  import { page } from '$app/stores'
  
  const components = [
    { name: 'First', component: First },
    { name: 'BlackWhite', component: BlackWhite },
    { name: 'BlackWhiteBalls', component: BlackWhiteBalls },
    { name: 'IdkBlob', component: IdkBlob }
  ];

  let current = parseInt($page.url.searchParams.get('id') || '0');
  $: $page.url.searchParams.set('id', current.toString());

</script>

<main>
<svelte:component this={components[current].component} />

<select bind:value={current}>
  {#each components as component, i}
    <option value={i} selected={current === i}>{component.name}</option>
  {/each}
</select>
</main>


<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  select {
    margin-top: 1rem;
    height: 2rem;
  }
</style>