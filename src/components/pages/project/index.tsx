'use client';

import { DlxNavbar, DlxFooter } from '@xabimedina/dlx-components';
import { ProjectGallery } from '@/components/pages/project/gallery';
import { NavLinks } from '@/components/nav-links';
import { ContactSection } from '@/components/contact-section';
import type { Project } from '@/types/project';
import { ProjectPortrait } from './portrait';

export default function ProjectPage({ project }: { project: Project }) {
  return (
    <>
      <DlxNavbar type='smoke'>
        <NavLinks />
      </DlxNavbar>
      <main className='min-h-screen bg-smoke py-8'>
        {/* Header */}
        <header className='pt-24 pb-12'>
          <div className='max-w-6xl mx-auto'>
            <h1 className='text-center text-9xl font-kanit font-bold text-jet tracking-widest'>
              {project.name}
            </h1>
          </div>
        </header>
        <ProjectPortrait image={project.portrait} />

        {/* Project Details */}
        <section className='px-4 mb-12'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8 text-center'>
              <div>
                <h3 className='text-sm font-medium text-jet-foreground mb-2'>
                  Tipo de Proyecto
                </h3>
                <p className='text-lg font-semibold text-jet'>
                  {project.workType.name}
                </p>
              </div>
              <div>
                <h3 className='text-sm font-medium text-jet-foreground mb-2'>
                  Estilo
                </h3>
                <p className='text-lg font-semibold text-jet'>
                  {project.projectStyle.name}
                </p>
              </div>
              <div>
                <h3 className='text-sm font-medium text-jet-foreground mb-2'>
                  Ubicación
                </h3>
                <p className='text-lg font-semibold text-jet'>
                  {project.location}
                </p>
              </div>
              <div>
                <h3 className='text-sm font-medium text-jet-foreground mb-2'>
                  m²
                </h3>
                <p className='text-lg font-semibold text-jet'>{project.area}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className='px-4 mb-12'>
          <div className='max-w-4xl mx-auto'>
            <p className='text-gray-700 leading-relaxed text-center'>
              {project.description}
            </p>
          </div>
        </section>

        <ProjectGallery images={project.images} />
      </main>
      <ContactSection />
      <DlxFooter />
    </>
  );
}
