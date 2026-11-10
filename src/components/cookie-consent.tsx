'use client';

import {
  ConsentPreferencesButton as SharedConsentPreferencesButton,
  CookieConsentProvider as SharedCookieConsentProvider,
  type ConsentUpdatePayload,
} from '@xabimedina/dlx-components';
import type React from 'react';
import type { ComponentProps } from 'react';

import { MetaPixelTracker } from '@/components/meta-pixel-tracker';
import { trackPageView } from '@/lib/analytics';
import { setMetaConsent } from '@/lib/analytics/meta-pixel';

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const handleConsentUpdate = (payload: ConsentUpdatePayload) => {
    setMetaConsent(payload.analytics);
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
          'Usamos cookies analíticas de Google Analytics y cookies publicitarias de Meta para entender cómo se usa la web y medir nuestros anuncios. Puedes aceptar o rechazar su uso.',
      }}
    >
      <MetaPixelTracker />
      {children}
    </SharedCookieConsentProvider>
  );
}

export function ConsentPreferencesButton(
  props: ComponentProps<typeof SharedConsentPreferencesButton>
) {
  return <SharedConsentPreferencesButton {...props} />;
}
