import { getAllProjects } from '@/server/firebase/api';
import ProjectsPage from '@/components/pages/all-projects';

export const revalidate = 3600; // invalidate every hour

export default async function Proyectos() {
  const projects = await getAllProjects();

  return <ProjectsPage projects={projects} />;
}
