'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

if (typeof window !== 'undefined') {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (key) {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: false, // We'll capture pageviews manually
      capture_pageleave: true,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug();
      },
    });
  }
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

/**
 * PostHog PageView tracker for Next.js App Router
 * Tracks route changes - simplified version without useSearchParams to avoid build issues
 */
export function PostHogPageView(): null {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && pathname) {
      // Capture full URL including search params
      const url = window.location.href;
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname]);

  return null;
}
