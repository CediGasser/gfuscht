<script lang="ts">
    import { onMount } from 'svelte';
  
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let MAX_VELOCITY = 10;
    let FORCE_COEFICIENT = 5;
  
    interface Ball {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      charge: number;
    }

    const randX = (): number => {
      const x = Math.random() * 400;
      return x;
    }

    const randY = (): number => {
      const y = Math.random() * 400;
      return y;
    }
  
    let balls: Ball[] = [
    { x: randX(), y: randY(), r: 30, dx: 5, dy: -5, charge: -1},
    { x: randX(), y: randY(), r: 50, dx: -5, dy: 5, charge: 1},
    { x: randX(), y: randY(), r: 10, dx: 5, dy: -5, charge: 1},
    { x: randX(), y: randY(), r: 20, dx: -5, dy: 5, charge: -1},
    { x: randX(), y: randY(), r: 40, dx: 5, dy: -5, charge: 1},
    { x: randX(), y: randY(), r: 50, dx: -5, dy: 5, charge: -1},
    { x: randX(), y: randY(), r: 20, dx: 5, dy: -5, charge: 1},
    { x: randX(), y: randY(), r: 10, dx: -5, dy: 5, charge: -1},
    { x: randX(), y: randY(), r: 50, dx: 5, dy: -5, charge: 1},
    { x: randX(), y: randY(), r: 30, dx: -5, dy: 5, charge: -1},
    { x: randX(), y: randY(), r: 10, dx: 5, dy: -5, charge: 1},
    { x: randX(), y: randY(), r: 50, dx: -5, dy: 5, charge: -1},
    { x: randX(), y: randY(), r: 40, dx: 5, dy: -5, charge: 1},
    { x: randX(), y: randY(), r: 30, dx: -5, dy: 5, charge: -1},
    { x: randX(), y: randY(), r: 20, dx: 5, dy: -5, charge: 1},
    { x: randX(), y: randY(), r: 10, dx: -5, dy: 5, charge: -1},
    { x: randX(), y: randY(), r: 10, dx: 5, dy: -5, charge: 1},
    { x: randX(), y: randY(), r: 30, dx: -5, dy: 5, charge: -1},
    { x: randX(), y: randY(), r: 10, dx: 5, dy: -5, charge: 1}
  ];

  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          let value = 0;
          for (let i = 0; i < balls.length; i++) {
            const ball = balls[i];
            const dx = x - ball.x;
            const dy = y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            value += ball.r / distance * ball.charge;
          }
  
          let color = valueToColor(value);
  
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  
    function update() {
  // Calculate the forces of attraction or repulsion between each pair of balls
  for (let i = 0; i < balls.length; i++) {
    const ball1 = balls[i];
    for (let j = i + 1; j < balls.length; j++) {
      const ball2 = balls[j];

      // Calculate the distance between the balls
      const dx = ball1.x - ball2.x;
      const dy = ball1.y - ball2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate the force of attraction or repulsion
      const force = ball1.charge * FORCE_COEFICIENT * ball2.charge / distance;

      // Update the velocities of the balls based on the force
      ball1.dx -= force * dx / distance;
      ball1.dy -= force * dy / distance;
      ball2.dx += force * dx / distance;
      ball2.dy += force * dy / distance;
    }
  }

  // Update the position of each ball based on its velocity
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];

    // Limit the velocities of the balls to a maximum value
    ball.dx = Math.min(Math.max(ball.dx, -MAX_VELOCITY), MAX_VELOCITY);
    ball.dy = Math.min(Math.max(ball.dy, -MAX_VELOCITY), MAX_VELOCITY);

    // Update the ball's position
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Check if the ball has reached the edge of the canvas
    if (ball.x - ball.r < 0 || ball.x + ball.r > canvas.width) {
      ball.dx *= -1;
    }
    if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) {
      ball.dy *= -1;
    }

    // Randomly alter the ball's trajectory
    if (Math.random() < 0.1) {
      ball.dx += Math.random() * 10 - 5;
      ball.dy += Math.random() * 10 - 5;
    }
  }
}

    
  
  onMount(() => {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    let frame: number;
        function animate() {
            update();
            draw();
            frame = requestAnimationFrame(animate);
        }

        animate()

        return () => cancelAnimationFrame(frame);
  });

  function valueToColor(value: number): string {
    // Normalize the value to a range between -1 and 1
    const normalizedValue = Math.min(Math.max(value, -1), 1) / 2 + 0.5;

    // Calculate the light based on the normalized value
    const light = 50 + normalizedValue * 50;

    // Convert the hue to a CSS color string
    return `hsl(0, 0%, ${light}%)`;
  }
</script>
  
<canvas id="canvas" width="400" height="400"></canvas>