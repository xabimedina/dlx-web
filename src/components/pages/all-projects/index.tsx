'use client';

import { AllProjects } from '@/components/pages/all-projects/project-sticky';
import { DlxNavbar } from '@xabimedina/dlx-components';
import { NavLinks } from '@/components/nav-links';
import { StickyFooter } from '@/components/sticky-footer';
import type { FooterProject } from '@/components/sticky-footer';
import type { ProjectPortrait } from '@/types/project';
import { HomeProjectStart } from '@/types/texts';

export default function ProjectsPage({
  projects,
  footerProjects,
  texts
}: {
  projects: ProjectPortrait[];
  footerProjects: FooterProject[];
  texts: HomeProjectStart;
}) {
  return (
    <>
      <div className='relative z-[40] bg-smoke'>
        <DlxNavbar type='smoke'>
          <NavLinks />
        </DlxNavbar>
        <main className='flex flex-col gap-10 items-center bg-smoke justify-center min-h-[50vh] pt-14'>
          <div>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase'>{texts['project-start-title']}</h1>
            <p className='uppercase text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mt-5'>{texts['project-start-subtitle']}</p>
          </div>
          <p className='max-w-2xl text-sm sm:text-base md:text-lg text-pretty px-6'>{texts['project-start-description']}</p>
        </main>
        <AllProjects projects={projects} />
      </div>
      <StickyFooter lastProjects={footerProjects} />
    </>
  );
}
