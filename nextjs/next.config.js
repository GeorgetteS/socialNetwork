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
    domains: [process.env.NEXT_PUBLIC_HOSTNAME],
  },
};

module.exports = nextConfig;
