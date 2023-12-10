import { writable } from "svelte/store"
import { browser } from "$app/environment"
import type { Action } from "svelte/action"

function tryGetTheme() {
  let theme = 'theme-rose-pine'
  if (browser) theme = localStorage.getItem('theme') ?? theme
  return theme
}

function createThemeStore() {
  const { set, subscribe, update } = writable(tryGetTheme())
  let themeRoot: HTMLElement | null = null

  return {
    set: (value: string) => {
      set(value)
      if (browser) localStorage.setItem('theme', value)
    },
    subscribe,
    update,
    getPropertyValue: (customPropertyName: string) => {
      if (!browser) return
      if (!themeRoot) return

      let styles = window.getComputedStyle(themeRoot)

		  return styles.getPropertyValue(customPropertyName)
    },
    setThemeRoot: (node: HTMLElement) => {
      themeRoot = node
    }
  }
}

export const themeStore = createThemeStore()

export const themeRoot: Action<HTMLElement> = (node: HTMLElement) => {
  themeStore.setThemeRoot(node)
}