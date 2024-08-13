<script lang="ts">
  import Seo from '$lib/components/Seo.svelte'

  export let data

  const registerGeoHandler = () => {
    navigator.registerProtocolHandler('geo', 'geo?q=%s')
  }
</script>

<Seo
  title="geo: links"
  description="A demo to handle geo: link"
  keywords="uri handler, geo links"
/>

<main>
  <h1>
    <pre>geo:</pre>
    links can be handled by this site.
  </h1>
  <button on:click={registerGeoHandler}>Yes please</button>

  <div class="results">
    <h2>Results</h2>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
</main>

<style>
  main {
    padding: 2rem;
    height: 100vh;
  }

  h1 {
    text-align: center;
  }

  pre {
    display: inline;
    border-radius: 1rem;
    background-color: var(--theme-overlay);
    padding: 0.5rem;
  }

  button {
    display: block;
    margin: 0 auto;
    padding: 1em;
    font-size: 1.5em;
    border-radius: 0.5em;
    border: 0;
    background: var(--theme-primary);
    color: var(--theme-text);
    cursor: pointer;
  }
</style>
