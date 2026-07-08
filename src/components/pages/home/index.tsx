'use client';

import { DlxNavbar } from '@xabimedina/dlx-components';
import { HomePortrait } from './portrait';
import { HomeServices } from './services';
import { ContactSection } from '../../contact-section';
import { ProjectsHome } from '@/components/pages/home/project-sticky';
import { NavLinks } from '@/components/nav-links';
import { StickyFooter } from '@/components/sticky-footer';
import type { FooterProject } from '@/components/sticky-footer';
import type { ProjectPortrait } from '@/types/project';
import type { Home, Services } from '@/types/texts';

export function HomePage({
  portraitProjects,
  footerProjects,
  homeTexts,
  servicesTexts
}: {
  portraitProjects: ProjectPortrait[];
  footerProjects: FooterProject[];
  homeTexts: Home;
  servicesTexts: Services;
}) {

  const contactTexts = {
    'contact-calculator-subtitle': homeTexts['contact-calculator-subtitle'],
    'contact-calculator-title': homeTexts['contact-calculator-title'],
    'contact-consult-subtitle': homeTexts['contact-consult-subtitle'],
    'contact-consult-title': homeTexts['contact-consult-title'],
    'contact-interior-subtitle': homeTexts['contact-interior-subtitle'],
    'contact-interior-title': homeTexts['contact-interior-title'],
  };
  const startTexts = {
    'start-subtitle': homeTexts['start-subtitle'],
    'start-title': homeTexts['start-title'],
  };


  return (
    <>
      <div className='relative z-[40] bg-smoke'>
        <DlxNavbar>
          <NavLinks />
        </DlxNavbar>
        <HomePortrait texts={startTexts} />
        <main className='scroll-smooth snap-y snap-mandatory'>
          <HomeServices texts={servicesTexts} />
        </main>
        <ProjectsHome projects={portraitProjects} />
        <ContactSection texts={contactTexts} />
      </div>
      <StickyFooter lastProjects={footerProjects} />
    </>
  );
}
