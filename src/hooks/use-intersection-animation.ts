import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface UseIntersectionAnimationOptions {
  initialState?: gsap.TweenVars;
  animation?: (element: gsap.TweenTarget, delay?: number) => gsap.core.Tween;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionAnimation = <T extends HTMLElement = HTMLElement>(
  options: UseIntersectionAnimationOptions = {}
) => {
  const {
    initialState = { opacity: 0, y: 50, scale: 0.95 },
    animation,
    delay = 0,
    threshold = 0.2,
    rootMargin = '0px 0px -10% 0px',
    triggerOnce = true,
  } = options;

  const elementRef = useRef<T>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !animation) return;

    // Establecer estado inicial
    gsap.set(element, initialState);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!hasAnimated.current || !triggerOnce)) {
            animation(element, delay);
            hasAnimated.current = true;
            if (triggerOnce) observer.unobserve(entry.target);
          } else if (!triggerOnce && hasAnimated.current) {
            gsap.set(element, initialState);
            hasAnimated.current = false;
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [initialState, animation, delay, threshold, rootMargin, triggerOnce]);

  return elementRef;
};
