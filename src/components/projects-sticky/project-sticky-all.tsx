'use client';

import { DlxLink } from 'dlx-components';
import { ProjectStickyContainer } from './project-sticky-container';

type Project = {
  title: string;
  description: string;
  portrait: string;
};

type ProjectsProps = {
  projects: Project[];
};

const zIndexClasses = [
  'z-[1]',
  'z-[2]',
  'z-[3]',
  'z-[4]',
  'z-[5]',
  'z-[6]',
  'z-[7]',
  'z-[8]',
  'z-[9]',
  'z-[10]',
  'z-[11]',
  'z-[12]',
  'z-[13]',
  'z-[14]',
  'z-[15]',
];

const getProjectsWithMetadata = (projects: Project[]) => {
  if (!projects?.length) return [];

  return projects.map((project: Project, index: number) => ({
    ...project,
    background: `bg-[url(${project.portrait})]`,
    alt: `Imagen de proyecto Despeja la X - ${project.title}`,
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
            className={`${zIndexClasses[index] ?? 'z-50'}`}
            key={`${project.title}-${index}`}
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
                <h2 className='cursor-pointer text-[12rem] font-bold font-kanit uppercase tracking-widest text-smoke'>
                  <DlxLink href='#'>{project.title}</DlxLink>
                </h2>
              </div>
            </article>
          </ProjectStickyContainer>
        );
      })}
    </div>
  );
};
