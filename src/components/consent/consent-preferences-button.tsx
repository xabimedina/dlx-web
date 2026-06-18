'use client';

import { Button } from '@xabimedina/dlx-components';

export function ConsentPreferencesButton() {
  return (
    <Button
      variant="accent"
      className="px-6 py-3"
      onClick={() => window.openConsentPreferences?.()}
    >
      Configurar cookies
    </Button>
  );
}
