<script lang="ts">
  import { onMount } from 'svelte'
  import { applyFalloff, type FalloffType } from '$lib/classes/FalloffFunctions'
  import type {
    IPointsPainter,
    IPointsProvider,
  } from '$lib/types/CreativeCodingBasics'

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  export let provider: IPointsProvider
  export let painter: IPointsPainter
  export let width = 600
  export let height = 600

  let frame: number
  function animate(t: number) {
    provider.update(t)
    painter.paint(provider.getPoints())
    frame = requestAnimationFrame(animate)
  }

  onMount(() => {
    canvas = document.getElementById('canvas') as HTMLCanvasElement
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    painter.context = ctx

    animate(0)

    return () => cancelAnimationFrame(frame)
  })
</script>

<canvas id="canvas" {width} {height}></canvas>

<style>
  canvas {
    box-shadow: 0 0 80px var(--theme-shadow);
  }
</style>
