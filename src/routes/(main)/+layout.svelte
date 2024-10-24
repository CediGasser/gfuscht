<script lang="ts">
  import '$lib/assets/css/reset.css'
  import '$lib/assets/css/app.css'

  import { themeStore, themeRoot } from '$lib/classes/theme';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props(); 
</script>

<div use:themeRoot class="{$themeStore}">
  {@render children?.()}
</div>

<style>
  div {
    background-color: var(--theme-base);
    color: var(--theme-text);
  }
</style>
