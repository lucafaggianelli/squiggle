'use client'

import { SVG } from '@svgdotjs/svg.js'
import { useEffect, useRef, useState } from 'react'

import { generateColorRange } from '@/design/colors'
import { generateNoise } from '@/design/noise'
import { Pane } from 'tweakpane'
import CopyButton from '@/components/CopyButton'

interface Props {
  backgroundColor?: string
  container: HTMLElement
  curveDirection?: { x: number; y: number }
  extension?: number
  height?: number
  noise?: boolean
  opacity?: number
  spacing?: number
  thickness?: number
  width?: number
  wavesColors?: string[]
}

const generateWaves = ({
  backgroundColor = '#7b996c',
  container,
  curveDirection = { x: -5, y: -2 },
  extension = 1,
  height = 300,
  noise = false,
  opacity = 0.7,
  spacing = 25,
  thickness = 1.5,
  wavesColors = ['#ccc', '#bbb'],
  width = 800,
}: Props) => {
  const draw = SVG()
    .size('100%', '100%')
    .attr({
      id: 'waves',
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: 'xMinYMin slice',
    })

  const defs = draw.defs()

  const count = (width / spacing) * extension

  const colors = generateColorRange(wavesColors[0], wavesColors[1], count)

  const background = draw.rect(width, height).fill({ color: backgroundColor })

  if (noise) {
    const noiseId = 'noise'

    defs.add(generateNoise({ id: noiseId }) as any)
    background.attr({ filter: `url('#${noiseId}')` })
  }

  const g = draw.group()

  for (let i = 0; i < count; i++) {
    var path = g
      .path(
        `
    M ${i * spacing},0
    C ${i * spacing + curveDirection.x * i} ${
          height / 2 + i * curveDirection.y
        }, ${i * spacing + curveDirection.x * i} ${
          height / 2 + i * curveDirection.y
        }, ${i * spacing} ${height}`
      )
      .stroke({ color: colors[i], width: thickness, opacity })
      .fill({ color: 'none' })
  }

  const el = SVG('#waves')
  if (el) {
    el.replace(draw)
  } else {
    draw.addTo(container)
  }
}

export default function Waves() {
  const controlsConfig = {
    backgroundColor: { value: '#7b996c', label: 'Background' },
    extension: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.05,
    },
    noise: { value: true },
    opacity: { value: 0.7, min: 0, max: 1, step: 0.05 },
    spacing: { value: 15, min: 1, max: 100, step: 1 },
    thickness: { value: 1.5, min: 0.1, max: 5, step: 0.1 },
    textColor: { value: '#eae6cd', label: 'Text Color' },
    wavesColorFrom: { value: '#ccc', label: 'Color From' },
    wavesColorTo: { value: '#bbb', label: 'Color To' },
    curveDirection: {
      value: { x: -5, y: -2 },
      picker: 'inline',
      expanded: true,
    },
  }
  const defaultParams = Object.fromEntries(
    Object.entries(controlsConfig).map(([key, value]) => [
      key,
      value.value !== undefined ? value.value : value,
    ])
  ) as {
    [K in keyof typeof controlsConfig]: (typeof controlsConfig)[K]['value']
  }

  const options = Object.fromEntries(
    Object.entries(controlsConfig).map(([key, value]) => [key, value])
  )

  const [params, setParams] = useState(defaultParams)

  const ref = useRef<HTMLDivElement>(null)
  const loaded = useRef(false)
  const paneRef = useRef<Pane | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && !paneRef.current) {
      // Initialize Tweakpane
      paneRef.current = new Pane({
        container: document.getElementById('controls'),
      })

      // Add parameters to Tweakpane
      for (const key in params) {
        paneRef.current.addBinding(defaultParams, key, options[key])
      }

      paneRef.current.on('change', ({ target, value }) => {
        setParams((prev) => ({ ...prev, [target.key]: value as any }))
      })
    }
  }, [])

  useEffect(() => {
    if (ref.current) {
      const { wavesColorFrom, wavesColorTo, ...rest } = params

      generateWaves({
        container: ref.current,
        wavesColors: [wavesColorFrom as string, wavesColorTo as string],
        ...rest,
      })
      loaded.current = true
    }
  }, [ref, params])

  return (
    <div className="relative max-w-screen-lg mx-auto">
      <nav className="py-4 mb-8">
        <div className="container max-w-screen-lg mx-auto flex justify-between items-center">
          <div>My design</div>

          <div className="flex gap-4">
            <CopyButton
              label="Copy SVG"
              getContent={() => ref.current?.innerHTML}
            />
            <CopyButton
              label="Copy params"
              getContent={() => JSON.stringify(params)}
            />
          </div>
        </div>
      </nav>

      <div className="grid gap-8 xl:gap-16 grid-cols-1 md:grid-cols-3">
        <div className="relative rounded-3xl overflow-hidden md:col-span-2 flex">
          <div className="object-cover w-full" ref={ref} />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center p-16">
            <h1
              className="text-7xl font-serif"
              style={{ color: params.textColor }}
            >
              Waves
            </h1>
          </div>
        </div>

        <div id="controls" />
      </div>
    </div>
  )
}
