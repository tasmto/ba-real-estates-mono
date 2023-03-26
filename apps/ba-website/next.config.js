/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['ui'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'www.cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: /*!process.env.NODE_ENV === 'production'*/ true,
  },
};

module.exports = nextConfig;
