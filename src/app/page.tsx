import { HomePage } from '@/components/pages/home';
import { getPortraitProjects } from '@/server/firebase/api';

export const revalidate = 7200; // invalidate every 2 hours

export default async function Inicio() {
  const projects = await getPortraitProjects();
  const portraitProjects = projects.map(project => ({
    name: project.name,
    description: project.description,
    portrait: project.portrait,
    color: project.color,
    id: project.id,
  }));

  return <HomePage portraitProjects={portraitProjects} />;
}
