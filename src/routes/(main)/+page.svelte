<svelte:head>
	<title>Gfuscht</title>
	<meta name="description" content="Gfuscht" />
</svelte:head>

<section>
	<div class="definition-card">
		<h1>Gfuscht</h1>
		<pre>/gfu:ʃt/<b> Noun</b></pre>
		<p>Things I do, to tell myself that I'm not wasting time.</p>
	</div>
</section>

<section>
	<h1>Some projects</h1>
	<ul>
		<li><a href="/aaron">Aaron</a></li>
		<li><a href="/gravitygrid">Gravitygrid</a></li>
		<li><a href="/metaballs">Metaballs</a></li>
		<li><a href="/cubify">Cubify</a></li>
		<li><a href="/define">Define</a></li>
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

	.definition-card {
		display: block;
		text-align: start;
		padding: 1rem;
		width: min(400px, 100%);
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
		margin-block: 4rem;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin-block: 1rem;
	}
</style>
