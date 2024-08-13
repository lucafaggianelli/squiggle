export const basePath = process.env.NODE_ENV === 'production' ? '/squiggle' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
