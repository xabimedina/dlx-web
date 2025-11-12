'use client';

import { DlxNavbar, DlxFooter } from '@xabimedina/dlx-components';
import { ProjectGallery } from '@/components/pages/project/gallery';
import { NavLinks } from '@/components/nav-links';
import { ContactSection } from '@/components/contact-section';
import type { Project } from '@/types/project';
import { ProjectPortrait } from './portrait';
import { HomeContact } from '@/types/texts';

export default function ProjectPage({ project, texts }: { project: Project, texts: HomeContact }) {
  return (
    <>
      <DlxNavbar type='smoke'>
        <NavLinks />
      </DlxNavbar>
      <main className='min-h-screen bg-smoke py-8'>
        {/* Header */}
        <header className='pt-24 pb-12'>
          <div className='max-w-6xl mx-auto'>
            <h1 className='text-center text-7xl md:text-8xl lg:text-9xl font-kanit font-bold text-jet tracking-widest'>
              {project.name}
            </h1>
          </div>
        </header>
        <ProjectPortrait info={{
          workType: project.workType.name,
          projectStyle: project.projectStyle.name,
          location: project.location,
          area: project.area.toString(),
        }} image={project.portrait} />

        {/* Description */}
        <section className='px-4 mb-12 py-12'>
          <div className='max-w-4xl mx-auto'>
            <div 
              className='text-jet leading-relaxed space-y-3 px-2'
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>
        </section>

        <ProjectGallery images={project.images} />
      </main>
      <ContactSection texts={texts} />
      <DlxFooter showSocialMedia={false} />
    </>
  );
}
