/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // GitHub Pages için static export
  images: {
    unoptimized: true, // Static export için gerekli
    domains: [
      'app.virtuals.io',
      's3.ap-southeast-1.amazonaws.com',
      'acpcdn-prod.s3.ap-southeast-1.amazonaws.com',
      'vdiysqfdjrthypynamgx.supabase.co',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ap-southeast-1.amazonaws.com',
        pathname: '/virtualprotocolcdn/**',
      },
      {
        protocol: 'https',
        hostname: 'acpcdn-prod.s3.ap-southeast-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
  // GitHub Pages için base path (repo adına göre)
  basePath: process.env.NODE_ENV === 'production' ? '/agentbas' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/agentbas' : '',
}

module.exports = nextConfig

