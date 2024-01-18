<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Cube from '$lib/components/Cube.svelte'
  import ImageUpload from '$lib/components/ImageUpload.svelte'
  import Scene from './Scene.svelte'

  let imgSrc: string
</script>

<ImageUpload bind:dataUrl={imgSrc} />

<Canvas>
  <Scene src={imgSrc} />
</Canvas>
