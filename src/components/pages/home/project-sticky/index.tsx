
import type { ProjectPortrait } from '@/types/project';
import { BACKGROUND_MAP_STYLES } from '@/constants';
import { ProjectItem } from './project-item';

type ProjectsProps = {
  projects: ProjectPortrait[];
};

export const getProjectsWithMetadata = (projects: ProjectPortrait[]) => {
  if (!projects?.length) return [];

  return projects.map((project: ProjectPortrait, index: number) => {
    return {
      ...project,
      index,
      isFirst: index === 0,
      isLast: index === projects.length - 1,
      zIndex: Math.min(index + 1, 50),
      background: BACKGROUND_MAP_STYLES[index].background,
      color: BACKGROUND_MAP_STYLES[index].paragraph.color,
      borderColor: BACKGROUND_MAP_STYLES[index].paragraph.borderColor,
      subName: project.subName || '',
      alt: `Imagen de proyecto Despeja la X - ${project.name}`,
    };
  });
};

export const ProjectsHome = ({ projects }: ProjectsProps) => {
  if (!projects || projects.length === 0) {
    return null;
  }

  const projectsWithMetadata = getProjectsWithMetadata(projects);

  return (
    <div className='relative z-[2]'>
      {projectsWithMetadata.map((project, index) => (
        <ProjectItem 
          key={`${project.name}-${index}`}
          project={project} 
          index={index} 
        />
      ))}
    </div>
  );
};
