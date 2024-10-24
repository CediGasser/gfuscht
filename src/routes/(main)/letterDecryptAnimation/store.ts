import { tweened } from 'svelte/motion'
import { writable } from 'svelte/store'
import { expoInOut } from 'svelte/easing'

const CODEY_CHARS = [
  '*',
  '[',
  ']',
  '-',
  '%',
  'x',
  '/',
  '{',
  '}',
  ':',
  '$',
  ',',
  ':',
  ';',
  '.',
]

function randomElement(array: any[]) {
  return array[Math.floor(Math.random() * array.length)]
}

type Options = {
  delay?: number
  duration?: number
  easing?: any
}

function letterDecryptAnimation(value?: string, options?: Options) {
  const { set, subscribe, update } = writable(value ?? ' ')

    const delay = options?.delay || 0
    const duration = options?.duration || 1000
    const easing = options?.easing || expoInOut

    let cryptTweened 
    let realTweened 
  return {
    set: (targetText: string) => {
      const targetLength = targetText.length
      const newTextArray = Array(targetLength).fill(' ')
      cryptTweened = tweened(0, {
        delay: delay,
        duration: duration * 0.5,
        easing: easing,
      })
      realTweened = tweened(0, {
        delay: delay + duration * 0.5,
        duration: duration * 0.5,
        easing: easing,
      })

      let cryptIndex = 0
      let realIndex = 0

      cryptTweened.subscribe((value) => {
        let nextCryptIndex = Math.round(value * targetLength)
        console.log(nextCryptIndex)
        for (
          cryptIndex;
          cryptIndex++;
          cryptIndex < nextCryptIndex
        ) {
          let newCharacter = ''
          if (Math.random() > 0.2) {
            newCharacter = '*'
          } else {
            newCharacter = ' '
          }
          newTextArray[cryptIndex] = newCharacter
        }
      })

      realTweened.subscribe((value) => {
        let nextRealIndex = Math.round(value * targetLength) 
        console.log(nextRealIndex)
        for (
          realIndex;
          realIndex++;
          realIndex < nextRealIndex
        ) {
          newTextArray[realIndex] = targetText[realIndex]
          set(newTextArray.join(''))
        }
      })

      cryptTweened.set(1)
      realTweened.set(1)
    },
    subscribe,
    update,
  }
}

export { letterDecryptAnimation }
