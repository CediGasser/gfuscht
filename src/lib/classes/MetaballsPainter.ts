import type { IPointsPainter, IPoint } from '$lib/types/CreativeCodingBasics'
import { applyFalloff, type FalloffType } from './FalloffFunctions'

export class MetaballsPainter implements IPointsPainter {
  public ballSize
  public threshhold
  public color
  public falloffType

  private ctx: CanvasRenderingContext2D | null = null
  public set context(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }
  public get context(): CanvasRenderingContext2D | null {
    return this.ctx
  }

  constructor(
    ballSize: number = 10,
    threshhold: number = 1,
    color: string = 'black',
    falloffType: FalloffType = 'electricFieldFalloff'
  ) {
    this.ballSize = ballSize
    this.threshhold = threshhold
    this.color = color
    this.falloffType = falloffType
  }

  paint(points: IPoint[]): void {
    if (!this.context) {
      throw Error('Invalid Canvas Rendering Context')
    }

    const width = this.context.canvas.width
    const height = this.context.canvas.height

    this.context.clearRect(0, 0, width, height)

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let totalValue = 0
        for (let i = 0, len = points.length; i < len; i++) {
          const ball = points[i]
          const dx = (x - ball.x) / this.ballSize
          const dy = (y - ball.y) / this.ballSize
          const value = applyFalloff(this.falloffType, dx, dy)
          totalValue += value
        }

        if (totalValue > this.threshhold) {
          let color = this.color
          this.context.fillStyle = color
          this.context.fillRect(x, y, 1, 1)
        }
      }
    }
  }
}
