const basePath = '/squiggle'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  output: 'export',
  images: {
    path: `${basePath}/_next/image`,
    unoptimized: true,
  },
}

export default nextConfig
