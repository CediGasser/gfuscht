import p5 from 'p5'

const radius = 30
const lineHeight = 2 * 1.5 * radius
const halfLineHeight = lineHeight / 2
const columnDistance = Math.cos(Math.PI / 6) * radius

let startCoords: p5.Vector

const margin = 5

export function sketch(p: p5) {
  p.setup = () => {
    p.createCanvas(800, 800)
    startCoords = p.createVector(50, 50)
  }
  p.draw = () => {
    p.background(222)

    let indentColumn = false

    let hexagonPositions = []

    for (
      let x = startCoords.x;
      x <= p.width - startCoords.x;
      x += columnDistance
    ) {
      for (
        let y = indentColumn ? startCoords.y : startCoords.y + halfLineHeight;
        y <= p.height - startCoords.y;
        y += lineHeight
      ) {
        hexagonPositions.push(p.createVector(x, y))
      }
      indentColumn = !indentColumn
    }

    hexagonPositions.forEach((p) => hexagon(p.x, p.y, radius - margin - 4))

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
