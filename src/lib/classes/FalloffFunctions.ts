export const electricFieldFalloff = (x: number, y: number): number => {
  const distance = Math.sqrt(x * x + y * y)
  return 1 / (distance * distance)
}

export const constrainedFalloff = (x: number, y: number): number => {
  const distance = Math.sqrt(x * x + y * y)
  const r = 1 / distance
  return r * r * r * (r * (r * 6 - 15) + 10)
}

export const toTheForthFalloff = (x: number, y: number): number => {
  return 1 / (x * x * x * x + y * y * y * y)
}

export const cubedFalloff = (x: number, y: number): number => {
  return 1 / (Math.abs(x * x * x) + Math.abs(y * y * y))
}

export const customPowerFalloff = (x: number, y: number): number => {
  return 1 / (Math.abs(Math.pow(x, 2)) + Math.abs(Math.pow(y, 2)))
}

export type FalloffType =
  | 'electricFieldFalloff'
  | 'constrainedFalloff'
  | 'toTheForthFalloff'
  | 'cubedFalloff'
  | 'customPowerFalloff'

export const applyFalloff = (
  type: FalloffType,
  x: number,
  y: number
): number => {
  switch (type) {
    case 'electricFieldFalloff':
      return electricFieldFalloff(x, y)
    case 'constrainedFalloff':
      return constrainedFalloff(x, y)
    case 'toTheForthFalloff':
      return toTheForthFalloff(x, y)
    case 'cubedFalloff':
      return cubedFalloff(x, y)
    case 'customPowerFalloff':
      return customPowerFalloff(x, y)
    default:
      return 0
  }
}
