/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_HOSTNAME,
        port: process.env.NEXT_PUBLIC_PORT,
        pathname: process.env.NEXT_PUBLIC_HOST_IMAGES,
      },
    ],
  },
};

module.exports = nextConfig;
