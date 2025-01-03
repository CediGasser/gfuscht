<script lang="ts">
  import type { Snippet } from 'svelte'
  import { fade } from 'svelte/transition'

  interface Props {
    children?: Snippet
  }
  let { children }: Props = $props()

  let isOpen = $state(false)

  const open = (e: any) => {
    if (e.type === 'keypress' && e.key !== 'Enter') return
    isOpen = !isOpen
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="lightbox" onclick={open} onkeypress={open}>
  <div class="lightbox__content">
    {@render children?.()}
  </div>
  {#if isOpen}
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      class="overlay"
      transition:fade={{ duration: 200 }}
      tabindex="0"
      onblur={() => (isOpen = false)}
    >
      <div class="overlay__content">
        {@render children?.()}
      </div>
    </div>
  {/if}
</div>

<style>
  .lightbox:hover {
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    cursor: zoom-in;
  }

  .overlay {
    cursor: zoom-out;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background-color: var(--theme-base);
  }

  .overlay__content {
    padding: 1rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    object-fit: scale-down;
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
    display: flex;
  }
</style>
