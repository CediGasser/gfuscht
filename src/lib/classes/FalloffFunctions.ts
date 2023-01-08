export const electricFieldFalloff = (x: number, y: number, c: number = 1): number => {
  const distance = Math.sqrt(x * x + y * y);
  return 1 / (distance * distance);
}

export const constrainedFalloff = (x: number, y: number, c: number = 1): number => {
  const distance = Math.sqrt(x * x + y * y);
  const r = c / distance;
  return r * r * r * (r * (r * 6 - 15) + 10) * c
}

export const linearFalloff = (x: number, y: number, c: number = 1): number => {
  const distance = Math.sqrt(x * x + y * y);
  return 1 / distance;
}

export const squaredFalloff = (x: number, y: number): number => {
  return 1 / Math.max(Math.abs(x), Math.abs(y))
}

export const toTheForthFalloff = (x: number, y: number): number => {
  return 1 / (x * x * x * x + y * y * y * y)
}

export const cubedFalloff = (x: number, y: number): number => {
  return 1 / (Math.abs(x * x * x) + Math.abs(y * y * y))
}

export const customPowerFalloff = (x: number, y: number, c: number = 2): number => {
  return 1 / (Math.abs(Math.pow(x, c)) + Math.abs(Math.pow(y, c)))
}

export const smileFalloff = (x: number, y: number, c: number): number => {
  let var1 = x*x + y*y;
  let var2 = -((x+1/2)*(x+1/2) + (y-1/2)*(y-1/2)) + (1/5)*(1/5) + 1;
  let var3 = -((x-1/2)*(x-1/2) + (y-1/2)*(y-1/2)) + (1/5)*(1/5) + 1;
  let var4 = x*x - 2/3 - y + 1;
  let var5 = y + 1/3 + 1;
  return 1 / Math.max(var1, var2, var3, -Math.max(var4, var5) + 2);
}