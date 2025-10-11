'use client';

import { AllProjects } from '@/components/pages/all-projects/project-sticky';
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
      <main className='flex flex-col gap-10 items-center bg-smoke justify-center min-h-[50vh] pt-14'>
        <div>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase'>DESPEJA TUS DUDAS</h1>
          <p className='uppercase text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mt-5'>y encontremos la solución</p>
        </div>
        <p className='max-w-2xl text-sm sm:text-base md:text-lg text-pretty px-6'>Cada proyecto une diseño funcional con atención al detalle, creando hogares que responden a la vida real de quienes lo habitan.</p>
      </main>
      <AllProjects projects={projects} />
      <DlxFooter showSocialMedia={false} />
    </>
  );
}
