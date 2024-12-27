<script lang="ts">
  import Chart from "./Chart.svelte";
  import data from "./data.json";

  let height = $state(0);
  let width = $state(0);
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />
<main>
  <Chart {data} {height} {width} />
  <!-- <div class="text-container"> -->
  <!--   <blockquote>"A new relationship between art and science."</blockquote> -->
  <!--   <p>Albert-László Barabási</p> -->
  <!-- </div> -->
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
  }
  .text-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    text-wrap: pretty;
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
