<script lang="ts">
    import '$lib/assets/css/app.css'
    export let word: string = 'Custom'
    export let phonetic: string = '/ˈkəstəm/'
    export let type: string = 'Adjective'
    export let definition: string = 'This might be customizable. Try it.'

    export let editable: boolean = false
</script>

<div class="definition-card">
    {#if editable}
        <input class="title" type="text" bind:value={word} />
        <pre><span contenteditable class="phonetic" bind:textContent={phonetic} /> <span contenteditable class="type" bind:textContent={type}/></pre>
        <div contenteditable class="definition" bind:textContent={definition} />
    {:else}
        <h1 class="title">{word}</h1>
        <pre><span class="phonetic">{phonetic}</span> <span class="type">{type}</span></pre>
        <div class="definition">{definition}</div>
    {/if}
</div>

<style>
	.definition-card {
		padding: 1rem;
		width: min(400px, 100%);
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
	}

    .definition-card * {
        padding: 0;
        border: none;
        color: var(--text-color);
        background: transparent;
    }

    .title {
        display: block;
        margin-block: 1rem;
        width: 100%;
        height: auto;
        font-size: 2.4em;
        font-weight: 400;
        color: var(--heading-color);
    }

    .phonetic {
        font-family: var(--font-mono);
        margin-inline-start: 0.5rem;
    }

    .type {
        font-weight: bold;
        margin-inline-start: 0.5rem;
    }

    .definition {
        font-weight: 400;
        color: var(--heading-color);
        margin-block: 1rem;
    }
</style>