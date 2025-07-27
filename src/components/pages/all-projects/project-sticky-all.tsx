'use client';

import { DlxLink } from '../dlx-link';
import { ProjectStickyContainer } from '@/components/project-sticky-container';
import type { ProjectPortrait } from '@/types/project';
import { Z_INDEX_CLASSES } from '@/constants';

type ProjectsProps = {
  projects: ProjectPortrait[];
};

const getProjectsWithMetadata = (projects: ProjectPortrait[]) => {
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
      {projectsWithMetadata.map((project, index) => {
        return (
          <ProjectStickyContainer
            className={`${Z_INDEX_CLASSES[index] ?? 'z-50'}`}
            key={`${project.name}-${index}`}
          >
            <article
              className=' group relative h-[70vh] w-full overflow-hidden 
                         before:absolute before:inset-0 before:bg-jet before:opacity-35 before:z-10 
                         hover:before:opacity-20 
                         before:transition-opacity before:duration-500'
            >
              <div
                style={{ backgroundImage: `url(${project.portrait})` }}
                className='absolute inset-0 h-full w-full bg-cover bg-center 
                           transition-transform duration-500 ease-in-out 
                           group-hover:scale-105' // Usamos group-hover si el hover es en el padre
              ></div>

              <div className='relative z-20 flex justify-center items-center h-full w-full'>
                <h2
                  className={`cursor-pointer text-[12rem] font-bold font-kanit uppercase tracking-widest ${project.color}`}
                >
                  <DlxLink href={`/proyectos/${project.id}`}>
                    {project.name}
                  </DlxLink>
                </h2>
              </div>
            </article>
          </ProjectStickyContainer>
        );
      })}
    </div>
  );
};
