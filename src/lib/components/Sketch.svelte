<script lang="ts">
  import p5 from 'p5'

  interface Props {
    sketch: (p: p5) => void
  }

  let { sketch }: Props = $props()
  let sketchElement: HTMLDivElement | null = $state(null)
  let p5Instance: p5 | null = $state(null)

  $effect(() => {
    if (!sketchElement || p5Instance) return

    p5Instance = new p5(sketch, sketchElement)
  })
</script>

<div bind:this={sketchElement}></div>
