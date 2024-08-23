<script lang="ts">
  import { onMount } from 'svelte'
  import { applyFalloff, type FalloffType } from '$lib/classes/FalloffFunctions'
  import type { GravitySystem } from '$lib/classes/GravitySystem'

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  export let gravitySystem: GravitySystem
  export let width = 600
  export let height = 600

  export let ballSize = 20
  export let threshholdValue = 1
  export let falloffType: FalloffType = 'electricFieldFalloff'
  export let threshholdFunction = (value: number): boolean =>
    value > threshholdValue

  function draw() {
    ctx.clearRect(0, 0, width, height)
    const points = gravitySystem.getPoints()

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let totalValue = 0
        for (let i = 0, len = points.length; i < len; i++) {
          const ball = points[i]
          const dx = (x - ball.x) / ballSize
          const dy = (y - ball.y) / ballSize
          const value = applyFalloff(falloffType, dx, dy)
          totalValue += value
        }

        if (threshholdFunction(totalValue)) {
          let color = valueToColor()
          ctx.fillStyle = color
          ctx.fillRect(x, y, 1, 1)
        }
      }
    }
  }

  let frame: number
  function animate(t: number) {
    gravitySystem.update(t)
    draw()
    frame = requestAnimationFrame(animate)
  }

  onMount(() => {
    canvas = document.getElementById('canvas') as HTMLCanvasElement
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    animate(0)

    return () => cancelAnimationFrame(frame)
  })

  function valueToColor(value: number = 5): string {
    return `hsl(${value * 200}, 50%, 50%)`
  }
</script>

<canvas id="canvas" {width} {height}></canvas>

<style>
  canvas {
    box-shadow: 0 0 80px var(--theme-shadow);
  }
</style>
