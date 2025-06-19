import { HomePage } from '@/components/pages/home';
import { getPortraitProjects } from '@/server/firebase/api';

export const revalidate = 3600; // invalidate every hour

export default async function Inicio() {
  const projects = await getPortraitProjects();
  const portraitProjects = projects.map(project => ({
    name: project.name,
    description: project.description,
    portrait: project.portrait,
  }));

  return <HomePage portraitProjects={portraitProjects} />;
}
