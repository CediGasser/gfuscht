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
      <span class="behind">"A new relationship between</span>
      <span class="front">art </span>
      <span class="behind"> and </span>
      <span class="front">science</span>
      <span class="behind">."</span>
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
    background: radial-gradient(circle farthest-side, #191119, #000000);
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
    color: #e4ddec;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    text-wrap: pretty;
    width: 600px;
    margin-bottom: 550px;
  }

  .text-container span {
    position: relative;
  }

  .front {
    z-index: 4;
    color: purple;
  }

  .behind {
    z-index: 1;
  }

  blockquote {
    font-size: 3rem;
    font-weight: 500;
  }
  p {
    font-size: 1.5rem;
    font-weight: 300;
    text-align: center;
    color: #59a6ff;
  }
</style>
