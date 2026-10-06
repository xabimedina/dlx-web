'use client';

import { DlxNavbar } from '@xabimedina/dlx-components';
import { ProjectGallery } from '@/components/pages/project/gallery';
import { NavLinks } from '@/components/nav-links';
import { ContactSection } from '@/components/contact-section';
import { StickyFooter } from '@/components/sticky-footer';
import type { Project } from '@/types/project';
import type { FooterProject } from '@/components/sticky-footer';
import { ProjectPortrait } from './portrait';
import { HomeContact } from '@/types/texts';
import { trackProjectView } from '@/lib/analytics';
import { useEffect } from 'react';

const PROJECT_CREDITS: Record<string, string> = {
  w0dsQwdUym5BMjDk84Sx:
    'Casa Savoy, La Roqueta (Valencia). Proyecto y dirección de obra: Xabi Medina, en Kaleidoscope, 2021. Fotografías de María Gabriela Roncal (@imroncal) para Despeja la X, con autorización de los propietarios.',
  x8MfJiHjyZAGndPLVtM1:
    'Casa Alba, Mestalla (Valencia). Proyecto y dirección de obra: Xabi Medina, en Kaleidoscope, 2021. Fotografías de María Gabriela Roncal (@imroncal) para Despeja la X, con autorización de los propietarios.',
};

export default function ProjectPage({
  project,
  footerProjects,
  texts,
}: {
  project: Project;
  footerProjects: FooterProject[];
  texts: HomeContact;
}) {
  useEffect(() => {
    trackProjectView({
      projectId: project.id,
      projectName: project.name,
      workType: project.workType.name,
      projectStyle: project.projectStyle.name,
      location: project.location,
      area: project.area,
    });
  }, [project]);

  return (
    <>
      <div className='relative z-[40] bg-smoke'>
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
          {PROJECT_CREDITS[project.id] && (
            <p className='mx-auto max-w-3xl px-4 pt-12 pb-4 text-center text-xs leading-relaxed text-jet/60'>
              {PROJECT_CREDITS[project.id]}
            </p>
          )}
        </main>
        <ContactSection texts={texts} />
      </div>
      <StickyFooter lastProjects={footerProjects} />
    </>
  );
}
