import type { IPointsProvider, IPoint } from '$lib/types/CreativeCodingBasics'

interface IGravitatingPoint extends IPoint {
  dx: number
  dy: number
  mass: number
}

export class GravitySystem implements IPointsProvider {
  public points: IGravitatingPoint[] = []
  public width: number = 600
  public height: number = 600

  public forceCoeficient = 0.1
  public maxVelocity = 0.1
  public borderZone = 200
  public borderPushBack = 0.001
  public maxDt = 100
  public damping = 0.99

  private previousTime: number = 0

  constructor(width: number, height: number, points: IPoint[]) {
    this.width = width
    this.height = height

    this.points = points.map((point) => ({
      ...point,
      dx: 0,
      dy: 0,
      mass: 1,
    }))
  }

  getPoints = () => this.points

  update = (t: number) => {
    // Calculate the time since the last update
    const dt = Math.min(t - this.previousTime, this.maxDt)

    // Calculate the forces of attraction or repulsion between each pair of points
    for (let i = 0; i < this.points.length; i++) {
      const point1 = this.points[i]
      for (let j = i + 1; j < this.points.length; j++) {
        const point2 = this.points[j]

        // Calculate the distance between the points
        const dx = point1.x - point2.x
        const dy = point1.y - point2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Calculate the force of attraction or repulsion
        const force = this.forceCoeficient / distance

        // Update the velocities of the balls based on the force
        point1.dx -= (force * dx) / distance
        point1.dy -= (force * dy) / distance
        point2.dx += (force * dx) / distance
        point2.dy += (force * dy) / distance
      }
    }

    // Update the position of each ball based on its velocity
    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i]

      // Limit the velocities of the balls to a maximum value
      point.dx = Math.min(
        Math.max(point.dx, -this.maxVelocity),
        this.maxVelocity
      )
      point.dy = Math.min(
        Math.max(point.dy, -this.maxVelocity),
        this.maxVelocity
      )

      // Update the ball's position
      point.x += point.dx * dt * this.damping
      point.y += point.dy * dt * this.damping

      // Check if the ball has reached the edge of the canvas
      if (point.x < 0 || point.x > this.width) {
        point.dx *= -1
      }
      if (point.y < 0 || point.y > this.height) {
        point.dy *= -1
      }

      // Check if the ball is close to the edge of the canvas and dampend its velocity
      if (point.y > this.height - this.borderZone) {
        point.dy -= this.borderPushBack
      }
      if (point.y < this.borderZone) {
        point.dy += this.borderPushBack
      }
      if (point.x > this.width - this.borderZone) {
        point.dx -= this.borderPushBack
      }
      if (point.x < this.borderZone) {
        point.dx += this.borderPushBack
      }

      // Randomly alter the ball's trajectory
      if (Math.random() < 0.001) {
        point.dx += Math.random() - 0.5
        point.dy += Math.random() - 0.5
      }
    }
  }

  public static fromRandom = (width: number, height: number, count: number) => {
    const points: IPoint[] = []
    for (let i = 0; i < count; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
      })
    }
    return new GravitySystem(width, height, points)
  }
}
