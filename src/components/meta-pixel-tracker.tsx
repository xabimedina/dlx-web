'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { trackMetaPageView } from '@/lib/analytics/meta-pixel';

// Envía un PageView a Meta en cada página, solo si hay consentimiento.
export function MetaPixelTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackMetaPageView();
  }, [pathname]);

  return null;
}
