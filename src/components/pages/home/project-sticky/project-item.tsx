import { DlxParagraph } from '@xabimedina/dlx-components';
import { ProjectStickyContainer } from '@/components/project-sticky-container';
import { DlxLink } from '@/components/pages/dlx-link';
import { Z_INDEX_CLASSES } from '@/constants';
import { useIntersectionAnimation } from '@/hooks/use-intersection-animation';
import Image from 'next/image';
import { getProjectsWithMetadata } from '.';
import { animations, initialStates } from '@/lib/gsap';

export const ProjectItem = ({ 
  project, 
  index 
}: { 
  project: ReturnType<typeof getProjectsWithMetadata>[0]; 
  index: number;
}) => {
  // Hooks de animación para cada elemento
  const linkRef = useIntersectionAnimation<HTMLAnchorElement>({
    initialState: initialStates.fadeInUp,
    animation: animations.fadeInUp,
    delay: index * 0.1,
    threshold: 0.3,
  });

  const paragraphRef = useIntersectionAnimation<HTMLDivElement>({
    initialState: initialStates.fadeInUp,
    animation: animations.fadeInUp,
    delay: index * 0.1 + 0.2,
    threshold: 0.3,
  });

  const imageRef = useIntersectionAnimation<HTMLDivElement>({
    initialState: initialStates.slideInFromLeft,
    animation: animations.slideInFromLeft,
    delay: index * 0.1 + 0.4,
    threshold: 0.2,
  });

  return (
    <ProjectStickyContainer
      className={`${Z_INDEX_CLASSES[index] ?? 'z-50'} ${project.background}`}
      key={`${project.name}-${index}`}
    >
      <article className='h-[80vh]'>
        <div className='z-10 absolute h-6/12 left-20 md:left-30 top-1/2 -translate-y-1/2 space-y-[28%]'>
          <DlxLink
            ref={linkRef}
            className='text-6xl md:text-[8rem] tracking-widest uppercase font-bold font-kanit'
            href={`/proyectos/${project.id}`}
          >
            {project.name}
          </DlxLink>
          
          <div ref={paragraphRef}>
            <DlxParagraph
              color={project.color}
              borderColor={project.borderColor}
            >
              <p className='max-w-3xs text-lg md:text-xl font-semibold mt-24'>
                {project.subName}
              </p>
            </DlxParagraph>
          </div>
        </div>

        <a
          href={`/proyectos/${project.id}`}
          className='w-full md:w-5/12 h-[80vh] absolute -right-0 top-1/2 -translate-y-1/2'
        >
          <div ref={imageRef} className="w-full h-full relative">
            <Image
              src={project.portrait}
              alt={`Retrato para el proyecto ${project.name}`}
              className='object-cover'
              fill
              unoptimized
            />
            {/* Overlay solo en móvil */}
            <div className="absolute inset-0 bg-neutral-400/40 backdrop-blur-xs md:hidden"></div>
          </div>
        </a>
      </article>
    </ProjectStickyContainer>
  );
};
