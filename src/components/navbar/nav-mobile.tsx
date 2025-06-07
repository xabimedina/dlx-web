import { cn } from "dlx-components";
import { NavLinks } from "./nav-links";
import { Button } from "dlx-components";

export function NavMobile({
  isMenuOpen,
  closeMenu,
}: {
  isMenuOpen: boolean;
  closeMenu: () => void;
}) {
  return (
    <nav
      className={cn(
        "fixed inset-0 z-40 md:hidden transition-all duration-1000 ease-in-out",
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}
      onClick={closeMenu}
    >
      <div className="absolute inset-0 bg-jet"/>
      <div
        className={cn(
          "absolute top-16 left-0 right-0 bottom-0 bg-jet transition-all duration-400 ease-initial",
          isMenuOpen
            ? "opacity-100 translate-y-0 "
            : "opacity-0 -translate-y-full "
        )}
      >
        <div className="px-2 relative pt-10 pb-6 space-y-2 h-full flex flex-col">
          <NavLinks isMobile={true} />
          <Button
            className="absolute bottom-12 left-0 right-0 mx-8"
            variant="accent"
            onClick={closeMenu}
          >
            Calcula tu presupuesto
          </Button>
        </div>
      </div>
    </nav>
  );
}
