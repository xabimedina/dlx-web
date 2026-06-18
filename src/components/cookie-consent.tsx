'use client';

import {
  ConsentPreferencesButton as SharedConsentPreferencesButton,
  CookieConsentProvider as SharedCookieConsentProvider,
} from '@xabimedina/dlx-components';
import type React from 'react';

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  return (
    <SharedCookieConsentProvider
      policyHref="/politica-de-cookies"
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
