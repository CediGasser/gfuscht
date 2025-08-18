<script lang="ts">
  import Button from './metallic/button.svelte'
  import BPMWheel from './BPMWheel.svelte'
  import VolumeSlider from './VolumeSlider.svelte'
  import { useBPMDetector } from './use-bpm-detector.svelte'
  import { useMetronome } from './use-metronome.svelte'

  const { bpm, isDetecting, tapCount, tap, reset } = useBPMDetector()
  const { isPlaying, volume, setVolume, toggle } = useMetronome(bpm)
</script>

<div class="min-h-screen bg-[#d9d9d9] p-4 flex flex-col">
  <div class="flex justify-between items-center mb-8">
    <div class="bg-white px-6 py-3 rounded-full shadow-lg">
      <span class="text-black text-2xl font-bold">BPM Tool</span>
    </div>
    <Button
      onclick={reset}
      class="bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
    >
      <div class="flex flex-col space-y-1">
        <div class="w-6 h-0.5 bg-black"></div>
        <div class="w-6 h-0.5 bg-black"></div>
        <div class="w-6 h-0.5 bg-black"></div>
      </div>
    </Button>
  </div>

  <div class="mb-12">
    <BPMWheel {bpm} {isDetecting} />
  </div>

  {#if isDetecting}
    <div class="text-center mb-4">
      <span class="text-black text-sm">Detecting... ({tapCount} taps)</span>
    </div>
  {/if}

  <div class="mb-12">
    <VolumeSlider {volume} onChange={setVolume} />
  </div>

  <div class="flex flex-col items-center space-y-4">
    <Button
      onclick={tap}
      class="bg-white px-16 py-6 rounded-3xl shadow-lg hover:scale-105 active:scale-95 transition-transform"
    >
      <span class="text-black text-4xl font-bold">Tap</span>
    </Button>

    <Button
      onclick={toggle}
      class={`px-8 py-3 rounded-2xl shadow-lg transition-all ${
        isPlaying
          ? 'bg-red-500 text-white'
          : 'bg-white text-black hover:scale-105'
      }`}
    >
      <span class="text-xl font-semibold">
        {isPlaying ? 'Stop Metronome' : 'Start Metronome'}
      </span>
    </Button>
  </div>
</div>
