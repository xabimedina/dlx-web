import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { setupGSAP, animations } from '@/lib/gsap';

type AnimationType = 'fadeInUp' | 'fadeIn' | 'slideInFromLeft' | 'fadeInUpBounce';

interface UseIntersectionAnimationOptions {
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionAnimation = <T extends HTMLElement = HTMLElement>(
  options: UseIntersectionAnimationOptions = {}
) => {
  const {
    animation = 'fadeInUp',
    delay = 0,
    threshold = 0.2,
    rootMargin = '0px 0px -10% 0px',
    triggerOnce = true,
  } = options;

  const elementRef = useRef<T>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    setupGSAP();

    const element = elementRef.current;
    if (!element) return;

    // Establecer estado inicial y configurar animación
    setInitialState(element, animation);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!hasAnimated.current || !triggerOnce)) {
            executeAnimation(element, animation, delay);
            hasAnimated.current = true;
            if (triggerOnce) observer.unobserve(entry.target);
          } else if (!triggerOnce && hasAnimated.current) {
            setInitialState(element, animation);
            hasAnimated.current = false;
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [animation, delay, threshold, rootMargin, triggerOnce]);

  return elementRef;
};

// Estados iniciales para cada tipo de animación
const setInitialState = (element: HTMLElement, animationType: AnimationType) => {
  const initialStates: Record<AnimationType, object> = {
    fadeInUp: { opacity: 0, y: 50, scale: 0.95 },
    fadeInUpBounce: { opacity: 0, y: 50, scale: 0.9 },
    slideInFromLeft: { opacity: 0, x: -100 },
    fadeIn: { opacity: 0 },
  };

  gsap.set(element, initialStates[animationType]);
}; 

// Ejecución de animación usando solo animaciones predefinidas
const executeAnimation = (element: HTMLElement, animationType: AnimationType, delay: number) => {
  const animationMap: Record<AnimationType, (el: gsap.TweenTarget, d: number) => gsap.core.Tween> = {
    fadeInUp: animations.fadeInUp,
    fadeIn: animations.fadeIn,
    slideInFromLeft: animations.slideInFromLeft,
    fadeInUpBounce: animations.fadeInUpBounce,
  };

  return animationMap[animationType](element, delay);
};
