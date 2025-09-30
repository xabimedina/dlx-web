'use client';

import Image from 'next/image';
import { DlxLink } from '../../dlx-link';
import { ProjectStickyContainer } from '@/components/project-sticky-container';
import { useIntersectionAnimation } from '@/hooks/use-intersection-animation';
import { Z_INDEX_CLASSES } from '@/constants';
import { getProjectsWithMetadata } from '.';
import { animations, initialStates } from '@/lib/gsap';
import { BLUR_DATA_URL } from '@/constants';
// Componente individual para cada proyecto con animaciones
export function ProjectItem({
  project,
  index
}: {
  project: ReturnType<typeof getProjectsWithMetadata>[number],
  index: number
}) {

  const titleRef = useIntersectionAnimation<HTMLHeadingElement>({
    initialState: initialStates.fadeInUp,
    animation: animations.fadeInUp,
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
        <Image
          src={project.portrait}
          alt={`Proyecto ${project.name}`}
          fill
          className='object-cover transition-transform duration-500 ease-in-out 
                     group-hover:scale-105'
          priority={index < 2}
          placeholder="blur"
    blurDataURL={BLUR_DATA_URL}
        />

        <div className='relative z-20 flex flex-col gap-14 justify-center items-center h-full w-full'>
          <h2
            ref={titleRef}
            className={`cursor-pointer text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold font-kanit uppercase tracking-widest ${project.color}`}
          >
            <DlxLink href={`/proyectos/${project.id}`}>
              {project.name}
            </DlxLink>
          </h2>
          <p className={`px-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-2xl text-center font-normal uppercase ${project.color}`}>{project.subName}</p>
        </div>
      </article>
    </ProjectStickyContainer>
  );
}
