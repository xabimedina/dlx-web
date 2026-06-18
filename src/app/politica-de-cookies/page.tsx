import type { Metadata } from 'next';
import Link from 'next/link';
import { ConsentPreferencesButton } from '@/components/cookie-consent';

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: 'Información sobre el uso de cookies analíticas en Despeja la X.',
  alternates: {
    canonical: '/politica-de-cookies',
  },
};

export default function PoliticaDeCookiesPage() {
  return (
    <main className="min-h-screen bg-smoke px-6 py-16 text-jet">
      {/* Texto base pendiente de revisión legal por el responsable del sitio. */}
      <article className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-4">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-wide underline underline-offset-4"
          >
            Volver al inicio
          </Link>
          <h1 className="font-kanit text-4xl font-bold uppercase tracking-wide md:text-6xl">
            Política de cookies
          </h1>
          <p className="text-sm text-jet/65">Última actualización: 18 de junio de 2026</p>
        </header>

        <section className="space-y-3">
          <h2 className="font-kanit text-2xl font-bold uppercase">Qué son las cookies</h2>
          <p className="leading-relaxed text-jet/75">
            Las cookies son pequeños archivos que se almacenan en tu dispositivo
            cuando visitas una página web. Pueden servir para recordar preferencias,
            permitir funcionalidades técnicas o medir el uso del sitio.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-kanit text-2xl font-bold uppercase">Qué cookies usamos</h2>
          <p className="leading-relaxed text-jet/75">
            En Despeja la X usamos cookies técnicas necesarias para el
            funcionamiento básico de la web y, solo si das tu consentimiento,
            cookies analíticas de Google Analytics gestionadas a través de Google
            Tag Manager.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-kanit text-2xl font-bold uppercase">Cookies analíticas</h2>
          <p className="leading-relaxed text-jet/75">
            Las cookies analíticas nos ayudan a entender cómo se usa la web:
            visitas a páginas, interacción con proyectos, clics en la calculadora
            y métricas de rendimiento. Esta información se utiliza para mejorar la
            experiencia y el contenido del sitio.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-jet/20">
                  <th className="py-3 pr-4 font-bold uppercase">Categoría</th>
                  <th className="py-3 pr-4 font-bold uppercase">Proveedor</th>
                  <th className="py-3 pr-4 font-bold uppercase">Finalidad</th>
                  <th className="py-3 font-bold uppercase">Estado inicial</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-jet/10">
                  <td className="py-3 pr-4">Analítica</td>
                  <td className="py-3 pr-4">Google Analytics / Google Tag Manager</td>
                  <td className="py-3 pr-4">Medición de uso, eventos y rendimiento</td>
                  <td className="py-3">Desactivada hasta consentimiento</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-kanit text-2xl font-bold uppercase">
            Publicidad y personalización
          </h2>
          <p className="leading-relaxed text-jet/75">
            En esta versión no activamos almacenamiento publicitario,
            personalización de anuncios ni uso de datos para publicidad. Estos
            consentimientos permanecen desactivados salvo que se informe y se
            solicite consentimiento específico en el futuro.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-kanit text-2xl font-bold uppercase">
            Cómo gestionar tu consentimiento
          </h2>
          <p className="leading-relaxed text-jet/75">
            Puedes aceptar, rechazar o configurar las cookies analíticas desde el
            aviso de cookies. También puedes cambiar o retirar tu consentimiento en
            cualquier momento desde el botón de configuración.
          </p>
          <ConsentPreferencesButton />
        </section>

        <section className="space-y-3">
          <h2 className="font-kanit text-2xl font-bold uppercase">
            Cómo borrar cookies desde el navegador
          </h2>
          <p className="leading-relaxed text-jet/75">
            Además de usar nuestra configuración, puedes eliminar o bloquear cookies
            desde las opciones de privacidad de tu navegador. Si borras los datos
            del sitio, volveremos a pedirte tu preferencia cuando regreses.
          </p>
        </section>
      </article>
    </main>
  );
}
