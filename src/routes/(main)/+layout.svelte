<script lang="ts">
  import '$lib/assets/css/reset.css'
  import '$lib/assets/css/app.css'
</script>

<div class="theme-rose-pine">
  <slot />
</div>

<style>
  div {
    background-color: var(--theme-base);
    color: var(--theme-text);
  }
</style>
