<script lang="ts">
  import Button from './metallic/button.svelte'
  import BPMWheel from './BPMWheel.svelte'
  import VolumeSlider from './metallic/VolumeSlider.svelte'
  import { useBPMDetector } from './use-bpm-detector.svelte'
  import { useMetronome } from './use-metronome.svelte'

  const { bpm, isDetecting, tapCount, tap, reset } = useBPMDetector()
  const { isPlaying, volume, setVolume, toggle } = useMetronome(bpm)

  // Ensure metronome starts automatically
  $effect(() => {
    if (!isPlaying) {
      toggle();
    }
  });
</script>

<div class="min-h-screen bg-[#d9d9d9] p-4 grid grid-cols-3 gap-4 max-w-md mx-auto">
  <div class="col-span-3 flex justify-between items-center">
    <div class="bg-white px-6 py-3 rounded-full shadow-lg">
      <span class="text-black text-2xl font-bold">BPM Tool</span>
    </div>
    <Button
      onclick={reset}
      class="bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0"
    >
      <div class="flex flex-col space-y-1">
        <div class="w-6 h-0.5 bg-black"></div>
        <div class="w-6 h-0.5 bg-black"></div>
        <div class="w-6 h-0.5 bg-black"></div>
      </div>
    </Button>
  </div>

  <div class="col-span-3 flex justify-center">
    <BPMWheel {bpm} {isDetecting} />
  </div>

  {#if isDetecting}
    <div class="col-span-3 text-center">
      <span class="text-black text-sm">Detecting... ({tapCount} taps)</span>
    </div>
  {/if}

  <div class="col-span-1 flex justify-center items-center">
    <VolumeSlider {volume} onChange={setVolume} />
  </div>

  <div class="col-span-2 flex justify-center items-center">
    <Button
      onclick={tap}
      class="bg-white w-full py-6 rounded-3xl shadow-lg hover:scale-105 active:scale-95 transition-transform"
    >
      <span class="text-black text-4xl font-bold">Tap</span>
    </Button>
  </div>
</div>