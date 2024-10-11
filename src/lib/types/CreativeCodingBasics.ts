import type { SvelteComponent } from 'svelte'

export interface IPoint {
  x: number
  y: number
}

export interface IPointsProvider {
  getPoints: () => IPoint[]
  update: (t: number) => void
}

export interface IPointsPainter {
  OptionsComponent: any
  context: CanvasRenderingContext2D | null
  paint(points: IPoint[]): void
}
