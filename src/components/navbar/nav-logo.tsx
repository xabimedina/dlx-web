export function NavLogo() {
  return (
    <div className="flex-shrink-0 z-50">
      <a
        href="/"
        className="flex items-center transition-transform duration-200 hover:scale-105"
      >
        <img
          src="/brand/dlx-logo-white.png"
          alt="Despejalax"
          className="h-12 w-auto"
        />
      </a>
    </div>
  );
}
