import p5 from 'p5'

const radius = 30
const lineHeight = 2 * 1.5 * radius
const halfLineHeight = lineHeight / 2
const columnDistance = Math.cos(Math.PI / 6) * radius

const lineConnectChance = 0.01

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

    let [sample1, sample2, sample3] = randomSamplesOf(hexagonPositions, 6)

    p.stroke('firebrick')
    sample1.forEach((p) => hexagonBestagon(p.x, p.y, radius - margin))
    drawConnections(sample1, 2, 2)

    p.stroke('indigo')
    sample2.forEach((p) => hexagonBestagon(p.x, p.y, radius - margin))
    drawConnections(sample2, 1, 1)

    p.stroke('green')
    sample3.forEach((p) => hexagonBestagon(p.x, p.y, radius - margin))
    drawConnections(sample3, 0, 0)

    p.noLoop()
  }

  function drawConnections(
    hexagons: p5.Vector[],
    direction: 0 | 1 | 2,
    centerOffset = 0
  ) {
    let offsetAngles = [p.PI / 6, (p.PI / 6) * 5, p.PI * 1.5]

    const offsetAngle = offsetAngles[(direction + 2) % 3]
    const offsetVector = p5.Vector.fromAngle(offsetAngle).mult(
      radius / 2 - 2 - centerOffset
    )

    const count = hexagons.length
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const one = hexagons[i]
        const oneOffset = p5.Vector.add(one, offsetVector)
        const other = hexagons[j]
        const otherOffset = p5.Vector.add(other, offsetVector)

        if (Math.random() < lineConnectChance) {
          p.strokeWeight(4)
          p.point(oneOffset)
          p.point(otherOffset)
          p.strokeWeight(1)
          p.line(oneOffset.x, oneOffset.y, otherOffset.x, otherOffset.y)
        }
      }
    }
  }

  function randomSamplesOf(array: any[], numSamples: number) {
    const res = Array.from({ length: numSamples }, () => []) as p5.Vector[][]

    array.forEach((e) => p.random(res).push(e))

    return res
  }

  function hexagonBestagon(posX: number, posY: number, radius: number) {
    let radiusXangled = radius * Math.cos(p.PI / 6)
    let radiusYangled = radius * Math.sin(p.PI / 6)
    hexagon(posX, posY, radius)
    p.line(posX, posY, posX, posY + radius)
    p.line(posX, posY, posX + radiusXangled, posY - radiusYangled)
    p.line(posX, posY, posX - radiusXangled, posY - radiusYangled)
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
