<script lang="ts">
  import { fade } from 'svelte/transition'
  import Digit from './Digit.svelte'
  import ListColumn from './ListColumn.svelte'
  import Seo from '$lib/components/Seo.svelte'

  interface Props {
    XIIHoursDay?: boolean
    dateTime?: any
  }

  let { XIIHoursDay = false, dateTime = new Date() }: Props = $props()

  let halfDays = ['AM', 'PM']
  let listIndex = $derived(Math.floor(dateTime.getHours() / 12))

  let hours = $derived(
    XIIHoursDay ? ((dateTime.getHours() - 1) % 12) + 1 : dateTime.getHours()
  )

  let hours1 = $derived(Math.floor(hours / 10))
  let hours2 = $derived(hours % 10)

  let minutes1 = $derived(Math.floor(dateTime.getMinutes() / 10))
  let minutes2 = $derived(dateTime.getMinutes() % 10)

  let seconds1 = $derived(Math.floor(dateTime.getSeconds() / 10))
  let seconds2 = $derived(dateTime.getSeconds() % 10)
</script>

<Seo
  title="Clock"
  description="Digital clock with a fancy design. Click to toggle between 12 and 24 hours format."
  keywords="clock, digital, fancy, design, 12 hours, 24 hours"
/>

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

<style>
  span {
    padding: 1rem;
    line-height: 2rem;
    font-size: 2rem;
    font-weight: 800;
    text-align: center;
    height: 4rem;
    margin: 0.5rem;
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
</style>
