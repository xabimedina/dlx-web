import { getAllProjects, getFooterProjects, getProjectById, getProjectBySlug, getWebTexts } from '@/server/firebase/api';
import { notFound, permanentRedirect } from 'next/navigation';
import ProjectPage from '@/components/pages/project';
import { StructuredData, generateProjectSchema, generateBreadcrumbSchema } from '@/components/structured-data';

import type { Metadata } from 'next';

export const revalidate = 1800;
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map(project => ({
    slug: String(project.slug),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug) ?? await getProjectById(slug);

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
      url: `https://www.despejalax.es/proyectos/${project.slug}`,
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
      canonical: `/proyectos/${project.slug}`,
    },
  };
}

export default async function Proyecto({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let project = await getProjectBySlug(slug);

  if (!project) {
    const legacyProject = await getProjectById(slug);

    if (legacyProject?.slug && legacyProject.slug !== slug) {
      permanentRedirect(`/proyectos/${legacyProject.slug}`);
    }

    project = legacyProject;
  }

  if (!project) {
    return notFound();
  }

  const [{ home }, footerProjects] = await Promise.all([
    getWebTexts(),
    getFooterProjects(),
  ]);

  const contactTexts = {
    'contact-calculator-subtitle': home['contact-calculator-subtitle'],
    'contact-calculator-title': home['contact-calculator-title'],
    'contact-consult-subtitle': home['contact-consult-subtitle'],
    'contact-consult-title': home['contact-consult-title'],
    'contact-interior-subtitle': home['contact-interior-subtitle'],
    'contact-interior-title': home['contact-interior-title'],
  };

  const breadcrumbItems = [
    { name: 'Proyectos', url: '/proyectos' },
    { name: project.name, url: `/proyectos/${project.slug}` }
  ];

  return (
    <>
      <StructuredData data={generateProjectSchema(project)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <ProjectPage
        project={project}
        footerProjects={footerProjects}
        texts={contactTexts}
      />
    </>
  );
}
