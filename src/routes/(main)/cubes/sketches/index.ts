import { sketch as connectedCubes } from './connected-cubes'
import { sketch as hexagon } from './hexagon'
import { sketch as hexagonalGrid } from './hexagonal-grid'
import { sketch as cubesGrid } from './cubes-grid'
import { sketch as randomSamples } from './random-samples'
import { sketch as connectionMess } from './connection-mess'
import { sketch as connections } from './connections'

export const sketches = [
  {
    name: 'hexagon',
    sketch: hexagon,
  },
  {
    name: 'hexagonal-grid',
    sketch: hexagonalGrid,
  },
  {
    name: 'cubes-grid',
    sketch: cubesGrid,
  },
  {
    name: 'random-samples',
    sketch: randomSamples,
  },
  {
    name: 'connection-mess',
    sketch: connectionMess,
  },
  {
    name: 'connections',
    sketch: connections,
  },
  {
    name: 'connected-cubes',
    sketch: connectedCubes,
  },
]
