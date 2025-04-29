<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children?: Snippet
  }

  let { children }: Props = $props()
</script>

<div class="wrapper">
  <div class="sidebar">
    <h3>Beautiful Mathematics</h3>
    <ul>
      <li><a href="/matbf/connected-cubes">Connected Cubes</a></li>
    </ul>
  </div>
  <main>
    {@render children?.()}
  </main>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: row;
    height: 100vh;
  }

  .sidebar {
    width: 200px;
    padding: 20px;
    margin: 1rem;
    background-color: var(--theme-surface);
    border-radius: 8px;
  }

  .sidebar h3 {
    margin: 0;
    margin-bottom: 1rem;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  main {
    flex-grow: 1;
    padding: 20px;
  }
</style>
