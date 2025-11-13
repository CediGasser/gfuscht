<script lang="ts">
  import { T } from '@threlte/core'

  interface Props {
    position: { x: number; y: number }
    color?: string
  }
  let { position = { x: 0, y: 0 }, color = undefined }: Props = $props()
</script>

<T.Mesh position.x={position.x} position.y={position.y} position.z={0}>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color={color ?? '#00ADEF'} />
</T.Mesh>
