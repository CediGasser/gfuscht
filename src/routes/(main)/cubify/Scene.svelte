<script lang="ts">
  import Cube from '$lib/components/Cube.svelte'
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'

  export let src: string
</script>

<T.PerspectiveCamera makeDefault position={{ x: 10, y: 10, z: 10 }} fov={24}>
  <OrbitControls
    autoRotate
    autoRotateSpeed={1}
    enableDamping
    enableZoom={false}
    target={{ y: 0.5 }}
  />
</T.PerspectiveCamera>

<T.DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
<T.DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />

<T.AmbientLight intensity={0.2} />

<Cube {src} />
