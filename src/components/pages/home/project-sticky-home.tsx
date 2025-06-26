import { DlxParagraph } from 'dlx-components';
import { ProjectStickyContainer } from '@/components/project-sticky-container';
import { DlxLink } from '@/components/pages/dlx-link';
import type { ProjectPortrait } from '@/types/project';
import { Z_INDEX_CLASSES, BACKGROUND_MAP_STYLES } from '@/constants';
import Image from 'next/image';

type ProjectsProps = {
  projects: ProjectPortrait[];
};

const getProjectsWithMetadata = (projects: ProjectPortrait[]) => {
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
      {projectsWithMetadata.map((project, index) => {
        return (
          <ProjectStickyContainer
            className={`${Z_INDEX_CLASSES[index] ?? 'z-50'} ${
              project.background
            }`}
            key={`${project.name}-${index}`}
          >
            <article className='h-[80vh]'>
              <div className='absolute h-6/12 left-30 top-1/2 -translate-y-1/2 space-y-[28%]'>
                <DlxLink
                  className='text-[8rem] tracking-widest uppercase font-bold font-kanit'
                  href={`/proyectos/${project.id}`}
                >
                  {project.name}
                </DlxLink>
                <DlxParagraph
                  color={project.color}
                  borderColor={project.borderColor}
                >
                  <p className='max-w-md text-xl mt-24'>
                    {project.description}
                  </p>
                </DlxParagraph>
              </div>

              <a
                href='#'
                className='w-4/12 h-6/12 absolute -right-0 top-1/2 -translate-y-1/2'
              >
                <Image
                  src={project.portrait}
                  alt={`Retrato para el proyecto ${project.name}`}
                  className='object-cover'
                  fill
                />
              </a>
            </article>
          </ProjectStickyContainer>
        );
      })}
    </div>
  );
};
