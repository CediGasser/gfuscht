<script lang="ts">
  import type { CellInspection, Tile } from './wfc'

  interface Props {
    inspection: CellInspection
    tiles: Tile[]
    imageBase: string
    onclose: () => void
  }
  const { inspection, tiles, imageBase, onclose }: Props = $props()

  let showAll = $state(false)

  const options = $derived(new Set(inspection.options))
  const verdicts = $derived(
    showAll ? inspection.verdicts : inspection.verdicts.filter((v) => options.has(v.tile))
  )
</script>

<dialog open aria-label="Cell inspector">
  <header>
    <h2>
      Cell ({inspection.pos.x}, {inspection.pos.y})
      <small>{inspection.options.length} of {tiles.length} options</small>
    </h2>
    <button class="close" onclick={onclose} aria-label="Close">✕</button>
  </header>

  {#if inspection.options.length === 0}
    <p class="contradiction">Contradiction: no tile fits all neighbours.</p>
  {/if}

  <h3>Allowed sockets per side</h3>
  <dl class="sides">
    {#each inspection.sides as { side, allowed } (side)}
      <dt>{side}</dt>
      <dd>
        {#if allowed === null}
          <em>edge</em>
        {:else if allowed.length === 0}
          <em class="none">none (neighbour has no options)</em>
        {:else}
          {#each allowed as socket (socket)}<code>{socket}</code>{/each}
        {/if}
      </dd>
    {/each}
  </dl>

  <div class="tabs">
    <button class:active={!showAll} onclick={() => (showAll = false)}>
      Remaining ({inspection.options.length})
    </button>
    <button class:active={showAll} onclick={() => (showAll = true)}>
      All tiles ({tiles.length})
    </button>
  </div>
  {#if showAll}
    <p class="legend">
      Red edges: blocked by that neighbour. Faded: no longer an option.
    </p>
  {/if}

  <ul class="tiles">
    {#each verdicts as { tile: index, blockedBy } (index)}
      {@const tile = tiles[index]}
      <li class:removed={!options.has(index)}>
        <div
          class="thumb"
          class:block-top={blockedBy.includes('top')}
          class:block-right={blockedBy.includes('right')}
          class:block-bottom={blockedBy.includes('bottom')}
          class:block-left={blockedBy.includes('left')}
        >
          <img
            style:--rotation="{tile.rotation}deg"
            src="{imageBase}{tile.name}"
            alt={tile.name}
          />
        </div>
        <span class="name">{tile.name.replace(/\.png$/, '')} {tile.rotation}°</span>
        <span class="sockets" title="top right bottom left">{tile.sockets.join(' ')}</span>
      </li>
    {:else}
      <li class="empty">No tiles left.</li>
    {/each}
  </ul>
</dialog>

<style>
  dialog {
    position: fixed;
    z-index: 10;
    inset: auto 1rem 1rem auto;
    margin: 0;
    border: 0;
    width: min(26rem, calc(100vw - 2rem));
    max-height: calc(100dvh - 2rem);
    overflow-y: auto;
    padding: 1rem;
    background: var(--theme-overlay);
    color: var(--theme-text);
    box-shadow: 0 4px 24px var(--theme-shadow);
    border-radius: 0.5rem;
  }
  @media (max-width: 640px) {
    dialog {
      inset: auto 0 0 0;
      width: 100vw;
      max-height: 55dvh;
      border-radius: 0.75rem 0.75rem 0 0;
    }
  }
  @media (min-width: 1024px) {
    dialog {
      position: static;
      width: 100%;
      max-height: none;
    }
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
  h2 {
    font-size: 1.1rem;
    font-weight: 600;
  }
  h2 small {
    display: block;
    font-size: 0.8rem;
    font-weight: normal;
    color: var(--theme-subtle);
  }
  h3 {
    margin-top: 0.75rem;
    font-size: 0.85rem;
    font-weight: 600;
  }
  .close {
    padding: 0.25rem 0.5rem;
  }
  .contradiction {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #d7263d;
    color: white;
    border-radius: 0.25rem;
  }
  .sides {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.25rem 0.75rem;
    margin-top: 0.25rem;
    font-size: 0.85rem;
  }
  .sides dt {
    color: var(--theme-subtle);
  }
  .sides code {
    margin-right: 0.25rem;
    padding: 0 0.25rem;
    background: var(--theme-base);
    border-radius: 0.2rem;
  }
  .none {
    color: #d7263d;
  }
  .tabs {
    display: flex;
    gap: 0.25rem;
    margin-top: 0.75rem;
  }
  .tabs button {
    padding: 0.25rem 0.5rem;
    font-size: 0.85rem;
    border-bottom: 2px solid transparent;
  }
  .tabs .active {
    border-bottom-color: var(--theme-primary);
  }
  .legend {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: var(--theme-subtle);
  }
  .tiles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
    gap: 0.5rem;
    margin-top: 0.5rem;
    list-style: none;
    padding: 0;
  }
  .tiles li {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.7rem;
    text-align: center;
  }
  .tiles .removed {
    opacity: 0.4;
  }
  .tiles .empty {
    grid-column: 1 / -1;
    color: var(--theme-subtle);
  }
  .thumb {
    width: 48px;
    height: 48px;
    border: 3px solid transparent;
  }
  .thumb img {
    width: 100%;
    height: 100%;
    transform: rotate(var(--rotation));
    image-rendering: pixelated;
  }
  .block-top {
    border-top-color: #d7263d;
  }
  .block-right {
    border-right-color: #d7263d;
  }
  .block-bottom {
    border-bottom-color: #d7263d;
  }
  .block-left {
    border-left-color: #d7263d;
  }
  .name {
    word-break: break-all;
  }
  .sockets {
    font-family: var(--theme-font-mono);
    color: var(--theme-subtle);
  }
</style>
