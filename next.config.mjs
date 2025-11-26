/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactCompiler: true,
  compress: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/converter/image-to-pdf',
        destination: '/tools/image-to-pdf',
        permanent: true,
      },
      {
        source: '/tools/pdf-merge',
        destination: '/tools/merge-pdf',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
