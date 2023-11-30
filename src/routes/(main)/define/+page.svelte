<script lang="ts">
    import Definition from "$lib/components/Definition.svelte"
</script>

<section>
	<Definition definition="This can be customized. Edit any text here." editable />
</section>

<style>
  section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
    height: 100vh;
	}
</style>