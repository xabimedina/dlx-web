'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@xabimedina/dlx-components';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log del error para debugging
    console.error('Error de aplicación:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo o marca */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-wider">DESPEJA LA X</h2>
        </div>

        {/* Error 500 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-jet mb-4">500</h1>
          <div className="h-1 w-32 bg-jet mx-auto mb-8" />
        </div>

        {/* Mensaje */}
        <h2 className="text-3xl md:text-4xl font-semibold text-jet mb-4">
          Algo salió mal
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-md mx-auto">
          Lo sentimos, ha ocurrido un error inesperado. Nuestro equipo está 
          trabajando para solucionarlo. Por favor, intenta de nuevo más tarde.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={reset} 
            size="lg" 
            className="w-full sm:w-auto"
          >
            Intentar de nuevo
          </Button>
          <Link href="/">
            <Button size="lg" variant="ghost" className="w-full sm:w-auto">
              Volver al inicio
            </Button>
          </Link>
        </div>

        {/* Información adicional para debugging (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-12 p-6 bg-red-50 rounded-lg text-left">
            <p className="text-sm font-mono text-red-800 break-words">
              <strong>Error:</strong> {error.message}
            </p>
            {error.digest && (
              <p className="text-sm font-mono text-red-600 mt-2">
                <strong>Digest:</strong> {error.digest}
              </p>
            )}
          </div>
        )}

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
