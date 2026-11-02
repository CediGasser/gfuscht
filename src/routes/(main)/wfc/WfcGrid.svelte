<script lang="ts">
  import type { Cell, Position, Tile, WfcStep } from './wfc'

  interface Props {
    cells: readonly Cell[]
    width: number
    height: number
    tiles: Tile[]
    imageBase: string
    stack: Position[]
    step: WfcStep | null
    selected: Position | null
    onselect: (pos: Position) => void
  }
  const { cells, width, height, tiles, imageBase, stack, step, selected, onselect }: Props = $props()

  const index = ({ x, y }: Position) => y * width + x

  const stackIndices = $derived(new Set(stack.map(index)))
  const stepIndex = $derived(step && 'pos' in step ? index(step.pos) : -1)
  const selectedIndex = $derived(selected ? index(selected) : -1)
</script>

<div class="grid" style:--columns={width} style:--rows={height}>
  {#each cells as options, i (i)}
    {@const pos = { x: i % width, y: Math.floor(i / width) }}
    <button
      class="cell"
      class:propagating={stackIndices.has(i)}
      class:current={stepIndex === i}
      class:selected={selectedIndex === i}
      class:contradiction={options.length === 0}
      aria-label="Cell {pos.x}, {pos.y}: {options.length} options"
      onclick={() => onselect(pos)}
    >
      {#if options.length === 1}
        {@const tile = tiles[options[0]]}
        <img
          style:--rotation="{tile.rotation}deg"
          src="{imageBase}{tile.name}"
          alt={tile.name}
          draggable="false"
        />
      {:else if options.length === 0}
        <span>✕</span>
      {:else}
        <span>{options.length}</span>
      {/if}
    </button>
  {/each}
</div>

<style>
  .grid {
    /* Whole pixels only, fractional cell sizes leave thin gaps between tiles */
    --cell: round(
      down,
      min(64px, calc((100vw - 2rem) / var(--columns)), calc((100dvh - 2rem) / var(--rows))),
      1px
    );
    display: grid;
    grid-template-columns: repeat(var(--columns), var(--cell));
    grid-auto-rows: var(--cell);
  }
  .cell {
    position: relative;
    display: grid;
    place-items: center;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font-size: calc(var(--cell) * 0.35);
    cursor: pointer;
    touch-action: manipulation;
  }
  .cell:hover {
    background: var(--theme-highlight-low);
  }
  .cell > img {
    width: 100%;
    height: 100%;
    transform: rotate(var(--rotation));
    image-rendering: pixelated;
  }
  .cell::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .propagating::after {
    box-shadow: inset 0 0 0 2px red;
  }
  .current::after {
    box-shadow: inset 0 0 0 3px var(--theme-quaternary);
  }
  .selected::after {
    outline: 3px dashed var(--theme-text);
    outline-offset: -3px;
  }
  .contradiction {
    background: #d7263d;
    color: white;
    font-weight: bold;
  }
</style>
