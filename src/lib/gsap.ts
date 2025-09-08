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

// Estados iniciales para las animaciones
export const initialStates = {
  fadeInUp: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  fadeInDown: {
    opacity: 0,
    y: -50,
    scale: 0.95,
  },
  fadeIn: {
    opacity: 0,
  },
  slideInFromLeft: {
    opacity: 0,
    x: -100,
  },
  fadeInUpBounce: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  backgroundSlideIn: {
    backgroundSize: '0% 100%',
    backgroundPosition: 'left center',
  },
  counter: {
    opacity: 0,
    scale: 0.9,
  },
};

// Estados finales para las animaciones
export const finalStates = {
  fadeInUp: {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'power2.out',
  },
  fadeInDown: {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'power2.out',
  },
  fadeIn: {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
  },
  slideInFromLeft: {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: 'power2.out',
  },
  fadeInUpBounce: {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.7)',
  },
  backgroundSlideIn: {
    backgroundSize: '100% 100%',
    duration: 1.2,
    ease: 'power2.out',
  },
  counter: {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: 'power2.out',
  },
};

// Utilidades de animación reutilizables
export const animations = {
  fadeInUp: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      initialStates.fadeInUp,
      {
        ...finalStates.fadeInUp,
        delay,
      }
    );
  },
  fadeInDown: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      initialStates.fadeInDown,
      {
        ...finalStates.fadeInDown,
        delay,
      }
    );
  },

  fadeIn: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      initialStates.fadeIn,
      {
        ...finalStates.fadeIn,
        delay,
      }
    );
  },

  slideInFromLeft: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      initialStates.slideInFromLeft,
      {
        ...finalStates.slideInFromLeft,
        delay,
      }
    );
  },

  staggeredFadeInUp: (elements: gsap.TweenTarget[], staggerDelay = 0.2) => {
    return gsap.fromTo(
      elements,
      initialStates.fadeInUp,
      {
        ...finalStates.fadeInUp,
        stagger: staggerDelay,
      }
    );
  },

  fadeInUpBounce: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      initialStates.fadeInUpBounce,
      {
        ...finalStates.fadeInUpBounce,
        delay,
      }
    );
  },

  backgroundSlideIn: (element: gsap.TweenTarget, delay = 0) => {
    return gsap.fromTo(
      element,
      initialStates.backgroundSlideIn,
      {
        ...finalStates.backgroundSlideIn,
        delay,
      }
    );
  },

  counter: (element: gsap.TweenTarget, delay = 0) => {
    const el = element as HTMLElement;
    const targetText = el.textContent || '0€';
    const targetValue = parseInt(targetText.replace(/[^\d]/g, '')) || 0;
    
    // Establecer estado inicial del contador
    el.textContent = '0€';
    
    // Animar la apariencia visual
    gsap.fromTo(
      element,
      initialStates.counter,
      {
        ...finalStates.counter,
        delay,
      }
    );

    // Animar el contador de números
    const counterObj = { value: 0 };
    return gsap.to(counterObj, {
      value: targetValue,
      duration: 2,
      delay: delay + 0.3,
      ease: 'power2.out',
      onUpdate: function() {
        const currentValue = Math.floor(counterObj.value);
        el.textContent = new Intl.NumberFormat("es-ES").format(currentValue) + '€';
      }
    });
  },
};

// Hook personalizado para secuencias de animación
export const createTimeline = (options?: gsap.TimelineVars) => {
  return gsap.timeline(options);
};
