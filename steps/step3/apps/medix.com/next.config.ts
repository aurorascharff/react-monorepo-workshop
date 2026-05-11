import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'

const appDir = dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  turbopack: {
    root: join(appDir, '../..'),
  },
  transpilePackages: ['@medix/ui'],
}

export default nextConfig
