<script lang="ts">
  import Seo from "$lib/components/Seo.svelte";

  const randomNotNull = (array: any[]) => {
    array = array.filter((v) => v !== null);

    if (array.length === 0) return null;

    return array[Math.floor(Math.random() * array.length)];
  };

  type Cell = {
    x: number;
    y: number;
  };

  const EMPTY = 0;
  const TIME_DIVISOR = 40000;
  const BRUSH_SIZE = 4;
  const DRAW_INTERVAL = 20;

  let screenHeight: number = $state(0);
  let screenWidth: number = $state(0);

  const cellSize = 5;
  let gridHeight = $derived(Math.ceil(screenHeight / cellSize));
  let gridWidth = $derived(Math.ceil(screenWidth / cellSize));

  let cellsToUpdate: Cell[] = [];
  let cellsToRerender: Cell[] = [];

  let updateCount = 0;
  let renderCount = 0;

  let grid = $derived(
    Array.from(
      {
        length: gridHeight,
      },
      () =>
        Array.from(
          {
            length: gridWidth,
          },
          () => 0,
        ),
    ) as (number | string)[][],
  );

  const isValidCell = (x: number, y: number): boolean => {
    return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;
  };

  const update = (t: number) => {
    t = (t % TIME_DIVISOR) / TIME_DIVISOR;

    cellsToUpdate.sort((a, b) => b.y - a.y);

    let newCellsToUpdate = [];

    updateCount = cellsToUpdate.length;

    for (const { x, y } of cellsToUpdate) {
      if (!isValidCell(x, y)) continue;

      if (grid[y][x] === "new") grid[y][x] = t;

      if (grid[y][x] === EMPTY || y >= gridHeight - 1) continue;

      if (grid[y + 1][x] === EMPTY) {
        grid[y + 1][x] = grid[y][x];

        newCellsToUpdate.push({
          x,
          y: y + 1,
        });

        newCellsToUpdate.push({
          x,
          y: y - 1,
        });

        newCellsToUpdate.push({
          x: x - 1,
          y: y - 1,
        });

        newCellsToUpdate.push({
          x: x + 1,
          y: y - 1,
        });

        grid[y][x] = EMPTY;
      } else {
        const newX = randomNotNull([
          x + 1 <= gridWidth && grid[y + 1][x + 1] === EMPTY ? x + 1 : null,

          x - 1 >= 0 && grid[y + 1][x - 1] === EMPTY ? x - 1 : null,
        ]);

        if (newX !== null) {
          grid[y + 1][newX] = grid[y][x];

          newCellsToUpdate.push({
            x: newX,
            y: y + 1,
          });

          newCellsToUpdate.push({
            x,
            y: y - 1,
          });

          newCellsToUpdate.push({
            x: x - 1,
            y: y - 1,
          });

          newCellsToUpdate.push({
            x: x + 1,
            y: y - 1,
          });

          grid[y][x] = EMPTY;
        }
      }
    }

    cellsToRerender = [
      ...cellsToUpdate.map((c) => ({ x: c.x, y: c.y })),

      ...newCellsToUpdate.map((c) => ({ x: c.x, y: c.y })),
    ];

    cellsToUpdate = newCellsToUpdate;
  };

  const draw = (ctx: CanvasRenderingContext2D, t: number) => {
    // const data = ctx.createImageData(gridHeight, gridWidth);

    // const buffer = new Uint32Array(data.data.buffer);

    renderCount = cellsToRerender.length;

    for (const { x, y } of cellsToRerender) {
      // buffer[i++] = grid[y][x] === 0 ? 0xffffffff : 0xff000000;

      drawCell(ctx, x, y);
    }

    // ctx.putImageData(data, 0, 0);

    update(t);

    requestAnimationFrame((t) => draw(ctx, t));
  };

  const drawCell = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    if (!isValidCell(x, y)) return;

    const cellValue = grid[y][x] as number;

    if (cellValue > 0) {
      const colour = `hsl(${cellValue * 360},100%,50%)`;
      ctx.fillStyle = colour;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    } else {
      ctx.clearRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  };

  const paint = (mouseX: number, mouseY: number) => {
    const cellX = Math.floor(mouseX / cellSize);
    const cellY = Math.floor(mouseY / cellSize);

    const newCells = [];

    for (let tmpY = cellY - BRUSH_SIZE; tmpY <= cellY + BRUSH_SIZE; tmpY++) {
      for (let tmpX = cellX - BRUSH_SIZE; tmpX <= cellX + BRUSH_SIZE; tmpX++) {
        if (!isValidCell(tmpX, tmpY)) continue;
        if (grid[tmpY][tmpX] !== EMPTY) continue;

        newCells.push({
          x: tmpX,
          y: tmpY,
        });
      }
    }

    for (const { x, y } of newCells.filter(() => Math.random() > 0.96)) {
      grid[y][x] = "new";

      cellsToUpdate.push({
        x,
        y,
      });
    }
  };

  function simAction(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = screenWidth;

    canvas.height = screenHeight;

    requestAnimationFrame((t) => draw(ctx, t));
  }

  let intervalId: number | null = null;
  let mousePosition: { x: number; y: number } = { x: 0, y: 0 };

  const onMousemove = (e: MouseEvent) => {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
  };

  const onTouchmove = (e: TouchEvent) => {
    mousePosition.x = e.touches[0].clientX;
    mousePosition.y = e.touches[0].clientY;
  };

  const startDrawing = (e: TouchEvent | MouseEvent) => {
    if (e instanceof MouseEvent) {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
    } else {
      mousePosition.x = e.touches[0].clientX;
      mousePosition.y = e.touches[0].clientY;
    }

    if (!intervalId) {
      intervalId = setInterval(() => {
        paint(mousePosition.x, mousePosition.y);
      }, DRAW_INTERVAL) as unknown as number;
    }
  };

  const stopDrawing = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
</script>

<Seo
  title="Sand"
  description="A simple sand simulation."
  keywords="sand, simulation"
/>

<svelte:head>
  <style>
    html {
      overflow: hidden;
    }
  </style>
</svelte:head>

<svelte:window
  bind:innerWidth={screenWidth}
  bind:innerHeight={screenHeight}
  onmousemove={onMousemove}
  onmousedown={startDrawing}
  onmouseup={stopDrawing}
  onmouseleave={stopDrawing}
  ontouchmove={onTouchmove}
  ontouchstart={startDrawing}
  ontouchend={stopDrawing}
  ontouchcancel={stopDrawing}
/>

<canvas width={screenWidth} height={screenHeight} use:simAction></canvas>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
</style>
