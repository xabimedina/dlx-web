'use client';
import { DlxLink } from './pages/dlx-link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/#contacto', label: 'Contacto' },
];

export function NavLinks() {
  const pathname = usePathname();
  const isProjectsRoute = pathname.startsWith('/proyectos');
  const currentType = isProjectsRoute ? 'smoke' : 'jet';

  const textColor = currentType === 'smoke' ? 'text-jet' : 'text-smoke';
  return (
    <>
      {navLinks.map(link => (
        <div className='px-4 py-2' key={link.href}>
          <DlxLink href={link.href} className={textColor}>
            {link.label}
          </DlxLink>
        </div>
      ))}
    </>
  );
}
