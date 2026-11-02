<script lang="ts">
  import { onMount } from 'svelte'
  import { page } from '$app/state'
  import { replaceState } from '$app/navigation'
  import Seo from '$lib/components/Seo.svelte'
  import WfcGrid from './WfcGrid.svelte'
  import CellInspector from './CellInspector.svelte'
  import WfcPlayer from './WfcPlayer.svelte'
  import { tilesets, getTileset } from './tilesets'
  import { randomSeed, type Direction, type Position, type WfcStep } from './wfc'

  const DEFAULT_SIZE = 10
  const MIN_SIZE = 2
  const MAX_SIZE = 100

  const clampSize = (value: number) =>
    Number.isInteger(value) ? Math.min(MAX_SIZE, Math.max(MIN_SIZE, value)) : DEFAULT_SIZE

  const seedParam = Number(page.url.searchParams.get('seed'))
  const sizeParam = page.url.searchParams.get('size')
  const initialSize = sizeParam ? clampSize(Number(sizeParam)) : DEFAULT_SIZE

  const initialTileset = getTileset(page.url.searchParams.get('tileset'))

  let tileset = $state(initialTileset)
  const player = new WfcPlayer(
    initialTileset.tiles,
    initialSize,
    initialSize,
    Number.isSafeInteger(seedParam) && seedParam > 0 ? seedParam : randomSeed()
  )
  let seedInput = $state(player.seed)
  let sizeInput = $state(initialSize)
  let selected: Position | null = $state(null)

  const inspection = $derived(selected && player.inspect(selected))

  // Slider position 0..100 maps logarithmically to 1..10'000 steps per second
  const toSlider = (speed: number) => Math.log10(speed) * 25
  const fromSlider = (value: number) => Math.round(10 ** (value / 25))

  const restart = (seed: number, size = player.width) => {
    if (size !== player.width) selected = null
    player.reset(tileset.tiles, seed, size, size)
    seedInput = seed
    sizeInput = size
    const url = new URL(page.url)
    url.searchParams.set('tileset', tileset.id)
    url.searchParams.set('seed', String(seed))
    url.searchParams.set('size', String(size))
    replaceState(url, page.state)
    player.play()
  }

  const shift = (direction: Direction) => player.shift(direction)

  const describe = (step: WfcStep | null) => {
    if (!step) return 'start'
    if (step.type === 'shift') return `shift ${step.direction}`
    const at = `(${step.pos.x}, ${step.pos.y})`
    if (step.type === 'collapse') {
      const tile = player.tiles[step.tile]
      return `collapse ${at} → ${tile.name.replace(/\.png$/, '')} ${tile.rotation}°`
    }
    if (step.type === 'contradiction') return `contradiction at ${at}`
    return step.removed.length > 0 ? `reduce ${at}: −${step.removed.length}` : `check ${at}`
  }

  // Open the inspector on the cell that just broke
  $effect(() => {
    const step = player.current.step
    if (step?.type === 'contradiction') selected = step.pos
  })

  onMount(() => {
    player.play()
    return () => player.pause()
  })

  const shortcuts: Record<string, () => void> = {
    w: () => shift('up'),
    a: () => shift('left'),
    s: () => shift('down'),
    d: () => shift('right'),
    ArrowUp: () => shift('up'),
    ArrowLeft: () => shift('left'),
    ArrowDown: () => shift('down'),
    ArrowRight: () => shift('right'),
    ' ': () => player.toggle(),
    ',': () => player.stepBack(),
    '.': () => player.stepForward(),
    Escape: () => (selected = null),
  }

  const onkeydown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement
    if (target.matches('input, select, textarea') || e.metaKey || e.ctrlKey || e.altKey) return
    const action = shortcuts[e.key]
    if (!action) return
    e.preventDefault()
    action()
  }
</script>

<Seo
  title="Wave Function Collapse"
  description="A Wave Function Collapse implementation in Svelte that allows for continuous generation."
  keywords="wave function collapse, wfc, svelte, continuous generation, procedural generation, tileset, animation"
/>

<svelte:window {onkeydown} />

