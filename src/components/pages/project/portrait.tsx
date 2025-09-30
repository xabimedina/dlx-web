'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { BLUR_DATA_URL } from '@/constants';

interface ProjectPortraitProps {
  image: string;
  info: {
    workType: string;
    projectStyle: string;
    location: string;
    area: string;
  }
}

export function ProjectPortrait({ image, info }: ProjectPortraitProps) {
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
      className='relative my-12 min-w-screen h-[65vh] overflow-hidden'
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
          placeholder="blur"
    blurDataURL={BLUR_DATA_URL}
        />
      </div>
      <section className='absolute bottom-2.5 left-1/2 transform -translate-x-1/2 px-12 mb-12 w-fit backdrop-blur-sm bg-white/10 py-6 rounded-sm shadow-2xl border border-white/20'>
        <div className='relative max-md:w-screen grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14 lg:gap-12 text-center'>
          {[
            { label: 'Tipo', value: info.workType },
            { label: 'Estilo', value: info.projectStyle },
            { label: 'Ubicación', value: info.location },
            { label: 'm²', value: info.area }
          ].map(({ label, value }, index) => (
            <div key={index} className='relative z-10'>
              <h3 className='text-xs  font-medium text-white/90 mb-1 md:mb-2 '>
                {label}
              </h3>
              <p className='text-base md:text-md font-semibold text-white '>
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
