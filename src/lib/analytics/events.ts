'use client';

import { sendGAEvent } from '@next/third-parties/google';

import { CALCULATOR_URL, GA_MEASUREMENT_ID } from './constants';

type ContactType = 'email' | 'phone' | 'whatsapp';
type ProjectClickSource = 'homepage' | 'projects_page';
type CalculatorSource = 'hero' | 'contact_section';

type GTMEvent = {
  event: string;
  [key: string]: string | number | boolean | null | undefined;
};

export function trackGoogleAnalyticsEvent({ event, ...params }: GTMEvent) {
  sendGAEvent('event', event, params);
}

export const trackGTMEvent = trackGoogleAnalyticsEvent;

export function trackPageView(url?: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const pageUrl = new URL(url ?? window.location.href, window.location.origin);

  sendGAEvent('config', GA_MEASUREMENT_ID, {
    page_path: `${pageUrl.pathname}${pageUrl.search}${pageUrl.hash}`,
    page_location: pageUrl.href,
    page_title: document.title,
  });
}

export function trackProjectClick(
  projectId: string,
  projectName: string,
  source: ProjectClickSource
) {
  trackGTMEvent({
    event: 'project_click',
    project_id: projectId,
    project_name: projectName,
    source,
    destination_url: `/proyectos/${projectId}`,
  });
}

export function trackProjectView({
  projectId,
  projectName,
  workType,
  projectStyle,
  location,
  area,
}: {
  projectId: string;
  projectName: string;
  workType: string;
  projectStyle: string;
  location: string;
  area: string | number;
}) {
  trackGTMEvent({
    event: 'project_view',
    project_id: projectId,
    project_name: projectName,
    work_type: workType,
    project_style: projectStyle,
    location,
    area,
  });
}

export function trackCalculatorClick(source: CalculatorSource) {
  trackGTMEvent({
    event: 'calculator_click',
    source,
    destination_url: CALCULATOR_URL,
  });
}

export function trackContactClick(contactType: ContactType, service?: string) {
  trackGTMEvent({
    event: 'contact_click',
    contact_type: contactType,
    service,
  });
}
