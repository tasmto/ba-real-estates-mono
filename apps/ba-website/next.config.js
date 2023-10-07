/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["ui"],
  reactStrictMode: true,
  swcMinify: true,
  distDir: ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "www.cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    loader: "custom",
    loaderFile: "./src/lib/sanity.image-loader.js",
  },
  experimental: {
    appDir: true,
    turboMode: false,
  },
  typescript: {
    ignoreBuildErrors: /*!process.env.NODE_ENV === 'production'*/ true,
  },
};

module.exports = nextConfig;
