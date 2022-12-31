<script lang="ts">
    import '../../../app.css';
</script>

<section>
	<div class="definition-card">
		<input class="title unstyled" type="text" value="Custom" />
		<input class="phonetic unstyled" value="/whatever/ Noun" />
		<div contenteditable class="description unstyled">Create your custom minimalistic word definition.</div>
	</div>
</section>

<style>
    :root {
        --font-mono: 'Fira Mono', monospace;
        --heading-color: rgba(0, 0, 0, 0.7);
        --text-color: #444444;
        font-weight: 400;
    }

    section {
        font-family: Harmony, serif;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
        height: 100vh;
	}

    .unstyled {
        border: none;
        padding: 0;
    }

	.definition-card {
		display: block;
		text-align: start;
		padding: 1rem;
		width: min(400px, 100%);
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
	}

    .title {
        height: 2.4rem;
        font-size: 2rem;
        margin-block: 1.5rem;
        font-weight: 400;
        color: var(--heading-color);
        width: 100%;
    }

    .phonetic {
        font-size: 1rem;
        font-family: var(--font-mono);
        background-color: rgba(255, 255, 255, 0.45);
        border-radius: 3px;
        box-shadow: 2px 2px 6px rgb(255 255 255 / 25%);
        padding: 0.5em;
        overflow-x: auto;
        color: var(--text-color);
        margin-block: 0;
        height: 1.2rem;
    }

    .description {
        font-weight: 400;
        color: var(--heading-color);
        margin-block: 1rem;
        resize: none;
        overflow: hidden;
        white-space: pre-wrap;
    }

    @media (min-width: 720px) {
        .title {
            font-size: 2.4rem;
        }
    }
</style>