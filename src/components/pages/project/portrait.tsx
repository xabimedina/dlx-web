'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export function ProjectPortrait({ image }: { image: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isVisible =
        rect.top < window.innerHeight + 500 && rect.bottom > -200;

      if (isVisible) {
        // Solo aplicar parallax cuando es visible
        const scrolled = window.pageYOffset;
        const elementTop = rect.top + scrolled;
        const relativePos = scrolled - elementTop;
        const rate = relativePos * 0.3; // Factor sutil

        setParallaxOffset(Math.max(-30, Math.min(30, rate))); // Limitar a ±30px
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative my-12 min-w-screen h-[50vh] overflow-hidden'
    >
      <div
        className='absolute inset-0 will-change-transform'
        style={{
          transform: `translateY(${parallaxOffset}px) scale(1.05)`,
        }}
      >
        <Image
          src={image}
          alt='Retrato para el proyecto'
          fill
          className='object-cover'
        />
      </div>
    </section>
  );
}
