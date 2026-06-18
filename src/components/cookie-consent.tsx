'use client';

import {
  ConsentPreferencesButton as SharedConsentPreferencesButton,
  CookieConsentProvider as SharedCookieConsentProvider,
  type ConsentUpdatePayload,
} from '@xabimedina/dlx-components';
import type React from 'react';

import { trackPageView } from '@/lib/analytics';

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const handleConsentUpdate = (payload: ConsentUpdatePayload) => {
    if (payload.analytics) {
      trackPageView();
    }
  };

  return (
    <SharedCookieConsentProvider
      policyHref="/politica-de-cookies"
      onConsentUpdate={handleConsentUpdate}
      texts={{
        description:
          'Usamos cookies analíticas de Google Analytics para entender cómo se usa la web y mejorar la experiencia. Puedes aceptar, rechazar o configurar esta categoría.',
      }}
    >
      {children}
    </SharedCookieConsentProvider>
  );
}

export function ConsentPreferencesButton() {
  return <SharedConsentPreferencesButton />;
}
