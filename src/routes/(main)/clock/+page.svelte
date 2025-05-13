<script lang="ts">
  import Seo from '$lib/components/Seo.svelte'
  import Clock from './Clock.svelte'
  import { page } from '$app/state'

  let variant: 'clock' | 'countdown' = page.url.searchParams.has('countdown')
    ? 'countdown'
    : 'clock'

  let XIIHoursDay = $state(false)
  let dateTime = $state(new Date()) // Initialize date with 00:00:00
  dateTime.setHours(0, 0, 0, 0) // Set hours, minutes, seconds, and milliseconds to 0

  let targetTime: Date | null = $state(null)

  if (variant === 'countdown') {
    targetTime = new Date()
    let pageTime = page.url.searchParams
      .get('countdown')
      ?.split(':')
      .map(Number)
    if (!pageTime) pageTime = [0, 0, 0, 0]
    targetTime.setHours(
      pageTime[0] ?? 0,
      pageTime[1] ?? 0,
      pageTime[2] ?? 0,
      pageTime[3] ?? 0
    )
  }

  setInterval(() => {
    if (targetTime) {
      const midnight = new Date()
      midnight.setHours(0, 0, 0, 0)

      const now = new Date()

      const diff = targetTime.getTime() - now.getTime()

      dateTime = new Date(midnight.getTime() + Math.abs(diff))
    } else {
      dateTime = new Date()
    }
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
    <Clock XIIHoursDay={!targetTime && XIIHoursDay} {dateTime} />
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
