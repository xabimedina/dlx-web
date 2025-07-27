'use client';

import { DlxNavbar } from '@xabimedina/dlx-components';
import { DlxFooter } from '@xabimedina/dlx-components';
import { HomePortrait } from './portrait';
import { HomeServices } from './services';
import { ContactSection } from '../../contact-section';
import { ProjectsHome } from '@/components/pages/home/project-sticky-home';
import { NavLinks } from '@/components/nav-links';
import type { ProjectPortrait } from '@/types/project';

export function HomePage({
  portraitProjects,
}: {
  portraitProjects: ProjectPortrait[];
}) {
  return (
    <>
      <DlxNavbar>
        <NavLinks />
      </DlxNavbar>
      <HomePortrait />
      <main className='scroll-smooth snap-y snap-mandatory'>
        <HomeServices />
      </main>
      <ProjectsHome projects={portraitProjects} />
      <ContactSection />
      <DlxFooter />
    </>
  );
}
