/** @type {import('next').NextConfig} */
module.exports = () => {
  return {
    output: 'export',
    reactStrictMode: true,
    trailingSlash: true,
    eslint: {
      ignoreDuringBuilds: true
    },
    images: {
      unoptimized: true
    }
  }
}
