'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { trackGTMEvent } from '@/lib/analytics';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log en consola para desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
      });
    }

    trackGTMEvent({
      event: 'web_vital',
      metric_name: metric.name,
      metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_rating: metric.rating,
      navigation_type: metric.navigationType,
    });

    // También se puede enviar a otros servicios de analytics
    // Por ejemplo, a un endpoint propio para tracking
    if (typeof window !== 'undefined') {
      // Ejemplo de endpoint personalizado (descomentarlo si lo necesitas)
      /*
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metric: metric.name,
          value: metric.value,
          rating: metric.rating,
          id: metric.id,
          navigationType: metric.navigationType,
        }),
      }).catch(console.error);
      */
    }
  });

  return null;
}
