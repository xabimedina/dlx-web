import { getAllProjects } from '@/server/firebase/api';
import ProjectsPage from '@/components/pages/all-projects';
import { StructuredData, generateBreadcrumbSchema } from '@/components/structured-data';

import type { Metadata } from 'next';

export const revalidate = 1800; // revalidate every 30 minutes (menos que la expiración de 1 hora)

export const metadata: Metadata = {
  title: 'Proyectos - Portafolio de Arquitectura e Interiorismo',
  description: 'Explora nuestro portafolio completo de proyectos de arquitectura e interiorismo. Cada proyecto es único y refleja nuestro compromiso con el diseño excepcional.',
  keywords: 'portafolio arquitectura, proyectos interiorismo, galería proyectos, diseño residencial, reformas integrales, arquitectura española',
  openGraph: {
    title: 'Proyectos - Portafolio Despeja la X',
    description: 'Explora nuestro portafolio completo de proyectos de arquitectura e interiorismo únicos.',
    url: 'https://www.despejalax.com/proyectos',
    images: [
      {
        url: '/images/portada.jpg',
        width: 1200,
        height: 630,
        alt: 'Portafolio de Proyectos - Despeja la X',
      },
    ],
  },
  twitter: {
    title: 'Proyectos - Portafolio Despeja la X',
    description: 'Explora nuestro portafolio completo de proyectos de arquitectura e interiorismo únicos.',
    images: ['/images/portada.jpg'],
  },
  alternates: {
    canonical: '/proyectos',
  },
};

export default async function Proyectos() {
  const projects = await getAllProjects();
  const portraitProjects = projects.map(project => ({
    name: project.name,
    description: project.description,
    portrait: project.portrait,
    color: project.color,
    id: project.id,
    subName: project.subName,
  }));

  const breadcrumbItems = [
    { name: 'Proyectos', url: '/proyectos' }
  ];

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <ProjectsPage projects={portraitProjects} />
    </>
  );
}
