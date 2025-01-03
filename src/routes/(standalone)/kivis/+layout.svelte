<script lang="ts">
  import type { Snippet } from 'svelte'
  import { goto } from '$app/navigation'

  interface Props {
    children?: Snippet
  }
  let { children }: Props = $props()

  const onNavigate = (event: KeyboardEvent) => {
    console.log(event.key)
    if (event.key >= '1' && event.key <= '6') {
      event.preventDefault()
      goto(`/kivis/v${event.key}`)
    }
  }
</script>

<svelte:body onkeypress={onNavigate} />

{@render children?.()}
