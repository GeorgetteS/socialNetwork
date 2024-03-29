/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  // compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // output: 'export',
  images: {
    domains: [process.env.NEXT_PUBLIC_HOSTNAME],
    unoptimized: true,
  },
};

module.exports = nextConfig;
