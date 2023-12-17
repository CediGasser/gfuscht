<script lang="ts">
	import { page } from '$app/stores';
</script>

<main>
  <h1>{$page.status}</h1>
  <h2>{$page.error?.message}</h2>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: var(--theme-base);
    font-family: var(--font-mono);
  }
  h1 {
    text-align: center;
    font-size: 2rem;
    font-weight: 400;
    margin: 0;
    color: var(--theme-text);
  }
  h2 {
    text-align: center;
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
    color: var(--theme-text);
  }
</style>