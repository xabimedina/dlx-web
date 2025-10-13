'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@xabimedina/dlx-components';
import BackgroundVideo from './background-video';
import { setupGSAP, animations } from '@/lib/gsap';

export function HomePortrait() {
  // Referencias para los elementos que queremos animar
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonWrapperRef = useRef<HTMLAnchorElement>(null);
  
  // Estado para controlar cuando el video está cargado
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Callback para cuando el video termine de cargar
  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  useEffect(() => {
    // Configurar GSAP al montar el componente
    setupGSAP();
  }, []);

  useEffect(() => {
    // Solo ejecutar animaciones cuando el video esté cargado
    if (!isVideoLoaded) return;

    // Verificar que las referencias existan
    if (!titleRef.current || !paragraphRef.current || !buttonWrapperRef.current) {
      return;
    }

    // Usar las utilidades de animación con delays escalonados
    const titleAnimation = animations.fadeInUp(titleRef.current, 0.2);
    const paragraphAnimation = animations.fadeInUp(paragraphRef.current, 0.5);
    const buttonAnimation = animations.fadeInUpBounce(buttonWrapperRef.current, 0.8);

    // Cleanup function para cuando el componente se desmonte
    return () => {
      titleAnimation.kill();
      paragraphAnimation.kill();
      buttonAnimation.kill();
    };
  }, [isVideoLoaded]);

  return (
    <div className='relative w-full h-screen'>
      <BackgroundVideo onVideoLoaded={handleVideoLoaded} />
      <div 
        className='max-w-[760px] absolute inset-x-4 md:left-8 lg:left-16 xl:left-20 top-1/2 -translate-y-1/2 flex flex-col gap-6 md:gap-12 z-10 text-smoke'
      >
        <div className='space-y-6'>
          <h1 
            ref={titleRef}
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-snug md:leading-20 text-center sm:text-left'
            style={{ opacity: 0 }} // Estado inicial invisible
          >
            Espacios pensados, hogares vívidos
          </h1>
          <p 
            ref={paragraphRef}
            className='text-base sm:text-lg font-medium max-sm:pl-6'
            style={{ opacity: 0 }} // Estado inicial invisible
          >
            En Despeja la X no resolvemos con fórmulas genéricas. Tu reforma en Valencia es una ecuación única: la despejamos contigo, detalle a detalle
          </p>
        </div>

        <a
          href='https://calculadora.despejalax.com/'
          ref={buttonWrapperRef}
          className='w-full flex justify-center'
          style={{ opacity: 0 }} // Estado inicial invisible
        >
          <Button 
            size='lg' 
            variant='accent'
          >
            Calcula tu presupuesto
          </Button>
        </a>
      </div>
    </div>
  );
}
