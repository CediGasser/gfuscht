<script lang="ts">
  import { GENRES, getPrimaryGenre } from './genre-matcher.svelte'
  let { bpm, isDetecting }: { bpm: number; isDetecting: boolean } = $props()

  let primaryGenre = $derived.by(() => getPrimaryGenre(bpm))
</script>

<div class="flex flex-col items-center justify-center gap-6">
  <div
    class={`bg-white rounded-3xl shadow-lg p-8 transition-all duration-300 ${
      isDetecting ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
    }`}
  >
    <div class="text-center">
      <span class="text-black text-8xl font-bold">{bpm}</span>
      <span class="text-black text-2xl ml-2">bpm</span>
    </div>
  </div>

  <div class="flex items-center space-x-4">
    <div class="flex flex-col space-y-2">
      {#each Array.from({ length: 12 }) as _, i}
        <div class="w-8 h-0.5 bg-black"></div>
      {/each}
    </div>
    <div class="w-0.5 h-32 bg-black"></div>
    <div class="flex flex-col justify-between h-32">
      {#each GENRES.slice(1, 5) as genre}
        {@const isActive = primaryGenre?.name === genre.name}
        <span
          class={`text-sm font-medium -rotate-90 origin-center whitespace-nowrap transition-all duration-300 ${
            isActive ? 'text-blue-600 font-bold scale-110' : 'text-black'
          }`}
        >
          {genre.name}
        </span>
      {/each}
    </div>
    <div class="w-0.5 h-32 bg-black"></div>
  </div>
</div>
