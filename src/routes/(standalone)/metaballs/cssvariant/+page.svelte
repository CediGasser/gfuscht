<script lang="ts">
  import { onMount } from "svelte"

  export let ballCount: number = 8

  let frame: number
  let balls: Array<{ x: number, y: number, vx: number, vy: number, size: number, color: string, charge: number }> = []
  const FORCE_COEFICIENT = 6
  const MAX_VELOCITY = 20
  const PUSH_BACK = 1
  const STEPS = 0.0000001
  const MIN_BLOB_SIZE = 150
  const MAX_BLOB_SIZE = 250
  const RANDOM_MOVEMENT = 20

  export function pulseDeterent() {
    const { totalX, totalY } = balls.reduce((acc, ball) => {
      acc.totalX += ball.x
      acc.totalY += ball.y
      return acc
    }, { totalX: 0, totalY: 0 })

    let deterent = {
      x: totalX / balls.length,
      y: totalY / balls.length,
      _vx: 0,
      _vy: 0,
      size: 100,
      color: `rgb(${Math.random() * 255}, 0, ${Math.random() * 255})`,
      charge: -1000,
      get vx() {
        return this._vx
      },
      get vy() {
        return this._vy
      },
      set vx(v) {},
      set vy(v) {},
    }

    balls = [...balls, deterent]

    const interval = setInterval(() => {
      deterent.charge += 1;
    }, 10)

    setTimeout(() => {
      balls = balls.filter(b => b !== deterent)
      clearInterval(interval)
    }, 250)
  }

  const setup = () => {
    balls = Array(ballCount).fill(0).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: Math.random() * 10 - 5,
      vy: Math.random() * 10 - 5,
      size: Math.random() * MIN_BLOB_SIZE + MAX_BLOB_SIZE - MIN_BLOB_SIZE,
      color: `rgb(${Math.random() * 255}, 0, ${Math.random() * 255})`,
      charge: 1,
    }))
  }

  let tPrevious = 0

  const update = (t: number) => {
    // Calculate time since last frame
    let tDelta = t - tPrevious

    // Update the velocities of the balls based on the forces between them
    for (let i = 0; i < balls.length; i++) {
      const ball1 = balls[i];
      for (let j = i + 1; j < balls.length; j++) {
        const ball2 = balls[j];

        // Calculate the distance between the balls
        const dx = ball1.x - ball2.x;
        const dy = ball1.y - ball2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate the force of attraction
        const force = FORCE_COEFICIENT / distance * ball1.charge * ball2.charge;

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

      // Dampen the velocities after a certain max value
      if (ball.vx > MAX_VELOCITY || ball.vx < MAX_VELOCITY) {
        ball.vx *= 0.99
      }
      if (ball.vy > MAX_VELOCITY || ball.vy < MAX_VELOCITY) {
        ball.vy *= 0.99
      }

      ball.x += ball.vx * t * STEPS
      ball.y += ball.vy * t * STEPS

      // Bounce the balls off the walls and slow them down
      if (ball.x < 0 || ball.x > window.innerWidth) {
        ball.vx = -ball.vx * 0.9;
      }
      if (ball.y < 0 || ball.y > window.innerHeight) {
        ball.vy = -ball.vy * 0.9;
      }

      // Slow the balls down at border areas
      if (ball.x < window.innerHeight * 0.3) {
        ball.vx += PUSH_BACK;
      }
      if (ball.x > window.innerWidth * 0.7) {
        ball.vx -= PUSH_BACK;
      }
      if (ball.y < window.innerWidth * 0.3) {
        ball.vy += PUSH_BACK;
      }
      if (ball.y > window.innerHeight * 0.7) {
        ball.vy -= PUSH_BACK;
      }

      // Randomly alter the ball's trajectory
      if (Math.random() < 0.1) {
        ball.vx += Math.random() * RANDOM_MOVEMENT - RANDOM_MOVEMENT/2;
        ball.vy += Math.random() * RANDOM_MOVEMENT - RANDOM_MOVEMENT/2;
      }
    }

    balls = balls
    tPrevious = t
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

<button on:click={pulseDeterent}>Add deterent</button>

<svelte:head>
  <style>
    html, body {
      background-color: white;
    }
  </style>
</svelte:head>

<style>
  button {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .outer-container {
    filter: contrast(3) blur(15px);
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