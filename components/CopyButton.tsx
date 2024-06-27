import React from 'react'
import { FiCopy } from 'react-icons/fi'

interface Props {
  getContent: () => string | undefined
  label: string
}

export default function CopyButton({ getContent, label }: Props) {
  const handleClick = async () => {
    const textToCopy = getContent()

    if (!textToCopy) {
      return
    }

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
      <FiCopy className="mr-2" /> {label}
    </button>
  )
}
