import { getAllProjects, getProjectById } from '@/server/firebase/api';
import { notFound } from 'next/navigation';
import ProjectPage from '@/components/pages/project';

export const revalidate = 7200;
export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map(project => ({
    id: String(project.id),
  }));
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

  return <ProjectPage project={project} />;
}
