<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    before: Snippet
    after: Snippet
  }
  let { before, after }: Props = $props()

  let selectedTab = $state('before')
</script>

<div class="wrapper">
  <div class="tab-group">
    <input
      type="radio"
      name="tabs"
      id="before"
      bind:group={selectedTab}
      value="before"
    />
    <label for="before">Vorher</label>

    <input
      type="radio"
      name="tabs"
      id="after"
      bind:group={selectedTab}
      value="after"
    />
    <label for="after">Nachher</label>
    <span class="glider"></span>
  </div>
  {#if selectedTab === 'before'}
    {@render before()}
  {:else}
    {@render after()}
  {/if}
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 1.25rem;
    font-weight: 500;
    margin-top: 1rem;
  }

  .tab-group input[type='radio'] {
    display: none;
  }

  .tab-group {
    display: flex;
    padding: 0.2rem;
    border-radius: 0.7rem;
    box-shadow: inset 0 0 6px 1px rgba(0, 0, 0, 0.2);
    background-color: var(--theme-base);
  }

  .tab-group label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 100px;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
    z-index: 2;
  }

  .tab-group input[type='radio']:checked + label {
    color: var(--theme-primary);
  }

  .wrapper input[id='before']:checked ~ .glider {
    transform: translateX(0);
  }

  .wrapper input[id='after']:checked ~ .glider {
    transform: translateX(100%);
  }

  .glider {
    position: absolute;
    display: flex;
    height: 2rem;
    width: 100px;
    background-color: var(--theme-overlay);
    z-index: 1;
    border-radius: 0.5rem;
    transition: 0.15s ease-out;
  }
</style>
