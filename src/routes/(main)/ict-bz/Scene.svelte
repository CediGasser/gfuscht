<script lang="ts">
  import { page } from '$app/state'
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Pane, RotationEuler, Slider } from 'svelte-tweakpane-ui'

  import Cube from './Cube.svelte'

  import { cubes } from './data'

  // Controls shown based on query param 'enableControls' presence
  let showControls = page.url.searchParams.get('enableControls') !== null
  let rotation = $state({ x: 0.1, y: 0.28, z: 0.32 })
  let zoom = $state(60)
</script>

{#if showControls}
  <Pane position="fixed" title="Scene Controls">
    <RotationEuler label="Group Rotation" bind:value={rotation} />
    <Slider label="Zoom" min={20} max={100} step={0.1} bind:value={zoom} />
  </Pane>
{/if}

<T.OrthographicCamera makeDefault position={[0, 0, 20]} {zoom}>
  <OrbitControls />
</T.OrthographicCamera>

<T.DirectionalLight position={[0, 0, 10]} intensity={1} />
<T.AmbientLight intensity={0.5} />

<T.Group
  rotation.x={rotation.x}
  rotation.y={rotation.y}
  rotation.z={rotation.z}>
  {#each cubes as cube}
    <Cube position={cube.position} color={cube.color} />
  {/each}
</T.Group>
