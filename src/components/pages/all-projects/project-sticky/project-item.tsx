'use client';

import { DlxLink } from '../../dlx-link';
import { ProjectStickyContainer } from '@/components/project-sticky-container';
import { useIntersectionAnimation } from '@/hooks/use-intersection-animation';
import { Z_INDEX_CLASSES } from '@/constants';
import { getProjectsWithMetadata } from '.';

// Componente individual para cada proyecto con animaciones
export function ProjectItem({ 
  project, 
  index 
}: { 
  project: ReturnType<typeof getProjectsWithMetadata>[number], 
  index: number 
}) {

  const titleRef = useIntersectionAnimation<HTMLHeadingElement>({
    animation: 'fadeInUp',
    threshold: 0.3,
    delay: 0.1,
  });

  return (
    <ProjectStickyContainer
      className={`${Z_INDEX_CLASSES[index] ?? 'z-50'}`}
    >
      <article
        className='group relative h-[70vh] w-full overflow-hidden 
                   before:absolute before:inset-0 before:bg-jet before:opacity-35 before:z-10 
                   hover:before:opacity-20 
                   before:transition-opacity before:duration-500'
      >
        <div
          style={{ backgroundImage: `url(${project.portrait})` }}
          className='absolute inset-0 h-full w-full bg-cover bg-center 
                     transition-transform duration-500 ease-in-out 
                     group-hover:scale-105'
        ></div>

        <div className='relative z-20 flex justify-center items-center h-full w-full'>
          <h2
            ref={titleRef}
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
}
