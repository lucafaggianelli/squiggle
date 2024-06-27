interface NoiseOptions {
  id: string
}

export const generateNoise = ({ id = 'noise' }: NoiseOptions) => {
  const noise = document.createElementNS('http://www.w3.org/2000/svg', 'filter')

  noise.id = id

  noise.innerHTML = `
        <feTurbulence
          type="fractalNoise"
          baseFrequency="19.5"
          numOctaves="10"
          result="turbulence"
        />
        <feComposite operator="in" in="turbulence" in2="SourceAlpha" result="composite"/>
        <feColorMatrix in="composite" type="luminanceToAlpha" />
        <feBlend in="SourceGraphic" in2="composite" mode="color-burn" />
  `

  return noise
}
