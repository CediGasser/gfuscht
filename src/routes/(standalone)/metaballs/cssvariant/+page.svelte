<script lang="ts">
  import { onMount } from "svelte"

  export let ballCount: number = 8

  let frame: number
  let balls: Array<{ x: number, y: number, vx: number, vy: number, size: number, color: string }> = []
  const FORCE_COEFICIENT = 10
  const MAX_VELOCITY = 8
  const PUSH_BACK = 1

  const setup = () => {
    balls = Array(ballCount).fill(0).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: Math.random() * 10 - 5,
      vy: Math.random() * 10 - 5,
      size: Math.random() * 100 + 50,
      color: `rgb(${Math.random() * 255}, 0, ${Math.random() * 255})`
    }))
  }

  const update = (t: number) => {
    for (let i = 0; i < balls.length; i++) {
      const ball1 = balls[i];
      for (let j = i + 1; j < balls.length; j++) {
        const ball2 = balls[j];

        // Calculate the distance between the balls
        const dx = ball1.x - ball2.x;
        const dy = ball1.y - ball2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate the force of attraction or repulsion
        const force = FORCE_COEFICIENT / distance;

        // Update the velocities of the balls based on the force
        ball1.vx -= force * dx / distance;
        ball1.vy -= force * dy / distance;
        ball2.vx += force * dx / distance;
        ball2.vy += force * dy / distance;
      }
    }

    // Update the positions of the balls based on their velocities
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];

      // Limit the velocities of the balls to a maximum value
      ball.vx = Math.min(Math.max(ball.vx, -MAX_VELOCITY), MAX_VELOCITY);
      ball.vy = Math.min(Math.max(ball.vy, -MAX_VELOCITY), MAX_VELOCITY);

      ball.x += ball.vx;
      ball.y += ball.vy;

      // Bounce the balls off the walls and slow them down
      if (ball.x < 0 || ball.x > window.innerWidth) {
        ball.vx = -ball.vx * 0.9;
      }
      if (ball.y < 0 || ball.y > window.innerHeight) {
        ball.vy = -ball.vy * 0.9;
      }

      // Slow the balls down at border areas
      if (ball.x < window.innerHeight * 0.25) {
        ball.vx += PUSH_BACK;
      }
      if (ball.x > window.innerWidth * 0.75) {
        ball.vx -= PUSH_BACK;
      }
      if (ball.y < window.innerWidth * 0.25) {
        ball.vy += PUSH_BACK;
      }
      if (ball.y > window.innerHeight * 0.75) {
        ball.vy -= PUSH_BACK;
      }

      // Randomly alter the ball's trajectory
      if (Math.random() < 0.1) {
        ball.vx += Math.random() * 10 - 5;
        ball.vy += Math.random() * 10 - 5;
      }
    }

    balls = balls
  }

  const animate: FrameRequestCallback = (t) => {
    update(t)
    frame = requestAnimationFrame(animate)
  }

  onMount(() => {
    setup()
    animate(0)
    return () => {
      cancelAnimationFrame(frame)
    }
  })
</script>

<div class="outer-container">
  <div class="inner-container">
    {#each balls as ball}
      <div class="metaball" style="--size: {ball.size}px; --color: {ball.color}; transform: translate({ball.x - ball.size/2}px, {ball.y - ball.size/2}px;"></div>
    {/each}
  </div>
</div>

<svelte:head>
  <style>
    html, body {
      background-color: white;
    }
  </style>
</svelte:head>

<style>
  .outer-container {
    filter: contrast(4) blur(5px);
    background-color: white;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .inner-container {
    filter: blur(20px);
    background-color: white;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .metaball {
    position: absolute;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: radial-gradient(farthest-side, var(--color), transparent);
    top: 0;
    left: 0;
  }
</style>