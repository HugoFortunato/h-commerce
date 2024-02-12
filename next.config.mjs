/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['files.stripe.com'],
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      // https://webpack.js.org/configuration/other-options/#ignorewarnings
      {
        module: /node-fetch/,
        message: /.*Can't resolve 'encoding'.*/,
      },
    ];

    return config;
  },
};

export default nextConfig;
