'use client';

import { Button } from '@xabimedina/dlx-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { COOKIE_POLICY_PATH } from '@/lib/consent/constants';
import {
  applyConsentPreference,
  readConsentPreference,
  saveConsentPreference,
} from '@/lib/consent/storage';

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const storedPreference = readConsentPreference();

    if (storedPreference) {
      setAnalyticsEnabled(storedPreference.analytics);
      applyConsentPreference(storedPreference.analytics, {
        action: 'restore',
        emitEvent: false,
      });
    } else {
      setShowBanner(true);
    }

    window.openConsentPreferences = () => {
      const currentPreference = readConsentPreference();
      setAnalyticsEnabled(currentPreference?.analytics ?? false);
      setShowBanner(false);
    };

    setIsReady(true);

    return () => {
      delete window.openConsentPreferences;
    };
  }, []);

  const persistConsent = (
    analytics: boolean,
    action: 'accept' | 'reject' | 'save'
  ) => {
    saveConsentPreference(analytics);
    applyConsentPreference(analytics, { action, emitEvent: true });
    setAnalyticsEnabled(analytics);
    setShowBanner(false);
  };

  return (
    <>
      {children}

      {showBanner && (
        <section
          aria-label='Aviso de cookies'
          className='fixed inset-x-0 bottom-0 z-50 border-t border-jet/10 bg-smoke px-4 py-5 text-jet shadow-2xl'
        >
          <div className='mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between'>
            <div className='max-w-3xl space-y-2'>
              <h2 className='font-kanit text-2xl font-bold uppercase tracking-wide'>
                Cookies
              </h2>
              <p className='text-sm leading-relaxed text-jet/75'>
                Usamos cookies analíticas de Google Analytics a través de Google
                Tag Manager para entender cómo se usa la web y mejorar la
                experiencia. Puedes aceptar, rechazar o configurar esta
                categoría.
              </p>
              <Link
                href={COOKIE_POLICY_PATH}
                className='text-sm font-semibold underline underline-offset-4'
              >
                Ver política de cookies
              </Link>
            </div>

            <div className='flex flex-col gap-3 sm:flex-row md:shrink-0'>
              <Button
                className='border border-jet/25 bg-transparent px-6 py-3 text-jet hover:bg-jet hover:text-smoke'
                onClick={() => persistConsent(false, 'reject')}
              >
                Rechazar
              </Button>
              <Button
                variant='accent'
                className='px-6 py-3'
                onClick={() => persistConsent(true, 'accept')}
              >
                Aceptar
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
