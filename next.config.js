/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
}

module.exports = nextConfig

