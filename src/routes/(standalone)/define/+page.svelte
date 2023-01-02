<script lang="ts">
    import Definition from "$lib/components/Definition.svelte"
</script>

<section>
	<Definition definition="This can be customized. Edit any text here." editable />
</section>

<style>
    :root {
        --font-mono: 'Fira Mono', monospace;
        --heading-color: rgba(0, 0, 0, 0.7);
        --text-color: #444444;
        font-weight: 400;
    }

    section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
        height: 100vh;
	}
</style>