import { tweened } from "./Tweened.svelte"
import { expoInOut } from "svelte/easing"

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
}

export const letterDecryptAnimation = (initial?: string, options?: Options) => {
  const delay = 0
  const duration = 1000
  const easing = expoInOut

  let targetText = $state(initial ?? '')
  let targetLength = $derived(targetText.length)
  let animatedTextArray = Array.from(initial ?? '')
  let animatedText = $derived(animatedTextArray.join(''))

  let cryptIndex = 0
  let realIndex = 0

  const startAnimation = () => {
    cryptIndex = 0
    realIndex = 0

    let cryptTweened = tweened(0, { delay, duration, easing })
    let realTweened = tweened(0, { delay, duration, easing })

    $effect.root(() => {

      $effect(() => {
        let nextCryptIndex = Math.round(cryptTweened.value * targetLength)
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
          animatedTextArray[cryptIndex] = newCharacter
        }
      })

      $effect(() => {
        let nextRealIndex = Math.round(realTweened.value * targetLength)
        console.log(nextRealIndex)
        for (
          realIndex;
          realIndex++;
          realIndex < nextRealIndex
        ) {
          animatedTextArray[realIndex] = targetText[realIndex]
        }
      })
    })
  }

  return {
    set value(value: string) {
      targetText = value
      setTimeout(startAnimation, delay)
    },
    get animated(): string {
      return animatedText
    }
  }
}
