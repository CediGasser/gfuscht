<script lang="ts">
  import "$lib/assets/css/app.css";

  interface Props {
    word?: string;
    phonetic?: string;
    type?: string;
    definition?: string;
    editable?: boolean;
  }

  let {
    word = $bindable("Custom"),
    phonetic = $bindable("/ˈkəstəm/"),
    type = $bindable("Adjective"),
    definition = $bindable("This might be customizable. Try it."),
    editable = false,
  }: Props = $props();
</script>

<div class="definition-card">
  {#if editable}
    <input class="title" type="text" bind:value={word} />
    <pre><span contenteditable class="phonetic" bind:textContent={phonetic}
      ></span> <span contenteditable class="type" bind:textContent={type}
      ></span></pre>
    <div contenteditable class="definition" bind:textContent={definition}></div>
  {:else}
    <h1 class="title">{word}</h1>
    <pre><span class="phonetic">{phonetic}</span> <span class="type"
        >{type}</span
      ></pre>
    <div class="definition">{definition}</div>
  {/if}
</div>

<style>
  .definition-card {
    padding-block: 1rem;
    padding-inline: 2rem;
    width: min(400px, 100%);
    box-shadow: 0 0 30px var(--theme-shadow);
    border-radius: var(--theme-radius);
    color: var(--theme-text);
    background-color: var(--theme-surface);
  }

  .definition-card * {
    padding: 0;
    border: none;
    background: transparent;
  }

  .title {
    display: block;
    margin-block: 1rem;
    width: 100%;
    height: auto;
    font-size: 2.4em;
    font-weight: 400;
    color: var(--theme-primary);
  }

  .phonetic {
    font-family: var(--theme-font-mono);
    margin-inline-start: 0.5rem;
    color: var(--theme-subtle);
  }

  .type {
    font-weight: bold;
    margin-inline-start: 0.5rem;
    color: var(--theme-subtle);
  }

  .definition {
    font-weight: 400;
    margin-block: 1rem;
    text-wrap: pretty;
  }
</style>

