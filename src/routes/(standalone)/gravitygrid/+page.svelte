<script lang="ts">
	import { onMount } from 'svelte'
	import { Particle, Effect } from '$lib/classes/gravitygrid'

	let canvas: HTMLCanvasElement
	let effect: Effect

	onMount(() => {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		let ctx = canvas.getContext('2d')

		effect = new Effect(canvas, 5, 15, canvas.width)
		effect.setup()

		effect.draw()
		
		const animate = () => {
			effect.update()
			effect.draw()
			requestAnimationFrame(animate)
		}

		animate()
	})
</script>

<canvas bind:this={canvas} />

<style>
	canvas {
		top: 0;
		left: 0;
		opacity: 0.5;
		z-index: -1;
	}
	h1 {
		text-align: center;
	}
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		height: 100vh;
	}
</style>
