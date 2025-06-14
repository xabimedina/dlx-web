import { DlxParagraph } from 'dlx-components';
import { ProjectStickyContainer } from './project-sticky-container';
import { DlxLink } from 'dlx-components';

type Project = {
  title: string;
  description: string;
  portrait: string; // URL de la imagen
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

const backgroundMapStyles = [
  {
    background: 'bg-jet text-smoke',
    paragraph: {
      color: 'smoke',
      borderColor: 'smoke',
    },
  },
  {
    background: 'bg-saffron text-jet',
    paragraph: {
      color: 'jet',
      borderColor: 'jet',
    },
  },
  {
    background: 'bg-smoke text-jet',
    paragraph: {
      color: 'jet',
      borderColor: 'saffron',
    },
  },
] as const;

const getProjectsWithMetadata = (projects: Project[]) => {
  if (!projects?.length) return [];

  return projects.map((project: Project, index: number) => ({
    ...project,
    index,
    isFirst: index === 0,
    isLast: index === projects.length - 1,
    zIndex: Math.min(index + 1, 50),
    background: backgroundMapStyles[index].background,
    color: backgroundMapStyles[index].paragraph.color,
    borderColor: backgroundMapStyles[index].paragraph.borderColor,
    alt: `Imagen de proyecto Despeja la X - ${project.title}`,
  }));
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
            className={`${zIndexClasses[index] ?? 'z-50'} ${
              project.background
            }`}
            key={`${project.title}-${index}`}
          >
            <article className='h-[80vh]'>
              <div className='absolute h-6/12 left-30 top-1/2 -translate-y-1/2 space-y-[28%]'>
                <DlxLink
                  className='text-[8rem] tracking-widest uppercase font-bold font-kanit'
                  href='#'
                >
                  {project.title}
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
                <img
                  src={project.portrait}
                  alt={`Retrato para el proyecto ${project.title}`}
                  className='object-cover w-full h-full'
                />
              </a>
            </article>
          </ProjectStickyContainer>
        );
      })}
    </div>
  );
};
