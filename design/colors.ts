export function hexToRgb(hex: string) {
  let r = 0,
    g = 0,
    b = 0;
  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6 digits
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function generateColorRange(
  startColor: string,
  endColor: string,
  steps: number
) {
  let startRgb = hexToRgb(startColor);
  let endRgb = hexToRgb(endColor);
  let colorRange = [];

  for (let step = 0; step <= steps; step++) {
    let r = startRgb[0] + ((endRgb[0] - startRgb[0]) / steps) * step;
    let g = startRgb[1] + ((endRgb[1] - startRgb[1]) / steps) * step;
    let b = startRgb[2] + ((endRgb[2] - startRgb[2]) / steps) * step;
    colorRange.push(rgbToHex(Math.round(r), Math.round(g), Math.round(b)));
  }

  return colorRange;
}
