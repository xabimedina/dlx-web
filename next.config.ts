import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  experimental: {
    viewTransition: true,
  },
  // Headers SEO optimizados
  async headers() {
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
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=43200',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/:path*.(jpg|jpeg|png|gif|ico|svg|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Redirects SEO para mantener URLs limpias
  async redirects() {
    return [
      // Redirección de dominio .com a .es
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'despejalax.com',
          },
        ],
        destination: 'https://www.despejalax.es/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.despejalax.com',
          },
        ],
        destination: 'https://www.despejalax.es/:path*',
        permanent: true,
      },
      // Redirección sin www a www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'despejalax.es',
          },
        ],
        destination: 'https://www.despejalax.es/:path*',
        permanent: true,
      },
      // URLs limpias
      {
        source: '/proyectos/',
        destination: '/proyectos',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // Comprimir archivos estáticos
  compress: true,
  // PWA y Service Worker ready
  poweredByHeader: false,
};

export default nextConfig;
