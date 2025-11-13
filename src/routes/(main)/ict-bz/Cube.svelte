<script lang="ts">
  import { T } from '@threlte/core'
  import { Tween } from 'svelte/motion'

  interface Props {
    position: { x: number; y: number }
    color?: string
    scale?: number
  }
  let {
    position = { x: 0, y: 0 },
    color = undefined,
    scale = 1,
  }: Props = $props()

  let scaleHover = new Tween(0, { duration: 100 })

  const handlePointerOver = () => {
    scaleHover.target = 0.2
  }

  const handlePointerOut = () => {
    scaleHover.target = 0
  }
</script>

<T.Mesh
  position.x={position.x}
  position.y={position.y}
  position.z={0}
  scale={scale - scaleHover.current}
  onpointerover={handlePointerOver}
  onpointerout={handlePointerOut}>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color={color ?? '#00ADEF'} />
</T.Mesh>
