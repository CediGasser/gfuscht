<script lang="ts">
  let { volume, onChange }: { volume: number; onChange: (v: number) => void } =
    $props()
  let sliderPosition = $derived(volume * 100)
  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement
    onChange(parseFloat(target.value))
  }
</script>

<div class="flex justify-center">
  <div class="relative">
    <div class="w-2 h-48 bg-[#b6b6b6] rounded-full relative">
      <div
        class="absolute bottom-0 w-full bg-blue-500 rounded-full transition-all duration-200"
        style={`height: ${sliderPosition}%`}
      ></div>
    </div>
    <div
      class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
      style={`top: ${100 - sliderPosition}%`}
    >
      <div
        class="bg-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
      >
        <span class="text-black text-sm font-medium">Volume</span>
      </div>
    </div>
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      oninput={handleChange}
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      style="writing-mode: bt-lr; -webkit-appearance: slider-vertical;"
    />
  </div>
</div>
