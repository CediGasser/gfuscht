type Options = {
  delay: number
  duration: number
  easing: (t: number) => number
}


export const tweened = (initial: number, options: Options) => {
  let targetValue: number = $state(initial)
  let tweenedValue: number = $state(initial)
  let timeout: any | null = $state(null)

  const startTween = () => {
    const start = performance.now()
    const update = () => {
      const now = performance.now()
      const t = Math.min(1, (now - start) / options.duration)
      tweenedValue = targetValue * options.easing(t)

      if (t < 1) {
        timeout = requestAnimationFrame(update)
      } else {
        timeout = null
      }
    }
    update()
  }

  $effect(() => {
    // clear timeout if it exists
    if (timeout !== null) {
      clearTimeout(timeout)
    }

    // set new timeout
    timeout = setTimeout(() => {
      startTween()
    }, options.delay)
  })

  return {
    set value(value: number) {
      targetValue = value
    },
    get value() {
      return tweenedValue
    }
  }
}
