import { getAllProjects } from '@/server/firebase/api';
import ProjectsPage from '@/components/pages/all-projects';

export const revalidate = 1800; // revalidate every 30 minutes (menos que la expiración de 1 hora)

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

  return <ProjectsPage projects={portraitProjects} />;
}
