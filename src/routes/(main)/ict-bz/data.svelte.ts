import { sleep } from '$lib/utils'
import { Spring } from 'svelte/motion'

type CubeType = {
  initialPosition: { x: number; y: number }
  position: Spring<{ x: number; y: number }>
  finalPosition: { x: number; y: number }
  color: string
}

const STIFFNESS = 0.2
const DAMPING = 0.5

const GRAY = '#E6E6E6'
const PINK = '#D4006D'
const ORANGE = '#E18601'
const LIME = '#A2BC0E'
const RED = '#D20910'
const DARK_RED = '#9E1613'
const BLUE = '#1A94CB'
const TURQUOISE = '#009F7B'

function getCubes(): CubeType[] {
  const cubes = [
    {
      initialPosition: { x: -2, y: 0 },
      finalPosition: { x: -2, y: 0 },
      color: GRAY,
    },
    {
      initialPosition: { x: 2, y: 0 },
      finalPosition: { x: -1, y: 0 },
      color: LIME,
    },
    {
      initialPosition: { x: -3, y: -1 },
      finalPosition: { x: -1, y: -1 },
      color: GRAY,
    },
    {
      initialPosition: { x: 4, y: 0 },
      finalPosition: { x: 0, y: 0 },
      color: TURQUOISE,
    },
    {
      initialPosition: { x: -5, y: -1 },
      finalPosition: { x: -2, y: -1 },
      color: GRAY,
    },
    {
      initialPosition: { x: -7, y: -1 },
      finalPosition: { x: -3, y: -1 },
      color: GRAY,
    },
    {
      initialPosition: { x: -2, y: -3 },
      finalPosition: { x: -2, y: -2 },
      color: GRAY,
    },
    {
      initialPosition: { x: -1, y: -2 },
      finalPosition: { x: -1, y: -2 },
      color: PINK,
    },
    {
      initialPosition: { x: 6, y: 0 },
      finalPosition: { x: 1, y: 0 },
      color: BLUE,
    },
    {
      initialPosition: { x: 1, y: -3 },
      finalPosition: { x: 1, y: -1 },
      color: RED,
    },
    {
      initialPosition: { x: 0, y: -2 },
      finalPosition: { x: 0, y: -2 },
      color: ORANGE,
    },
    {
      initialPosition: { x: 1, y: -5 },
      finalPosition: { x: 1, y: -2 },
      color: LIME,
    },
    {
      initialPosition: { x: 0, y: -1 },
      finalPosition: { x: 0, y: -1 },
      color: DARK_RED,
    },
    {
      initialPosition: { x: 1, y: 2 },
      finalPosition: { x: 1, y: 1 },
      color: ORANGE,
    },
    {
      initialPosition: { x: 0, y: 1 },
      finalPosition: { x: 0, y: 1 },
      color: PINK,
    },
    {
      initialPosition: { x: -1, y: 3 },
      finalPosition: { x: -1, y: 1 },
      color: RED,
    },
    {
      initialPosition: { x: -2, y: 1 },
      finalPosition: { x: -2, y: 1 },
      color: DARK_RED,
    },
  ]

  const newCubes = cubes.map((cube) => {
    return {
      ...cube,
      position: new Spring(
        { x: cube.initialPosition.x, y: cube.initialPosition.y },
        { stiffness: STIFFNESS, damping: DAMPING }
      ),
    }
  })

  return newCubes
}

class CubeSystem {
  public cubes: CubeType[] = $state([])
  public stagger: number

  constructor(stagger = 200) {
    this.cubes = getCubes()
    this.stagger = stagger
  }

  public animateToFinalPositions = async () => {
    this.cubes.forEach((cube, index) => {
      setTimeout(() => {
        cube.position.target = cube.finalPosition
      }, index * this.stagger)
    })

    await sleep(this.cubes.length * this.stagger)
  }

  public animateToInitialPositions = async () => {
    this.cubes.toReversed().forEach((cube, index) => {
      setTimeout(() => {
        cube.position.target = cube.initialPosition
      }, index * this.stagger)
    })

    await sleep(this.cubes.length * this.stagger)
  }
}

const cubeSystem = new CubeSystem()
export { cubeSystem }
