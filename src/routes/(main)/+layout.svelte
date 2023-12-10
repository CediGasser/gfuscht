<script lang="ts">
  import '$lib/assets/css/reset.css'
  import '$lib/assets/css/app.css'

  import { themeStore, themeRoot } from '$lib/classes/theme'; 
</script>

<div use:themeRoot class="{$themeStore}">
  <slot />
</div>

<style>
  div {
    background-color: var(--theme-base);
    color: var(--theme-text);
  }
</style>
