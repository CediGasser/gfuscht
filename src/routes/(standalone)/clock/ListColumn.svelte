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
    text-shadow: 0px 0px 4px rgba(255, 230, 129, 1);
    transform: scale(1.5);
  }

  .text:not(.selected) {
    color: rgb(172, 193, 212);
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
    background-color: rgb(43, 58, 58);
    border-radius: 8px;
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.2);
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
    color: aliceblue;
    height: var(--digit-size);
  }
</style>