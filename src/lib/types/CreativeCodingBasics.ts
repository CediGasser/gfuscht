export interface IPoint {
  x: number
  y: number
}

export interface IPointsProvider {
  getPoints: () => IPoint[]
}
