<script lang="ts">
  import Definition from '$lib/components/Definition.svelte'
</script>

<svelte:head>
	<title>Gfuscht</title>
	<meta name="description" content="Gfuscht" />
</svelte:head>

<section>
	<Definition word="Gfuscht" phonetic="/gfu:ʃt/" type="Noun" definition="Things I do, to tell myself that I'm not wasting time." />
</section>

<section>
	<h1>Some experiments</h1>
	<ul>
		<li><a href="/aaron">Aaron</a></li>
		<li><a href="/gravitygrid">Gravitygrid</a></li>
		<li><a href="/metaballs?&id=3">Metaballs</a></li>
		<li><a href="/cubify">Cubify</a></li>
		<li><a href="/define">Define</a></li>
		<li><a href="/morse">Morse</a></li>
		<li><a href="/codesnippet">Codesnippet</a></li>
		<li><a href="/pencil">Pencil</a></li>
		<li><a href="/cribdrag">Cribdrag</a></li>
		<li><a href="/spotifystats">Spotifystats</a></li>
		<li><a href="/blendmode">Blendmode</a></li>
		<li><a href="/clock">Clock</a></li>
	</ul>
</section>

<style>
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
</style>
