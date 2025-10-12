import { getAllProjects, getProjectById } from '@/server/firebase/api';
import { notFound } from 'next/navigation';
import ProjectPage from '@/components/pages/project';
import { StructuredData, generateProjectSchema, generateBreadcrumbSchema } from '@/components/structured-data';

import type { Metadata } from 'next';

export const revalidate = 1800;
export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map(project => ({
    id: String(project.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
      description: 'El proyecto que buscas no existe o ha sido eliminado.',
    };
  }

  const cleanDescription = project.description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 160); // Limit description length

  return {
    title: `${project.name} - ${project.workType.name} ${project.projectStyle.name}`,
    description: `Proyecto de ${project.workType.name.toLowerCase()} en ${project.location}. ${cleanDescription}`,
    keywords: `${project.name}, ${project.workType.name}, ${project.projectStyle.name}, ${project.location}, arquitectura, interiorismo, proyecto residencial`,
    openGraph: {
      title: `${project.name} - Proyecto de ${project.workType.name}`,
      description: `${project.workType.name} en ${project.location}. ${cleanDescription}`,
      url: `https://www.despejalax.com/proyectos/${project.id}`,
      images: [
        {
          url: project.portrait,
          width: 1200,
          height: 630,
          alt: `${project.name} - ${project.workType.name} ${project.projectStyle.name}`,
        },
      ],
      type: 'article',
    },
    twitter: {
      title: `${project.name} - Proyecto de ${project.workType.name}`,
      description: `${project.workType.name} en ${project.location}. ${cleanDescription}`,
      images: [project.portrait],
      card: 'summary_large_image',
    },
    alternates: {
      canonical: `/proyectos/${project.id}`,
    },
  };
}

export default async function Proyecto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return notFound();
  }

  const breadcrumbItems = [
    { name: 'Proyectos', url: '/proyectos' },
    { name: project.name, url: `/proyectos/${project.id}` }
  ];

  return (
    <>
      <StructuredData data={generateProjectSchema(project)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <ProjectPage project={project} />
    </>
  );
}
