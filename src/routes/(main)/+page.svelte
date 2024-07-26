<script lang="ts">
  import Definition from '$lib/components/Definition.svelte'
  import { themeStore } from '$lib/classes/theme'

  let themes: Record<string, string> = {
    'theme-rose-pine': 'Rose Pine',
    'theme-rose-pine-dawn': 'Rose Pine Dawn',
    'theme-light': 'Light',
  }
</script>

<svelte:head>
  <title>Gfuscht</title>
  <meta name="description" content="Gfuscht" />
</svelte:head>

<main>
  <section>
    <Definition
      word="Gfuscht"
      phonetic="/gfu:ʃt/"
      type="Noun"
      definition="Things I do, to tell myself that I'm not wasting time."
    />
  </section>

  <section>
    <h1>Some experiments</h1>
    <ul>
      <li><a href="/gravitygrid">Gravitygrid</a></li>
      <li><a href="/metaballs?&id=3">Metaballs</a></li>
      <li><a href="/define">Define</a></li>
      <li><a href="/morse">Morse</a></li>
      <li><a href="/codesnippet">Codesnippet</a></li>
      <li><a href="/cribdrag">Cribdrag</a></li>
      <li><a href="/spotifystats">Spotifystats</a></li>
      <li><a href="/blendmode">Blendmode</a></li>
      <li><a href="/clock">Clock</a></li>
      <li><a href="/geo">Geo</a></li>
      <li><a href="/unitylight">Unity Light</a></li>
    </ul>
  </section>
</main>

<footer>
  <p>
    Code can be found <a href="https://github.com/CediGasser/gfuscht">here</a>
  </p>
  <select bind:value={$themeStore}>
    {#each Object.keys(themes) as theme}
      <option value={theme}>{themes[theme]}</option>
    {/each}
  </select>
</footer>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
    min-height: 100vh;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-block: 1rem;
  }

  footer {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background-color: var(--theme-surface);
  }

  footer select {
    background-color: var(--theme-overlay);
    color: var(--theme-text);
    padding: 0.5rem;
    border-radius: var(--theme-radius);
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 40px 0;
    }
  }
</style>
