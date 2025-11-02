import { usePostHog } from 'posthog-js/react';
import { useCallback } from 'react';

/**
 * Track when users view projects
 */
export function useTrackProjectView() {
  const posthog = usePostHog();

  const trackProjectView = useCallback(
    (projectId: string, projectName: string) => {
      posthog.capture('project_viewed', {
        projectId,
        projectName,
        timestamp: new Date().toISOString(),
      });
    },
    [posthog]
  );

  return { trackProjectView };
}

/**
 * Track when users click on project cards
 */
export function useTrackProjectClick() {
  const posthog = usePostHog();

  const trackProjectClick = useCallback(
    (projectId: string, projectName: string, location: string) => {
      posthog.capture('project_clicked', {
        projectId,
        projectName,
        location, // e.g., 'homepage', 'projects-page'
        timestamp: new Date().toISOString(),
      });
    },
    [posthog]
  );

  return { trackProjectClick };
}

/**
 * Track calculator CTA clicks (link to calculadora.despejalax.es)
 */
export function useTrackCalculatorCTA() {
  const posthog = usePostHog();

  const trackCalculatorClick = useCallback(
    (source: string) => {
      posthog.capture('calculator_cta_clicked', {
        source, // e.g., 'contact-section', 'navbar', 'footer'
        destination: 'calculadora.despejalax.es',
        timestamp: new Date().toISOString(),
      });
    },
    [posthog]
  );

  return { trackCalculatorClick };
}

/**
 * Track contact form interactions
 */
export function useTrackContact() {
  const posthog = usePostHog();

  const trackContactClick = useCallback(
    (contactType: 'email' | 'phone' | 'whatsapp', service?: string) => {
      posthog.capture('contact_clicked', {
        contactType,
        service, // e.g., 'interiorismo', 'asesoramiento'
        timestamp: new Date().toISOString(),
      });
    },
    [posthog]
  );

  return { trackContactClick };
}

/**
 * Track navigation clicks
 */
export function useTrackNavigation() {
  const posthog = usePostHog();

  const trackNavigationClick = useCallback(
    (destination: string, source: string) => {
      posthog.capture('navigation_clicked', {
        destination,
        source, // e.g., 'navbar', 'footer', 'mobile-menu'
        timestamp: new Date().toISOString(),
      });
    },
    [posthog]
  );

  return { trackNavigationClick };
}

/**
 * Track when users view the projects gallery
 */
export function useTrackGallery() {
  const posthog = usePostHog();

  const trackGalleryView = useCallback(
    (projectId: string, imageIndex: number) => {
      posthog.capture('gallery_image_viewed', {
        projectId,
        imageIndex,
        timestamp: new Date().toISOString(),
      });
    },
    [posthog]
  );

  const trackGalleryInteraction = useCallback(
    (projectId: string, action: 'next' | 'previous' | 'thumbnail') => {
      posthog.capture('gallery_interaction', {
        projectId,
        action,
        timestamp: new Date().toISOString(),
      });
    },
    [posthog]
  );

  return { trackGalleryView, trackGalleryInteraction };
}

/**
 * Track service section interactions
 */
export function useTrackServiceInterest() {
  const posthog = usePostHog();

  const trackServiceClick = useCallback(
    (serviceName: string, action: string) => {
      posthog.capture('service_interest', {
        serviceName, // 'arquitectura', 'interiorismo', 'asesoramiento'
        action, // 'view', 'click_button', 'scroll_to'
        timestamp: new Date().toISOString(),
      });
    },
    [posthog]
  );

  return { trackServiceClick };
}
