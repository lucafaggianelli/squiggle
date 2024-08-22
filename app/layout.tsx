import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Squiggle',
  description: 'Draw and share your ideas with Squiggle',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="lucafaggianelli.com/squiggle"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className={inter.className + ' antialiased bg-[#efeee8]'}>
        {children}
      </body>
    </html>
  )
}
