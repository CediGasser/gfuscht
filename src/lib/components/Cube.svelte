<script lang="ts">
  import { T, useLoader } from '@threlte/core'
  import { interactivity } from '@threlte/extras'
  import { TextureLoader } from 'three'
  import { spring } from 'svelte/motion'

  interactivity()

  export let src: string = 'trump.png'
  const scale = spring(1)

  function debounce<T extends Function>(cb: T, wait = 20) {
    let h: number | null = null
    let callable = (...args: any) => {
      if (h) clearTimeout(h)
      h = setTimeout(() => {
        cb(...args)
      }, wait)
    }
    return <T>(<any>callable)
  }

  const resetScale = debounce(function () {
    $scale = 1
  }, 100)

  const makeBigger = () => {
    $scale += 0.1
    resetScale()
  }

  $: texture = useLoader(TextureLoader).load(src)
</script>

<!-- Cube -->
<T.Group>
  {#await texture then texture}
    <T.Mesh scale={$scale} position={{ y: 0.5 }} on:click={makeBigger}>
      <T.BoxGeometry args={[1, 1, 1]} />
      <T.MeshStandardMaterial color="#ffffff" map={texture} />
    </T.Mesh>
  {/await}
</T.Group>
