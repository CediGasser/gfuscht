<script lang="ts">
	import { onMount } from 'svelte'
	import { Particle, Effect } from '$lib/classes/gravitygrid'

	let canvas: HTMLCanvasElement
	let height = 300
	let width = 600
	let effect: Effect

	onMount(() => {
		canvas.width = width
		canvas.height = height

		let ctx = canvas.getContext('2d')

		effect = new Effect(canvas, width, height, 10, 90)
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


<h1>Yo</h1>
<canvas bind:this={canvas} />
