<script lang="ts">
  import {
    First,
    BlackWhite,
    BlackWhiteBalls,
    IdkBlob,
  } from "$lib/experiments";
  import { page } from "$app/stores";
  import Seo from "$lib/components/Seo.svelte";

  const components = [
    { name: "First", component: First },
    { name: "BlackWhite", component: BlackWhite },
    { name: "BlackWhiteBalls", component: BlackWhiteBalls },
    { name: "IdkBlob", component: IdkBlob },
  ];

  let current = $state(parseInt($page.url.searchParams.get("id") || "0"));
  $effect(() => {
    $page.url.searchParams.set("id", current.toString());
  });

  let MetaballsComponent = $derived(components[current].component);
</script>

<Seo
  title="Metaballs"
  description="A collection of metaballs experiments."
  keywords="metaballs, experiments"
/>

<main>
  <MetaballsComponent />

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
