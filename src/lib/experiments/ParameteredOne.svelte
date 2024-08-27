<script lang="ts">
  import { onMount } from 'svelte'
  import type {
    IPointsPainter,
    IPointsProvider,
  } from '$lib/types/CreativeCodingBasics'

  type Props = {
    provider: IPointsProvider
    painter: IPointsPainter
    width?: number
    height?: number
    isPlaying?: boolean
  }

  let {
    provider,
    painter,
    width = 600,
    height = 600,
    isPlaying = $bindable(true),
  }: Props = $props()

  let frame: number = 0

  let canvas: HTMLCanvasElement | null = $state(null)

  $effect(() => {
    if (canvas) {
      const ctx = canvas.getContext('2d')
      painter.context = ctx
    }
  })

  function animate(t: number) {
    provider.update(t)
    painter.paint(provider.getPoints())
    frame = requestAnimationFrame(animate)
  }

  $effect(() => {
    if (isPlaying) {
      animate(0)
    }
    return () => cancelAnimationFrame(frame)
  })
</script>

<canvas bind:this={canvas} {width} {height}></canvas>

<style>
  canvas {
    border: 1px solid var(--theme-primary);
    border-radius: var(--theme-radius);
  }
</style>
