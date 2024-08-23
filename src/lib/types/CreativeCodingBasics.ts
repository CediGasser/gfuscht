export interface IPoint {
  x: number
  y: number
}

export interface IPointsProvider {
  getPoints: () => IPoint[]
  update: (t: number) => void
}

export interface IPointsPainter {
  context: CanvasRenderingContext2D | null
  paint(points: IPoint[]): void
}
