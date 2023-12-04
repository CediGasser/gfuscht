<script lang="ts">
  export let value: number = 0
  export let min: number = 0
  export let max: number = 9
  export let steps: number = 1

  $: numbers = Array(Math.ceil((max - min) / steps) + 1).fill(null).map((n, i) => min + i * steps)
  $: offset = Math.round((value - min) / steps)


</script>

<div class="wrapper">
  <div class="column" style="--offset: {offset};">
    {#each numbers as digit}
      <div class:selected={digit == value} class="num">
        <span >{digit}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .selected {
    text-shadow: 0px 0px 4px var(--theme-primary);
    transform: scale(1.5);
  }

  .num:not(.selected) {
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

  .num {
    aspect-ratio: 1 / 1;
    padding: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 2rem;
    line-height: 2rem;
    text-align: center;
    font-weight: 800;
    color: var(--theme-text);
    height: var(--digit-size);
    width: var(--digit-size);
    transition: all 0.2s ease-in-out;
    border-radius: 8px;
  }
</style>