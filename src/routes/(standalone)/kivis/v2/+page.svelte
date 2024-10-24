<script lang="ts">
  import Chart from "../Chart.svelte";
  import data from "../data.json";

  console.log(data);
</script>

<main>
  <blockquote>"A new relationship between art and science."</blockquote>
  <p>Albert-László Barabási</p>
  <Chart {data} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #f0f0f0;
    color: #333;
    font-family: sans-serif;
  }
  blockquote {
    font-size: 2rem;
    font-weight: 300;
    text-align: center;
  }
  p {
    font-size: 1rem;
    font-weight: 300;
    text-align: center;
  }
</style>
