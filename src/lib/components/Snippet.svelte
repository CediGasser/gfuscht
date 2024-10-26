<script lang="ts">
  import { spring } from "svelte/motion";
  import Prism from "prismjs";
  import "prismjs/themes/prism-tomorrow.css";

  interface Props {
    code?: string;
    animateGradient?: boolean;
    rotateX?: any;
    rotateY?: any;
  }

  let {
    code = "",
    animateGradient = false,
    rotateX = spring(0, { damping: 0.3 }),
    rotateY = spring(0, { damping: 0.3 }),
  }: Props = $props();

  let div: HTMLDivElement | undefined = $state();

  const mouseMove = (e: MouseEvent) => {
    if (!div) return;
    let offset = div.getBoundingClientRect();
    let dx = e.clientX - offset.left - offset.width / 2;
    let dy = e.clientY - offset.top - offset.height / 2;

    rotateX.set(dy / -100);
    rotateY.set(dx / 100);
  };
</script>

<svelte:window onmousemove={mouseMove} />

<div class="wrapper">
  <div
    class="gradient-background"
    class:animate-gradient={animateGradient}
    style="--rotateX: {$rotateX}deg;--rotateY: {$rotateY}deg;"
    bind:this={div}
  >
    <div class="window-background">
      <div class="floating-code">
        {@html Prism.highlight(code, Prism.languages.js, "js")}
      </div>
    </div>
  </div>
</div>

<style>
  div {
    padding: 0.5rem;
  }

  .wrapper {
    font-family: "Courier New", Courier, monospace;
    color: white;
    perspective: 1800px;

    --rotateX: 0deg;
    --rotateY: 0deg;

    --distance: 20px;
  }

  .gradient-background {
    margin: 1rem;
    background: linear-gradient(
      45deg,
      #cf0000,
      #b103d0,
      #0000cf,
      #550086,
      #cf0000
    );
    background-repeat: repeat;
    background-size: 200% 200%;

    border-radius: 1.5rem;
    border: 1px solid rgba(200, 200, 200, 0.5);

    transform: translateZ(calc(-1 * var(--distance))) rotateX(var(--rotateX))
      rotateY(var(--rotateY));
    transform-style: preserve-3d;
  }

  .animate-gradient {
    animation: gradient 15s ease infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .window-background {
    background: rgba(0, 0, 0, 0.7);
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.5);
    transform: translateZ(var(--distance));
    transform-style: preserve-3d;
  }

  .floating-code {
    background: #000;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid #000;
    transform: translateZ(var(--distance));
    transform-style: preserve-3d;
    background: transparent;
    border: none;
    white-space: pre-wrap;
  }
</style>

