<script lang="ts">
  export let code = '';
  export let animateGradient = false;

</script>

<div class="wrapper">
  <div class="gradient-background" class:animate-gradient={animateGradient}>
    <div class="window-background">
      <div class="floating-code">
          <pre><code>{code}</code></pre>
      </div>
    </div>
  </div>
</div>

<style>
  div {
    padding: .5rem;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: white;

    perspective: 20px;
  }

  .gradient-background {
    margin: 1rem;
    background: linear-gradient(45deg, #cf0000, #b103d0);
    border-radius: 1rem;
    border: 1px solid #000;

    transform: translateZ(-1px) rotateX(1deg) rotateY(1deg);
  }

  .animate-gradient {
    animation: gradient 1s ease infinite;
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
    background: #000;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid #000;
    transform: translateZ(1px);
  }

  .floating-code {
    background: #000;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid #000;
    transform: translateZ(2px);
  }
</style>