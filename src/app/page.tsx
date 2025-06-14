'use client';
import { DlxNavbar, DlxFooter } from 'dlx-components';
import { ProjectsHome } from '@/components/projects-sticky/project-sticky-home';
import { AllProjects } from '@/components/projects-sticky/project-sticky-all';
import { HomePortrait } from '@/components/pages/home/portrait';
import { HomeServices } from '@/components/pages/home/services';
import { ContactSection } from '@/components/pages/home/contact-section';

const sampleProjects = [
  {
    id: '123456',
    title: 'RMNC',
    description:
      'Una innovadora plataforma de análisis de datos que utiliza IA para predecir tendencias del mercado.',
    portrait: '/images/RNMC.jpg',
  },
  {
    id: 'MGJA',
    title: 'MGJA',
    description:
      'Desarrollo de una aplicación móvil para la gestión de comunidades locales y eventos.',
    portrait: '/images/MGJA.jpg',
  },
  {
    id: 'XMYN',
    title: 'XMYN',
    description:
      'Un sistema de e-commerce descentralizado construido sobre tecnología blockchain para mayor seguridad.',
    portrait: '/images/XMYN.jpg',
  },
];

export default function Home() {
  return (
    <>
      <DlxNavbar />
      <HomePortrait />
      <main className='scroll-smooth snap-y snap-mandatory'>
        <HomeServices />
      </main>
      <ProjectsHome projects={sampleProjects} />
      <AllProjects projects={sampleProjects} />
      <ContactSection />
      <DlxFooter />
    </>
  );
}
