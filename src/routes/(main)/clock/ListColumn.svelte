<script lang="ts">
  export let index: number = 0
  export let values: string[] = ['AM', 'PM']
</script>

<div class="wrapper">
  <div class="column" style="--offset: {index};">
    {#each values as text, i}
      <div class="text" class:selected={i == index}>
        <span>{text}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .selected {
    text-shadow: 0px 0px 4px var(--theme-primary);
    transform: scale(1.5);
  }

  .text:not(.selected) {
    color: var(--theme-subtle);
  }

  .wrapper {
    --digit-size: 4rem;
    margin: .5rem;
    height: var(--digit-size);
  }

  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--theme-overlay);
    border-radius: 8px;
    box-shadow: 0 0 12px 4px var(--theme-surface);
    gap: 0;
    transition: all 0.2s ease-in;
    transform: translateY(calc(var(--offset) * var(--digit-size) * -1));
  }

  .text {
    padding: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 2rem;
    line-height: 2rem;
    text-align: center;
    font-weight: 800;
    color: var(--theme-text);
    height: var(--digit-size);
  }
</style>