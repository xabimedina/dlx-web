'use client';

import { useReportWebVitals } from 'next/web-vitals';

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

    // Enviar a Google Analytics si está configurado
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gtag = (window as any).gtag;
      if (gtag) {
        gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        });
      }
    }

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
