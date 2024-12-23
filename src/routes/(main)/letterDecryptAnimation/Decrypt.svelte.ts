import { Tween } from 'svelte/motion'
import { rand } from '$lib/utils'
import { cubicInOut, cubicOut, linear } from 'svelte/easing'

type TweenedOptions = ConstructorParameters<typeof Tween<number>>[1]

const CODEY_CHARS = [
  '*',
  '[',
  ']',
  '-',
  '%',
  'x',
  '/',
  ' ',
  ' ',
  ':',
  '$',
  ' ',
  ' ',
  ';',
  ' ',
]

const RAND_CHARS = Array.from({ length: 100 }, () => rand(CODEY_CHARS))

const getPseudoRandomChar = (index: number) =>
  RAND_CHARS[index % RAND_CHARS.length]

export class ZeroBouncingTween {
  #tween: Tween<number> = $state(new Tween(0))
  #current: number = $derived(Math.abs(this.#tween.current))
  #target: number = $state(Math.abs(this.#tween.target))
  #direction: number = $derived(Math.sign(this.#tween.current) * -1)
  #options: TweenedOptions

  constructor(value: number, options: TweenedOptions) {
    this.#options = options
    this.#tween = new Tween(value, options)
    this.#tween.set(-value, options)
  }

  public get current(): number {
    return this.#current
  }

  public set target(value: number) {
    this.#target = value
    this.#tween = new Tween(this.#current, this.#options)
    this.#tween.set(-value)
  }

  public get target(): number {
    return this.#target
  }

  public get direction(): number {
    return this.#direction
  }
}

export class LetterDecrypt {
  #target: String = $state('')
  #previous: String = $state('')
  #tween: ZeroBouncingTween = new ZeroBouncingTween(0, {
    duration: 500,
    easing: linear,
  })
  #delayedTween: Tween<number> = Tween.of(() => this.#tween.current, {
    duration: 300,
    easing: linear,
  })

  #currentLetters: String[] = $derived(
    this.getCurrentLetterArray(
      this.#target,
      this.#previous,
      this.#tween.current,
      this.#tween.direction,
      this.#delayedTween.current
    )
  )
  #current: String = $derived(this.#currentLetters.join(''))

  public get current(): String {
    return this.#current
  }

  public set target(value: String) {
    this.#tween.target = value.length
    this.#target = value
  }

  public get target(): String {
    return this.#target
  }

  public get tween(): ZeroBouncingTween {
    return this.#tween
  }

  constructor(initialValue: string, options?: Omit<TweenedOptions, 'easing'>) {
    this.#target = initialValue
    this.#previous = initialValue

    this.#tween = new ZeroBouncingTween(initialValue.length, {
      ...options,
      easing: cubicInOut,
    })
    this.#delayedTween = Tween.of(() => this.#tween.current, {
      duration: 500,
      easing: cubicOut,
    })
  }

  private getCurrentLetterArray(
    target: String,
    previous: String,
    tweenValue: number,
    tweenDirection: number,
    delayedTweenValue: number
  ): String[] {
    if (tweenDirection >= 0) this.#previous = target
    const letters = tweenDirection >= 0 ? target.split('') : previous.split('')

    const index = Math.floor(tweenValue)
    const delayedIndex = Math.floor(delayedTweenValue)

    return letters
      .map((letter, i) => {
        if (i <= index && i <= delayedIndex) return letter
        if ((i > delayedIndex && i < index) || (i > index && i < delayedIndex))
          return getPseudoRandomChar(i)
        if (i >= index && i >= delayedIndex) return ''
        return letter
      })
      .filter(Boolean)
  }
}
