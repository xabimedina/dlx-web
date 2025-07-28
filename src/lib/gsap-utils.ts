import { gsap } from 'gsap';

// Hooks y utilidades avanzadas para GSAP con Next.js

/**
 * Hook personalizado para animaciones de intersección
 * Útil para animar elementos cuando entran en viewport
 */
export const useScrollAnimation = () => {
  const animateOnScroll = (
    element: gsap.TweenTarget,
    animation: gsap.TweenVars
  ) => {
    // Para usar con ScrollTrigger (requiere instalación adicional)
    // gsap.to(element, {
    //   ...animation,
    //   scrollTrigger: {
    //     trigger: element,
    //     start: "top 80%",
    //     end: "bottom 20%",
    //     toggleActions: "play none none reverse"
    //   }
    // });
    
    // Versión básica sin ScrollTrigger
    return gsap.to(element, animation);
  };

  return { animateOnScroll };
};

/**
 * Presets de animación comunes para el proyecto
 */
export const animationPresets = {
  // Animación para títulos principales
  heroTitle: {
    from: {
      opacity: 0,
      y: 100,
      scale: 0.8,
    },
    to: {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
    },
  },

  // Animación para subtítulos
  subtitle: {
    from: {
      opacity: 0,
      y: 50,
    },
    to: {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    },
  },

  // Animación para botones con efecto hover
  button: {
    from: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    to: {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
    },
  },

  // Animación para cards o elementos de grid
  card: {
    from: {
      opacity: 0,
      y: 60,
      rotationX: 45,
    },
    to: {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      ease: 'power2.out',
    },
  },

  // Fade in simple
  fadeIn: {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      duration: 0.6,
      ease: 'power1.out',
    },
  },
};

/**
 * Función para crear secuencias de animación complejas
 */
export const createPageTransition = () => {
  const tl = gsap.timeline({ paused: true });
  
  return {
    timeline: tl,
    fadeOut: (elements: gsap.TweenTarget[]) => {
      tl.to(elements, {
        opacity: 0,
        y: -50,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.in',
      });
      return tl;
    },
    fadeIn: (elements: gsap.TweenTarget[]) => {
      tl.fromTo(elements, 
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
      return tl;
    },
    play: () => tl.play(),
    reverse: () => tl.reverse(),
  };
};

/**
 * Utilidad para animar elementos en lista con stagger
 */
export const animateList = (
  items: gsap.TweenTarget[],
  options: {
    stagger?: number;
    delay?: number;
    duration?: number;
    ease?: string;
  } = {}
) => {
  const {
    stagger = 0.1,
    delay = 0,
    duration = 0.6,
    ease = 'power2.out'
  } = options;

  return gsap.fromTo(items,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease,
    }
  );
};

/**
 * Configuración responsive para animaciones
 */
export const responsiveAnimations = {
  mobile: {
    reducedMotion: true,
    duration: 0.4,
    ease: 'power1.out',
  },
  tablet: {
    reducedMotion: false,
    duration: 0.6,
    ease: 'power2.out',
  },
  desktop: {
    reducedMotion: false,
    duration: 0.8,
    ease: 'power2.out',
  },
};

/**
 * Función para detectar preferencias de animación del usuario
 */
export const getAnimationConfig = () => {
  // Verifica si el usuario prefiere animaciones reducidas
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Detecta el tamaño de pantalla
  const isDesktop = typeof window !== 'undefined' 
    ? window.innerWidth >= 1024 
    : true;
  
  const isTablet = typeof window !== 'undefined' 
    ? window.innerWidth >= 768 && window.innerWidth < 1024 
    : false;

  if (prefersReducedMotion) {
    return {
      duration: 0.2,
      ease: 'none',
      enabled: false,
    };
  }

  if (isDesktop) {
    return responsiveAnimations.desktop;
  } else if (isTablet) {
    return responsiveAnimations.tablet;
  } else {
    return responsiveAnimations.mobile;
  }
};
