type CubeType = {
  position: { x: number; y: number }
  color: string
}

const GRAY = '#E6E6E6'
const PINK = '#D4006D'
const ORANGE = '#E18601'
const LIME = '#A2BC0E'
const RED = '#D20910'
const DARK_RED = '#9E1613'
const BLUE = '#1A94CB'
const TURQUOISE = '#009F7B'

export const cubes: CubeType[] = [
  {
    position: { x: -2, y: 0 },
    color: GRAY,
  },
  {
    position: { x: -1, y: -1 },
    color: GRAY,
  },
  {
    position: { x: -2, y: -1 },
    color: GRAY,
  },
  {
    position: { x: -3, y: -1 },
    color: GRAY,
  },
  {
    position: { x: -2, y: -2 },
    color: GRAY,
  },
  {
    position: { x: -1, y: -2 },
    color: PINK,
  },
  {
    position: { x: 0, y: -2 },
    color: ORANGE,
  },
  {
    position: { x: 1, y: -2 },
    color: LIME,
  },
  {
    position: { x: 1, y: -1 },
    color: RED,
  },
  {
    position: { x: 0, y: -1 },
    color: DARK_RED,
  },
  {
    position: { x: 1, y: 0 },
    color: BLUE,
  },
  {
    position: { x: 0, y: 0 },
    color: TURQUOISE,
  },
  {
    position: { x: -1, y: 0 },
    color: LIME,
  },
  {
    position: { x: 1, y: 1 },
    color: ORANGE,
  },
  {
    position: { x: 0, y: 1 },
    color: PINK,
  },
  {
    position: { x: -1, y: 1 },
    color: RED,
  },
  {
    position: { x: -2, y: 1 },
    color: DARK_RED,
  },
]
