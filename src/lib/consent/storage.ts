'use client';

import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from './constants';
import type { ConsentAction, ConsentModeState, ConsentPreference } from './types';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    openConsentPreferences?: () => void;
  }
}

export function getConsentModeState(analytics: boolean): ConsentModeState {
  return {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: analytics ? 'granted' : 'denied',
  };
}

export function readConsentPreference(): ConsentPreference | null {
  try {
    const storedValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!storedValue) return null;

    const preference = JSON.parse(storedValue) as ConsentPreference;
    if (preference.version !== CONSENT_VERSION) return null;

    return preference;
  } catch {
    return null;
  }
}

export function saveConsentPreference(analytics: boolean): ConsentPreference {
  const preference: ConsentPreference = {
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    analytics,
  };

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preference));

  return preference;
}

export function clearConsentPreference() {
  window.localStorage.removeItem(CONSENT_STORAGE_KEY);
}

export function applyConsentPreference(
  analytics: boolean,
  options: { action: ConsentAction; emitEvent?: boolean }
) {
  const consentState = getConsentModeState(analytics);
  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', consentState);
  } else {
    window.dataLayer.push(['consent', 'update', consentState]);
  }

  if (options.emitEvent) {
    window.dataLayer.push({
      event: 'consent_update',
      analytics_storage: consentState.analytics_storage,
      ad_storage: consentState.ad_storage,
      action: options.action,
    });
  }
}
