'use client';

import type { ProjectPortrait } from '@/types/project';
import { ProjectItem } from './project-item';

type ProjectsProps = {
  projects: ProjectPortrait[];
};

export const getProjectsWithMetadata = (projects: ProjectPortrait[]) => {
  if (!projects?.length) return [];

  return projects.map((project: ProjectPortrait) => ({
    ...project,
    color: `text-${project.color}`,
    background: `bg-[url(${project.portrait})]`,
    alt: `Imagen de proyecto Despeja la X - ${project.name}`,
  }));
};

export const AllProjects = ({ projects }: ProjectsProps) => {
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
