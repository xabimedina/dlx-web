import { gsap } from 'gsap';

// Configuración base para GSAP en Next.js App Router
export const setupGSAP = () => {
  // Configuración global de GSAP
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });

  // Configuraciones por defecto para las animaciones
  gsap.defaults({
    duration: 0.8,
    ease: 'power2.out',
  });
};

// Utilidades de animación reutilizables
export const animations = {
  fadeInUp: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay,
        ease: 'power2.out',
      }
    );
  },

  fadeIn: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.6,
        delay,
        ease: 'power2.out',
      }
    );
  },

  slideInFromLeft: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay,
        ease: 'power2.out',
      }
    );
  },

  staggeredFadeInUp: (elements: gsap.TweenTarget[], staggerDelay = 0.2) => {
    return gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: staggerDelay,
        ease: 'power2.out',
      }
    );
  },

  fadeInUpBounce: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay,
        ease: 'back.out(1.7)',
      }
    );
  },
};

// Hook personalizado para secuencias de animación
export const createTimeline = (options?: gsap.TimelineVars) => {
  return gsap.timeline(options);
};
