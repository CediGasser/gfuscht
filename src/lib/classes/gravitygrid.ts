import { rand } from '../utils'

export class Particle {
  public size: number
  public frame: number
  public x: number
  public y: number
  public color: string = 'green'

  constructor(x: number, y: number, size: number, frame: number) {
    this.x = x
    this.y = y
    this.size = size
    this.frame = frame
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    let gap = (this.frame - this.size) / 2
    ctx.fillRect(this.x + gap, this.y + gap, this.size, this.size)
  }
}

export class Effect {
  public canvas: HTMLCanvasElement
  public width: number
  public height: number
  public res: number
  public gridParticles: Particle[] = []
  public movingParticles: MovingParticle[] = []
  public particleSize: number
  public sensorDistance: number
  public accent: string

  constructor(
    canvas: HTMLCanvasElement,
    particleSize: number,
    res: number,
    sensorDistance: number,
    accent: string
  ) {
    this.canvas = canvas
    this.width = canvas.width
    this.height = canvas.height
    this.particleSize = particleSize
    this.sensorDistance = sensorDistance
    this.res = res
    this.accent = accent
  }

  setup() {
    let rows = this.height / this.res
    let cols = this.width / this.res

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let p = new Particle(
          j * this.res,
          i * this.res,
          this.particleSize,
          this.res
        )
        p.color = this.accent
        this.gridParticles.push(p)
      }
    }

    this.movingParticles.push(
      new MovingParticle(
        -this.sensorDistance,
        -this.sensorDistance,
        10,
        10,
        0,
        0
      )
    )
    this.movingParticles.push(
      getRandomMovingParticle(this.width, this.height, this.sensorDistance)
    )

    this.movingParticles[0].color = 'pink'
    this.movingParticles[0].update = () => {}
    this.canvas.addEventListener('mousemove', (e) => {
      this.movingParticles[0].x = e.offsetX
      this.movingParticles[0].y = e.offsetY
    })
  }

  update() {
    for (let i = 0; i < this.movingParticles.length; i++) {
      let p = this.movingParticles[i]
      p.update()

      // create new moving Particle if current out of bounds
      if (
        p.x < -this.sensorDistance ||
        p.x > this.width + this.sensorDistance ||
        p.y < -this.sensorDistance ||
        p.y > this.height + this.sensorDistance
      ) {
        this.movingParticles[i] = getRandomMovingParticle(
          this.width,
          this.height,
          this.sensorDistance
        )
      }
    }

    this.gridParticles.forEach((p) => {
      let grow = 0
      for (let i = 0; i < this.movingParticles.length; i++) {
        let x1 = this.movingParticles[i].x
        let y1 = this.movingParticles[i].y

        let x2 = p.x + p.frame / 2
        let y2 = p.y + p.frame / 2

        let vx = x2 - x1
        let vy = y2 - y1
        let d = Math.sqrt(vx * vx + vy * vy)

        let maxGrowth = this.res - this.particleSize
        if (d < this.sensorDistance) {
          grow += maxGrowth - (maxGrowth * d) / this.sensorDistance
        } else {
          grow += 0
        }
      }
      grow = Math.min(grow, 30)
      p.size = this.particleSize + grow
    })
  }

  draw() {
    let ctx = this.canvas.getContext('2d')

    if (!ctx) return console.error('Could not get canvas context')

    ctx.clearRect(0, 0, this.width, this.height)

    this.gridParticles.forEach((p) => p.draw(ctx))
  }
}

export class MovingParticle extends Particle {
  public velocityX: number
  public velocityY: number

  constructor(
    x: number,
    y: number,
    size: number,
    frame: number,
    velocityX: number,
    velocityY: number
  ) {
    super(x, y, size, frame)
    this.velocityX = velocityX
    this.velocityY = velocityY
  }

  update() {
    this.x += this.velocityX / 100
    this.y += this.velocityY / 100
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }
}

function getRandomMovingParticle(
  width: number,
  height: number,
  sensorDistance: number
) {
  let left = -sensorDistance
  let top = -sensorDistance
  let right = width + sensorDistance
  let bottom = height + sensorDistance

  let x = Math.random() * width
  let y = Math.random() * height

  let velocityX = Math.random() * 400 + 400
  let velocityY = Math.random() * 400 + 400

  if (rand([true, false])) {
    x = rand([left, right])

    if (x === right) {
      velocityX *= -1
    }
  } else {
    y = rand([top, bottom])

    if (y === bottom) {
      velocityY *= -1
    }
  }

  return new MovingParticle(x, y, 1, 1, velocityX, velocityY)
}
