'use client';

import {
  ConsentPreferencesButton as SharedConsentPreferencesButton,
  CookieConsentProvider as SharedCookieConsentProvider,
} from '@xabimedina/dlx-components';
import type React from 'react';

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  return (
    <SharedCookieConsentProvider policyHref="/politica-de-cookies">
      {children}
    </SharedCookieConsentProvider>
  );
}

export function ConsentPreferencesButton() {
  return <SharedConsentPreferencesButton />;
}
