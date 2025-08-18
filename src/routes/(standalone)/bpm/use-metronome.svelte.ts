export function useMetronome(bpm: number) {
  let isPlaying = $state(false)
  let volume = $state(0.5)
  let intervalId: any
  let audioContext: AudioContext | null = null

  $effect(() => {
    if (typeof window !== 'undefined') {
      audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)()
    }
    return () => audioContext?.close()
  })

  function playClick() {
    if (!audioContext) return
    const osc = audioContext.createOscillator()
    const gain = audioContext.createGain()
    osc.connect(gain)
    gain.connect(audioContext.destination)
    osc.frequency.setValueAtTime(800, audioContext.currentTime)
    osc.type = 'square'
    gain.gain.setValueAtTime(volume * 0.1, audioContext.currentTime)
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.1
    )
    osc.start(audioContext.currentTime)
    osc.stop(audioContext.currentTime + 0.1)
  }

  function start() {
    if (intervalId) return
    isPlaying = true
    playClick()
    intervalId = setInterval(playClick, 60000 / bpm)
  }

  function stop() {
    clearInterval(intervalId)
    intervalId = undefined
    isPlaying = false
  }

  function toggle() {
    isPlaying ? stop() : start()
  }

  $effect(() => {
    if (isPlaying) {
      stop()
      start()
    }
  })

  return {
    isPlaying,
    volume,
    setVolume: (v: number) => (volume = v),
    start,
    stop,
    toggle,
  }
}
