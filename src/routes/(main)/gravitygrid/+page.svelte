<script lang="ts">
	import { onMount } from 'svelte'
	import { Effect } from '$lib/classes/gravitygrid'
	import { themeStore } from '$lib/classes/theme'

	let canvas: HTMLCanvasElement
	let effect: Effect

	onMount(() => {
		let accent = themeStore.getPropertyValue('--theme-primary') ?? 'red'

		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		effect = new Effect(canvas, 5, 15, 100, accent)
		effect.setup()

		effect.draw()
		
		const animate = () => {
			effect.update()
			effect.draw()
			return requestAnimationFrame(animate)
		}

		let frame = animate()

		return () => {
			cancelAnimationFrame(frame)
		}
	})
</script>

<canvas bind:this={canvas} />

<style>
	canvas {
		background-color: var(--theme-base);
		top: 0;
		left: 0;
		opacity: 0.5;
		z-index: -1;
	}
</style>
