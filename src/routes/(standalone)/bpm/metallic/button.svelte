<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import './theme.css'

  interface Props extends HTMLButtonAttributes {
    children?: Snippet
  }

  let { children, ...props }: Props = $props()
</script>

<button {...props} class="metallic">{@render children?.()}</button>

<style>
  button {
    border-radius: 999px;
    padding: 1em 2em;
    cursor: pointer;
    color: #333;
    font-weight: 600;
    font-size: 2rem;
  }
</style>
