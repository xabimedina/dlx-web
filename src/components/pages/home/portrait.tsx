'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@xabimedina/dlx-components';
import BackgroundVideo from './background-video';
import { setupGSAP, animations } from '@/lib/gsap';

export function HomePortrait() {
  // Referencias para los elementos que queremos animar
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  
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
        className='max-w-[512px] absolute left-30 top-1/2 -translate-y-1/2 h-auto font-sans w-full flex flex-col items-center justify-center gap-12 z-10 text-smoke'
      >
        <div className='space-y-4'>
          <h1 
            ref={titleRef}
            className='text-6xl font-bold'
            style={{ opacity: 0 }} // Estado inicial invisible
          >
            UN PASO MAS A TU HOGAR
          </h1>
          <p 
            ref={paragraphRef}
            className=''
            style={{ opacity: 0 }} // Estado inicial invisible
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            lacinia orci in ante iaculis laoreet. Sed hendrerit porttitor quam
            cursus mattis.
          </p>
        </div>

        <div 
          ref={buttonWrapperRef}
          style={{ opacity: 0 }} // Estado inicial invisible
        >
          <Button 
            size='lg' 
            variant='accent'
          >
            Calcula tu presupuesto
          </Button>
        </div>
      </div>
    </div>
  );
}
