<script lang="ts">
    import { onMount } from 'svelte';
  
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
  
    interface Ball {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
    }
  
    let balls: Ball[] = [
    { x: 100, y: 100, r: 50, dx: 5, dy: -5 },
    { x: 200, y: 200, r: 75, dx: -5, dy: 5 },
    { x: 300, y: 100, r: 25, dx: 5, dy: -5 }
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
            value += ball.r / distance;
          }
  
          let color = valueToColor(value);
  
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  
    function update() {
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];

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
      // Normalize the value to a range between 0 and 1
      const normalizedValue = Math.max(0, Math.min(1, value / 5));

      // Calculate the hue based on the normalized value
      const hue = (1 - normalizedValue) * 240;

      // Convert the hue to a CSS color string
      return `hsl(${hue}, 100%, 50%)`;
    }
  </script>
  
  <canvas id="canvas" width="400" height="400"></canvas>
  