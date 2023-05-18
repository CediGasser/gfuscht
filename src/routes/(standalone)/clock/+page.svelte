<script lang="ts">
  import { fade } from 'svelte/transition'
  import Digit from './Digit.svelte'
  import ListColumn from './ListColumn.svelte'

  export let XIIHoursDay = true
  export let time: Date // = new Date('2023-05-18T11:30:15')
  export let dateTime = time ?? new Date()

  let halfDays = ['AM', 'PM']
  $: listIndex = Math.floor(dateTime.getHours() / 12)

  $: hours = XIIHoursDay ? (dateTime.getHours() - 1) % 12 + 1 : dateTime.getHours()

  $: hours1 = Math.floor(hours / 10)
  $: hours2 = hours % 10

  $: minutes1 = Math.floor(dateTime.getMinutes() / 10)
  $: minutes2 = dateTime.getMinutes() % 10

  $: seconds1 = Math.floor(dateTime.getSeconds() / 10)
  $: seconds2 = dateTime.getSeconds() % 10

  setInterval(() => {
    if (!time) dateTime = new Date()
  }, 100)
</script>

<main>
  <div class="wrapper"
      on:click={() => XIIHoursDay = !XIIHoursDay} 
      on:keypress={() => XIIHoursDay = !XIIHoursDay}>
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
    background: #99eaf0;
  }

  span {
    padding: 1rem;
    line-height: 2rem;
    font-size: 2rem;
    font-weight: 800;
    text-align: center;
    height: 4rem;
    margin: .5rem;
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
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border-radius: 8px;
    box-shadow: inset 0 0 16px 64px #99eaf0,
                inset 0 0 64px 64px #99eaf0;
  }

  .clock {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .clock::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border-radius: 16px;
    border: solid 2px #4f7878;
  }
</style>
