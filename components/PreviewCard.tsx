import Link from 'next/link'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  title?: string
  textColor?: string
  href: string
}

export default function PreviewCard({
  title,
  textColor,
  children,
  href,
}: Props) {
  return (
    <Link
      className="relative rounded-3xl overflow-hidden flex aspect-video"
      href={href}
    >
      <div className="flex items-center justify-center">{children}</div>

      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center p-16">
        {title && (
          <h1
            className="text-7xl font-serif text-center"
            style={{ color: textColor }}
          >
            {title}
          </h1>
        )}
      </div>
    </Link>
  )
}
