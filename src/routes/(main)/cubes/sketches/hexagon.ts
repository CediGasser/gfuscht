import p5 from 'p5'

const radius = 30

export function sketch(p: p5) {
  p.setup = () => {
    p.createCanvas(800, 800)
  }
  p.draw = () => {
    p.background(222)

    hexagon(400, 400, radius)

    p.noLoop()
  }

  function hexagon(posX: number, posY: number, radius: number) {
    circleWithVertex(posX, posY, radius, 6)
  }

  function circleWithVertex(
    posX: number,
    posY: number,
    radius: number,
    parts = 64
  ) {
    p.beginShape()
    for (let i = 0; i <= parts; i++) {
      const angle = (p.TWO_PI / parts) * i
      const x = posX + Math.sin(angle) * radius
      const y = posY + Math.cos(angle) * radius
      p.vertex(x, y)
    }
    p.endShape()
  }
}
