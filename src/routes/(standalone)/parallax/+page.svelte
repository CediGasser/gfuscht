<script lang="ts">
  import Seo from "$lib/components/Seo.svelte";

  const layers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  let scrollY: number = $state(0);
</script>

<Seo
  title="Parallax"
  description="A parallax effect with multiple layers. At the moment, blatantly copied from the REPL with the content from Firewatch."
  keywords="parallax, effect, layers, firewatch"
/>

<svelte:window bind:scrollY />

<a class="parallax-container" href="https://www.firewatchgame.com">
  {#each layers as layer}
    <img
      style="transform: translate(0,{(-scrollY * layer) /
        (layers.length - 1)}px)"
      src="https://www.firewatchgame.com/images/parallax/parallax{layer}.png"
      alt="parallax layer {layer}"
    />
  {/each}
</a>

<div class="text">
  <span style="opacity: {1 - Math.max(0, scrollY / 40)}"> scroll down </span>

  <div class="foreground">
    You have scrolled {scrollY} pixels
  </div>
</div>

<style>
  :global(html) {
    background-color: rgb(32, 0, 1);
  }
  .parallax-container {
    position: fixed;
    width: 2400px;
    height: 712px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .parallax-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    will-change: transform;
  }

  .parallax-container img:last-child::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(45, 10, 13);
  }

  .text {
    position: relative;
    width: 100%;
    height: 300vh;
    color: rgb(220, 113, 43);
    text-align: center;
    padding: 4em 0.5em 0.5em 0.5em;
    box-sizing: border-box;
    pointer-events: none;
  }

  span {
    display: block;
    font-size: 1em;
    text-transform: uppercase;
    will-change: transform, opacity;
  }

  .foreground {
    position: absolute;
    top: 711px;
    left: 0;
    width: 100%;
    height: calc(100% - 712px);
    background-color: rgb(32, 0, 1);
    color: white;
    padding: 50vh 0 0 0;
  }
</style>
