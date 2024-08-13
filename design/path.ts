/** This class represents an SVG path creator */
export class Path {
  d = ''

  private append(c: string) {
    this.d += c
    return this
  }

  M(x: number, y: number) {
    this.append(`M ${x},${y}`)
    return this
  }

  m(x: number, y: number) {
    this.append(`m ${x},${y}`)
    return this
  }

  C(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
    this.append(`C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`)
    return this
  }

  c(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
    this.append(`c ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`)
    return this
  }
}