<main>
  <WfcGrid
    cells={player.current.cells}
    width={player.width}
    height={player.height}
    tiles={player.tiles}
    imageBase={tileset.imageBase}
    stack={player.current.stack}
    step={player.current.step}
    {selected}
    onselect={(pos) => (selected = pos)}
  />

  <div class="panel">
    <div class="dpad" aria-label="Walk around">
      <button class="up" onclick={() => shift('up')} aria-label="Walk up" title="Walk up (W)">▲</button>
      <button class="left" onclick={() => shift('left')} aria-label="Walk left" title="Walk left (A)">◀</button>
      <button class="right" onclick={() => shift('right')} aria-label="Walk right" title="Walk right (D)">▶</button>
      <button class="down" onclick={() => shift('down')} aria-label="Walk down" title="Walk down (S)">▼</button>
    </div>

    <section class="controls">
      <div class="row">
        <button onclick={() => player.toStart()} aria-label="Jump to start" title="Jump to start">⏮</button>
        <button
          onclick={() => player.stepBack()}
          disabled={player.cursor === 0}
          aria-label="Step back"
          title="Step back (,)">⏴</button
        >
        <button
          class="play"
          onclick={() => player.toggle()}
          aria-label={player.playing ? 'Pause' : 'Play'}
          title="Play / pause (Space)">{player.playing ? '⏸' : '▶'}</button
        >
        <button
          onclick={() => player.stepForward()}
          disabled={player.atHead && player.result !== null}
          aria-label="Step forward"
          title="Step forward (.)">⏵</button
        >
        <button onclick={() => player.toEnd()} aria-label="Jump to end" title="Jump to latest step / run to the end">⏭</button>
      </div>

      <label class="row">
        <span class="label">History</span>
        <input
          type="range"
          min="0"
          max={player.historyLength - 1}
          bind:value={() => player.cursor, (v) => player.seek(v)}
          oninput={() => player.pause()}
        />
        <span class="value">{player.cursor + player.trimmed} / {player.historyLength - 1 + player.trimmed}</span>
      </label>

      <label class="row">
        <span class="label">Speed</span>
        <input
          type="range"
          min="0"
          max="100"
          step="any"
          bind:value={() => toSlider(player.speed), (v) => (player.speed = fromSlider(v))}
        />
        <span class="value">{player.speed}/s</span>
      </label>

      <div class="row status" class:contradiction={player.status === 'contradiction'}>
        {#if player.status === 'contradiction' && player.current.step?.type === 'contradiction'}
          {@const pos = player.current.step.pos}
          <button onclick={() => (selected = pos)}>Contradiction at ({pos.x}, {pos.y}), inspect</button>
        {:else if player.status === 'done'}
          Done
        {:else if !player.atHead}
          Replaying history: {describe(player.current.step)}
        {:else}
          {player.playing ? 'Running' : 'Paused'}: {describe(player.current.step)}
        {/if}
      </div>

      <div class="row">
        <label>
          <span class="label">Tileset</span>
          <select bind:value={() => tileset.id, (id) => { tileset = getTileset(id); restart(player.seed) }}>
            {#each tilesets as t (t.id)}
              <option value={t.id}>{t.label}</option>
            {/each}
          </select>
        </label>
      </div>

      <div class="row">
        <label>
          <span class="label">Grid size</span>
          <input
            class="size"
            type="number"
            min={MIN_SIZE}
            max={MAX_SIZE}
            bind:value={sizeInput}
            onchange={() => restart(player.seed, clampSize(sizeInput))}
          />
          <span class="value">{player.width} × {player.height}</span>
        </label>
      </div>

      <div class="row">
        <label>
          <span class="label">Seed</span>
          <input
            class="seed"
            type="number"
            min="1"
            bind:value={seedInput}
            onkeydown={(e) => e.key === 'Enter' && restart(seedInput)}
          />
        </label>
        <button onclick={() => restart(randomSeed())} aria-label="Random seed" title="Random seed">🎲</button>
        <button onclick={() => restart(seedInput)}>Reset</button>
      </div>
    </section>

    {#if inspection}
      <CellInspector
        {inspection}
        tiles={player.tiles}
        imageBase={tileset.imageBase}
        onclose={() => (selected = null)}
      />
    {/if}
  </div>

</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    min-height: 100dvh;
    padding: 1rem;
  }
  .panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: min(32rem, 100%);
  }
  @media (min-width: 1024px) {
    main {
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      gap: 2rem;
    }
  }

  button,
  select,
  input[type='number'] {
    padding: 0.35rem 0.6rem;
    background: var(--theme-overlay);
    color: var(--theme-text);
    border: 1px solid var(--theme-highlight-high);
    border-radius: 0.25rem;
    touch-action: manipulation;
  }
  button:disabled {
    opacity: 0.4;
  }

  .dpad {
    display: grid;
    grid-template-areas:
      '. up .'
      'left . right'
      '. down .';
    gap: 0.25rem;
  }
  .dpad button {
    width: 2.75rem;
    height: 2.75rem;
  }
  .dpad .up {
    grid-area: up;
  }
  .dpad .left {
    grid-area: left;
  }
  .dpad .right {
    grid-area: right;
  }
  .dpad .down {
    grid-area: down;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .row label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .row input[type='range'] {
    flex: 1;
    min-width: 8rem;
  }
  .row > button {
    min-width: 2.75rem;
    min-height: 2.75rem;
  }
  .play {
    font-size: 1.25rem;
  }
  .label {
    min-width: 4rem;
    color: var(--theme-subtle);
  }
  .value {
    min-width: 6rem;
    text-align: right;
    font-family: var(--theme-font-mono);
    font-size: 0.85rem;
  }
  .seed {
    width: 9rem;
  }
  .size {
    width: 5rem;
  }
  .status {
    min-height: 2.75rem;
    font-family: var(--theme-font-mono);
    font-size: 0.85rem;
    text-align: center;
  }
  .status.contradiction button {
    background: #d7263d;
    color: white;
    border-color: #d7263d;
  }
</style>
