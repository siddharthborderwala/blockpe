/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/join',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/home/links',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
