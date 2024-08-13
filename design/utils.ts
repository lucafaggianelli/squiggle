export const directionVector = (angle: number) => ({
  x1: 1,
  y1: 1,
  x2: (Math.cos(angle * (Math.PI / 180)) + 1).toFixed(2),
  y2: (Math.sin(angle * (Math.PI / 180)) + 1).toFixed(2),
})
