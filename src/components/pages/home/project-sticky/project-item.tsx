import { DlxParagraph } from '@xabimedina/dlx-components';
import { ProjectStickyContainer } from '@/components/project-sticky-container';
import { DlxLink } from '@/components/pages/dlx-link';
import { Z_INDEX_CLASSES } from '@/constants';
import { useIntersectionAnimation } from '@/hooks/use-intersection-animation';
import Image from 'next/image';
import { getProjectsWithMetadata } from '.';

export const ProjectItem = ({ 
  project, 
  index 
}: { 
  project: ReturnType<typeof getProjectsWithMetadata>[0]; 
  index: number;
}) => {
  // Hooks de animación para cada elemento
  const linkRef = useIntersectionAnimation<HTMLAnchorElement>({
    animation: 'fadeInUp',
    delay: index * 0.1,
    threshold: 0.3,
  });

  const paragraphRef = useIntersectionAnimation<HTMLDivElement>({
    animation: 'fadeInUp',
    delay: index * 0.1 + 0.2,
    threshold: 0.3,
  });

  const imageRef = useIntersectionAnimation<HTMLDivElement>({
    animation: 'slideInFromLeft',
    delay: index * 0.1 + 0.4,
    threshold: 0.2,
  });

  return (
    <ProjectStickyContainer
      className={`${Z_INDEX_CLASSES[index] ?? 'z-50'} ${project.background}`}
      key={`${project.name}-${index}`}
    >
      <article className='h-[80vh]'>
        <div className='absolute h-6/12 left-30 top-1/2 -translate-y-1/2 space-y-[28%]'>
          <DlxLink
            ref={linkRef}
            className='text-[8rem] tracking-widest uppercase font-bold font-kanit'
            href={`/proyectos/${project.id}`}
          >
            {project.name}
          </DlxLink>
          
          <div ref={paragraphRef}>
            <DlxParagraph
              color={project.color}
              borderColor={project.borderColor}
            >
              <p className='max-w-md text-xl mt-24'>
                {project.description}
              </p>
            </DlxParagraph>
          </div>
        </div>

        <a
          href='#'
          className='w-4/12 h-6/12 absolute -right-0 top-1/2 -translate-y-1/2'
        >
          <div ref={imageRef} className="w-full h-full">
            <Image
              src={project.portrait}
              alt={`Retrato para el proyecto ${project.name}`}
              className='object-cover'
              fill
            />
          </div>
        </a>
      </article>
    </ProjectStickyContainer>
  );
};
