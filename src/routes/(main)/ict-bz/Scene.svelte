<script lang="ts">
  import { page } from '$app/state'
  import { T } from '@threlte/core'
  import { interactivity, OrbitControls } from '@threlte/extras'
  import { Pane, RotationEuler, Slider } from 'svelte-tweakpane-ui'

  import Cube from './Cube.svelte'

  import { cubeSystem } from './data.svelte'
  import { Spring, Tween } from 'svelte/motion'
  import { sleep } from '$lib/utils'

  // Controls shown based on query param 'enableControls' presence
  let showControls = page.url.searchParams.get('enableControls') !== null
  let disableOrbitControls =
    page.url.searchParams.get('disableOrbitControls') !== null
  let rotationSetting = $state({ x: 0.1, y: 0.28, z: 0.32 })
  let zoomSetting = $state(60)

  // Animation
  let rotationAngle = new Spring(0, { stiffness: 0.01, damping: 0.5 })
  let scaleFactor = new Tween(0.9, { duration: 200 })

  async function animationLoop() {
    while (true) {
      // Go do final positions
      await cubeSystem.animateToFinalPositions()

      // Scale to 1
      scaleFactor.target = 1
      await sleep(400)

      // Rotate once
      rotationAngle.target = rotationAngle.current + Math.PI * 2
      await sleep(4000)

      // Scale back down
      scaleFactor.target = 0.9

      // Go do initial positions
      await cubeSystem.animateToInitialPositions()
      await sleep(1000)
    }
  }

  interactivity()

  animationLoop()
</script>

{#if showControls}
  <Pane position="fixed" title="Scene Controls">
    <RotationEuler label="Group Rotation" bind:value={rotationSetting} />
    <Slider
      label="Zoom"
      min={20}
      max={100}
      step={0.1}
      bind:value={zoomSetting} />
  </Pane>
{/if}

<T.OrthographicCamera makeDefault position={[0, 0, 20]} zoom={zoomSetting}>
  <OrbitControls enabled={!disableOrbitControls} />
</T.OrthographicCamera>

<T.DirectionalLight position={[0, 0, 10]} intensity={1} />
<T.AmbientLight intensity={0.5} />

<T.Group rotation.y={rotationAngle.current}>
  <T.Group
    rotation.x={rotationSetting.x}
    rotation.y={rotationSetting.y}
    rotation.z={rotationSetting.z}>
    {#each cubeSystem.cubes as cube}
      <Cube
        position={cube.position.current}
        color={cube.color}
        scale={scaleFactor.current} />
    {/each}
  </T.Group>
</T.Group>
