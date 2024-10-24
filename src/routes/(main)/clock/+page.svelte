<script lang="ts">
  import { fade } from 'svelte/transition'
  import Digit from './Digit.svelte'
  import ListColumn from './ListColumn.svelte'
  import Seo from '$lib/components/Seo.svelte'

  interface Props {
    XIIHoursDay?: boolean;
    time: Date;
    dateTime?: any;
  }

  let { XIIHoursDay = $bindable(false), time, dateTime = $bindable(time ?? new Date()) }: Props = $props();

  let halfDays = ['AM', 'PM']
  let listIndex = $derived(Math.floor(dateTime.getHours() / 12));

  let hours = $derived(XIIHoursDay
    ? ((dateTime.getHours() - 1) % 12) + 1
    : dateTime.getHours());

  let hours1 = $derived(Math.floor(hours / 10));
  let hours2 = $derived(hours % 10);

  let minutes1 = $derived(Math.floor(dateTime.getMinutes() / 10));
  let minutes2 = $derived(dateTime.getMinutes() % 10);

  let seconds1 = $derived(Math.floor(dateTime.getSeconds() / 10));
  let seconds2 = $derived(dateTime.getSeconds() % 10);

  setInterval(() => {
    if (!time) dateTime = new Date()
  }, 100)
</script>

<Seo
  title="Clock"
  description="Digital clock with a fancy design. Click to toggle between 12 and 24 hours format."
  keywords="clock, digital, fancy, design, 12 hours, 24 hours"
/>

<main>
  <div
    class="wrapper"
    onclick={() => (XIIHoursDay = !XIIHoursDay)}
    onkeypress={() => (XIIHoursDay = !XIIHoursDay)}
    role="button"
    tabindex="0"
  >
    <div class="clock">
      <Digit value={hours1} max={XIIHoursDay ? 1 : 2} />
      <Digit value={hours2} />
      <span>:</span>
      <Digit value={minutes1} max={5} />
      <Digit value={minutes2} />
      <span>:</span>
      <Digit value={seconds1} max={5} />
      <Digit value={seconds2} />
      {#if XIIHoursDay}
        <div transition:fade>
          <ListColumn index={listIndex} values={halfDays} />
        </div>
      {/if}
    </div>
  </div>
</main>

<style>
  main {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--theme-base);
  }

  span {
    padding: 1rem;
    line-height: 2rem;
    font-size: 2rem;
    font-weight: 800;
    text-align: center;
    height: 4rem;
    margin: 0.5rem;
  }

  .wrapper {
    display: flex;
    align-items: center;
    height: 90vh;
    overflow: hidden;
    position: relative;
    padding: 100px;
    cursor: pointer;
  }

  .wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border-radius: 8px;
    box-shadow:
      inset 0 0 16px 64px var(--theme-base),
      inset 0 0 64px 64px var(--theme-base);
  }

  .clock {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .clock::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border-radius: 16px;
    border: solid 2px var(--theme-primary);
  }

  @media (max-width: 850px) {
    .wrapper {
      transform: scale(0.6);
      padding: 4px;
      overflow: visible;
    }

    .wrapper::after {
      box-shadow: none;
    }
  }

  @media (max-width: 450px) {
    .wrapper {
      transform: scale(0.4);
      padding: 4px;
      overflow: visible;
    }

    .wrapper::after {
      box-shadow: none;
    }
  }
</style>
