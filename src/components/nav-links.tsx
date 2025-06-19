import { DlxLink } from './pages/dlx-link';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/#contacto', label: 'Contacto' },
];

interface NavLinksProps {
  type: 'smoke' | 'jet';
}

export function NavLinks({ type }: NavLinksProps) {
  const textColor = type === 'smoke' ? 'text-jet' : 'text-smoke';
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
