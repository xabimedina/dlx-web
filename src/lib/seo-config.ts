// SEO Configuration for DLX Web
export const seoConfig = {
  baseUrl: 'https://www.despejalax.com',
  siteName: 'Despeja la X - Estudio de Arquitectura e Interiorismo',
  defaultTitle: 'Despeja la X - Estudio de Arquitectura e Interiorismo',
  defaultDescription: 'Estudio de arquitectura e interiorismo especializado en proyectos residenciales únicos. Transformamos espacios con diseño contemporáneo y funcional.',
  defaultKeywords: 'arquitectura, interiorismo, diseño, reforma, hogar, estudio arquitectura, diseño interior, proyectos residenciales',
  defaultImage: '/brand/dlx-logo-black.png',
  twitterHandle: '@despejalax',
  author: 'Despeja la X',
  language: 'es',
  locale: 'es_ES',
  themeColor: '#F4F3F1',
} as const;

// Page-specific SEO configurations
export const pagesSEO = {
  home: {
    title: 'Inicio - Estudio de Arquitectura e Interiorismo',
    description: 'Descubre nuestros proyectos de arquitectura e interiorismo. Diseñamos espacios únicos que reflejan tu personalidad y estilo de vida.',
    keywords: 'estudio arquitectura, diseño interior, proyectos residenciales, reforma hogar, arquitectura contemporánea',
  },
  projects: {
    title: 'Proyectos - Portafolio de Arquitectura e Interiorismo',
    description: 'Explora nuestro portafolio completo de proyectos de arquitectura e interiorismo. Cada proyecto es único y refleja nuestro compromiso con el diseño excepcional.',
    keywords: 'portafolio arquitectura, proyectos interiorismo, galería proyectos, diseño residencial, reformas integrales, arquitectura española',
  },
} as const;

// Core Web Vitals optimization settings
export const performanceConfig = {
  images: {
    // Critical images that should load immediately
    criticalImages: [
      '/brand/dlx-logo-black.png',
      '/brand/dlx-logo-white.png',
    ],
    // Image sizes for responsive optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Fonts optimization
  fonts: {
    preloadFonts: [
      { href: '/fonts/montserrat/montserrat-latin-400-normal.woff2', as: 'font', type: 'font/woff2' },
      { href: '/fonts/kanit/kanit-latin-600-normal.woff2', as: 'font', type: 'font/woff2' },
    ],
  },
  // Resources to preconnect for better performance
  preconnectDomains: [
    'https://storage.googleapis.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
} as const;
