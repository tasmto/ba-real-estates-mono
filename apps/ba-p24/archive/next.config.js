/** @type {import('next').NextConfig} */

const nextConfig = {
  // transpilePackages: ["ui"],
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: !process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
