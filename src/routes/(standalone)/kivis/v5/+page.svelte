<script lang="ts">
  import Chart from './Chart.svelte'
  import data from './data.json'

  let height = $state(0)
  let width = $state(0)
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />
<main>
  <div class="chart">
    <Chart {data} {height} {width} />
  </div>
  <div class="text-container">
    <blockquote>
      "A new relationship between <span>art</span>and <span>science</span>."
    </blockquote>
    <p>Albert-László Barabási</p>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #333;
    color: #333;
    font-family: sans-serif;
    z-index: -1;
  }
  div.chart {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
  }
  .text-container {
    color: #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    text-wrap: pretty;
    z-index: 1;
  }
  .text-container span {
    color: purple;
    z-index: 4;
  }
  blockquote {
    font-size: 2rem;
    font-weight: 300;
  }
  p {
    font-size: 1rem;
    font-weight: 300;
    text-align: center;
  }
</style>
