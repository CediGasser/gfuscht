<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<main>
  <Canvas>
    <Scene />
  </Canvas>
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
