<script lang="ts">
  import { tweened } from 'svelte/motion'
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import Pencil from './Pencil.svelte'

  let float = tweened(1)
  
  const LIGHTS_COUNT = 22
  const LIGHTS_SPACE = 22 * .2 / LIGHTS_COUNT
  const LIGHTS_RADIUS = .4

  let pointLights = Array(LIGHTS_COUNT).fill('').map((_, i) => {
      let angle = (Math.random() * 2 - 1 ) * Math.PI * 2;
      return {
          position: {
              x: Math.cos(angle) * LIGHTS_RADIUS,
              y: i * LIGHTS_SPACE,
              z: Math.sin(angle) * LIGHTS_RADIUS,
          },
          color: Math.random() * 0xFFFFFF
      }
  })

  const scroll = (e: Event) => {
      let shift = window.scrollY / 300
      pointLights.forEach((p, i) => {
          p.position.y = i * .2 + shift
          if (p.position.y > LIGHTS_COUNT * .2) {
              p.position.y %= LIGHTS_COUNT * LIGHTS_SPACE
          }
      })
      pointLights = pointLights
  }
</script>

<svelte:window on:scroll={scroll}/>

<T.PerspectiveCamera position={{ x:10, y: 10, z: 10 }} fov={24}>
    <OrbitControls
        autoRotate
        autoRotateSpeed={1}
        enableDamping
        enableZoom={true}
    />
</T.PerspectiveCamera>

<T.DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} intensity={0.1} />
<T.DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.1} />
<T.AmbientLight intensity={0.1} />

<T.Group position={{y: -2}}>
    {#each pointLights as light}
        <T.PointLight {...light}/>
    {/each}
</T.Group>

<!-- Pen -->
<T.Group scale={$float} on:click={() => ($float = 3)}>
    <Pencil 
        scale={0.03}
        castShadow 
        receiveShadow/>
</T.Group>
