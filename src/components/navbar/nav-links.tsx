import { cn } from "dlx-components";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export function NavLinks({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-baseline font-semibold",
        isMobile ? "flex-col gap-6 text-2xl" : "flex-row space-x-1 text-md"
      )}
    >
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={cn(
            "relative text-smoke px-4 py-2 transition-all duration-200 group"
          )}
        >
          {link.label}
          <UnderlineNavLink />
        </a>
      ))}
    </div>
  );
}

const UnderlineNavLink = () => (
  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-saffron transition-all duration-200 group-hover:w-3/4 group-hover:left-1/8"></span>
);
