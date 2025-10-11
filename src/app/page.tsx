import { HomePage } from '@/components/pages/home';
import { getPortraitProjects } from '@/server/firebase/api';
import { StructuredData, organizationSchema, websiteSchema } from '@/components/structured-data';
import type { Metadata } from 'next';

export const revalidate = 14400; // invalidate every 4 hours

export const metadata: Metadata = {
  title: 'Despeja la X | Estudio de Arquitectura e Interiorismo',
  description: 'Descubre nuestros proyectos de arquitectura e interiorismo. Diseñamos espacios únicos que reflejan tu personalidad y estilo de vida.',
  keywords: 'estudio arquitectura, diseño interior, proyectos residenciales, reforma hogar, arquitectura contemporánea',
  openGraph: {
    title: 'Despeja la X - Proyectos de Arquitectura e Interiorismo',
    description: 'Descubre nuestros proyectos únicos de arquitectura e interiorismo que transforman espacios.',
    url: 'https://www.despejalax.com',
    images: [
      {
        url: '/brand/dlx-logo-black.png',
        width: 1200,
        height: 630,
        alt: 'Despeja la X - Proyectos de Arquitectura',
      },
    ],
  },
  twitter: {
    title: 'Despeja la X - Proyectos de Arquitectura e Interiorismo',
    description: 'Descubre nuestros proyectos únicos de arquitectura e interiorismo que transforman espacios.',
    images: ['/brand/dlx-logo-black.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default async function Inicio() {
  const projects = await getPortraitProjects();
  const portraitProjects = projects.map(project => ({
    name: project.name,
    description: project.description,
    portrait: project.portrait,
    color: project.color,
    id: project.id,
    subName: project.subName,
  }));

  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <HomePage portraitProjects={portraitProjects} />
    </>
  );
}
