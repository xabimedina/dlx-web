'use client';

import { AllProjects } from '@/components/pages/all-projects/project-sticky-all';
import { DlxNavbar } from '@xabimedina/dlx-components';
import { DlxFooter } from '@xabimedina/dlx-components';
import { NavLinks } from '@/components/nav-links';
import type { ProjectPortrait } from '@/types/project';

export default function ProjectsPage({
  projects,
}: {
  projects: ProjectPortrait[];
}) {
  return (
    <>
      <DlxNavbar type='smoke'>
        <NavLinks />
      </DlxNavbar>
      <main className='flex items-center bg-smoke justify-center h-96 py-12'>
        <h1 className='text-7xl font-bold'>DESPEJA TUS DUDAS</h1>
      </main>
      <AllProjects projects={projects} />
      <DlxFooter />
    </>
  );
}
