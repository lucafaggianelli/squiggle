import React, { RefObject } from 'react'
import { FiCopy } from 'react-icons/fi'

export default function CopyButton({
  element,
}: Readonly<{
  element: RefObject<SVGElement | HTMLElement | null>
}>) {
  const handleClick = async () => {
    if (!element.current) return

    const textToCopy = element.current.innerHTML

    try {
      await navigator.clipboard.writeText(textToCopy)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center p-2 bg-stone-300 rounded-md hover:bg-stone-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
    >
      <FiCopy className="mr-2" /> Copy SVG
    </button>
  )
}
