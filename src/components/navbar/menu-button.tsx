import { cn } from "dlx-components";
import { Menu, X } from "lucide-react";

export function MenuButton({
  toggleMenu,
  isMenuOpen,
}: {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}) {
  return (
    <button
      onClick={toggleMenu}
      type="button"
      className={cn(
        "md:hidden z-50 relative cursor-pointer transition-colors duration-200 p-1.5",
        isMenuOpen
          ? "bg-saffron text-jet"
          : "text-smoke hover:bg-saffron hover:text-jet"
      )}
      aria-expanded={isMenuOpen}
      aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
    >
      <div className="relative w-6 h-6">
        <Menu
          className={cn(
            "absolute inset-0 w-6 h-6 transition-all duration-300",
            isMenuOpen
              ? "opacity-0 rotate-180 scale-75"
              : "opacity-100 rotate-0 scale-100"
          )}
        />
        <X
          className={cn(
            "absolute inset-0 w-6 h-6 transition-all duration-300",
            isMenuOpen
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-180 scale-75"
          )}
        />
      </div>
    </button>
  );
}
