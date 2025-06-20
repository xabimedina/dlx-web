import { getAllProjects } from '@/server/firebase/api';
import ProjectsPage from '@/components/pages/all-projects';

export const revalidate = 7200; // invalidate every 2 hours

export default async function Proyectos() {
  const projects = await getAllProjects();
  const portraitProjects = projects.map(project => ({
    name: project.name,
    description: project.description,
    portrait: project.portrait,
    color: project.color,
    id: project.id,
  }));

  return <ProjectsPage projects={portraitProjects} />;
}
