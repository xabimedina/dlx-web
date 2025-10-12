import Link from 'next/link';
import { Button } from '@xabimedina/dlx-components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página no encontrada - Despeja la X',
  description: 'La página que buscas no existe o ha sido movida.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo o marca */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-wider">DESPEJA LA X</h2>
        </div>

        {/* Error 404 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-jet mb-4">404</h1>
          <div className="h-1 w-32 bg-jet mx-auto mb-8" />
        </div>

        {/* Mensaje */}
        <h2 className="text-3xl md:text-4xl font-semibold text-jet mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          Te invitamos a explorar nuestros proyectos.
        </p>

        {/* Botones de navegación */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              Volver al inicio
            </Button>
          </Link>
          <Link href="/proyectos">
            <Button size="lg" variant="ghost" className="w-full sm:w-auto">
              Ver proyectos
            </Button>
          </Link>
        </div>

        {/* Enlaces adicionales */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">¿Necesitas ayuda?</p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/" className="text-jet hover:underline">
              Inicio
            </Link>
            <Link href="/proyectos" className="text-jet hover:underline">
              Proyectos
            </Link>
            <Link href="/#contacto" className="text-jet hover:underline">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
