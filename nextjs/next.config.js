/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
