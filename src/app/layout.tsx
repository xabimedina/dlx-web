import type { Metadata } from 'next';
import { montserrat, kanit } from '@/assets/fonts';
import '@/assets/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Despeja la X - Estudio de Arquitectura e Interiorismo',
    template: '%s | Despeja la X'
  },
  description: 'Estudio de arquitectura e interiorismo especializado en proyectos residenciales únicos. Transformamos espacios con diseño contemporáneo y funcional.',
  keywords: 'arquitectura, interiorismo, diseño, reforma, hogar, estudio arquitectura, diseño interior, proyectos residenciales',
  authors: [{ name: 'Despeja la X' }],
  creator: 'Despeja la X',
  publisher: 'Despeja la X',
  metadataBase: new URL('https://www.despejalax.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.despejalax.com',
    siteName: 'Despeja la X',
    title: 'Despeja la X - Estudio de Arquitectura e Interiorismo',
    description: 'Estudio de arquitectura e interiorismo especializado en proyectos residenciales únicos. Transformamos espacios con diseño contemporáneo y funcional.',
    images: [
      {
        url: '/brand/dlx-logo-black.png',
        width: 1200,
        height: 630,
        alt: 'Despeja la X - Estudio de Arquitectura e Interiorismo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Despeja la X - Estudio de Arquitectura e Interiorismo',
    description: 'Estudio de arquitectura e interiorismo especializado en proyectos residenciales únicos.',
    images: ['/brand/dlx-logo-black.png'],
    creator: '@despejalax',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <head>
        {/* Preconnect para optimización de rendimiento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://storage.googleapis.com" />
        
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme colors */}
        <meta name="theme-color" content="#F4F3F1" />
        <meta name="msapplication-TileColor" content="#F4F3F1" />
        
        {/* Viewport optimizado */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${montserrat.variable} ${kanit.variable} antialiased `}>
        {children}
      </body>
    </html>
  );
}
