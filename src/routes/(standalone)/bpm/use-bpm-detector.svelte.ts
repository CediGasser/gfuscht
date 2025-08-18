export function useBPMDetector() {
  let bpm = $state(120)
  let isDetecting = $state(false)
  let tapCount = $state(0)

  let tapTimes: number[] = []
  let timeoutId: any

  function calculateBPM(times: number[]): number {
    if (times.length < 2) return 120
    const intervals = []
    for (let i = 1; i < times.length; i++) {
      intervals.push(times[i] - times[i - 1])
    }
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
    return Math.max(60, Math.min(200, Math.round(60000 / avgInterval)))
  }

  function tap() {
    const now = Date.now()
    clearTimeout(timeoutId)

    tapTimes.push(now)
    const fiveSecondsAgo = now - 5000
    tapTimes = tapTimes.filter((t) => t > fiveSecondsAgo).slice(-8)

    bpm = calculateBPM(tapTimes)
    isDetecting = true
    tapCount = tapTimes.length

    timeoutId = setTimeout(() => {
      isDetecting = false
    }, 3000)
  }

  function reset() {
    tapTimes = []
    clearTimeout(timeoutId)
    bpm = 120
    isDetecting = false
    tapCount = 0
  }

  return { bpm, isDetecting, tapCount, tap, reset }
}
