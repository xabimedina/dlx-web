import Image from 'next/image';
import { useIntersectionAnimation } from '@/hooks/use-intersection-animation';
import { animations, initialStates } from '@/lib/gsap';
import { BLUR_DATA_URL } from '@/constants';
import { Services } from '@/types/texts';
import { useMemo } from 'react';

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}
// Componente individual para cada servicio
function ServiceItem({ service }: { service: ServiceItem }) {
  const titleRef = useIntersectionAnimation<HTMLHeadingElement>({
    initialState: initialStates.fadeInUp,
    animation: animations.fadeInUp

  });
  const subtitleRef = useIntersectionAnimation<HTMLHeadingElement>({
    initialState: initialStates.fadeInUp,
    animation: animations.fadeInUp,
    threshold: 0.3,
  });
  const paragraphRef = useIntersectionAnimation<HTMLParagraphElement>({
    initialState: initialStates.fadeInUp,
    animation: animations.fadeInUp,
    threshold: 0.3,
  });



  return (
    <div id={service.id} className='h-[60vh] md:h-[80vh] flex flex-col justify-center px-8 md:px-16 lg:px-20 space-y-8'>
      <div className='space-y-3'>
        <h2
          ref={titleRef}
          className='text-2xl md:text-4xl lg:text-5xl font-bold text-jet tracking-wide uppercase'
        >
          {service.title}
        </h2>
        <h3
          ref={subtitleRef}
          className='text-lg md:text-xl lg:text-2xl font-semibold text-jet/70 max-w-md'>
          {service.subtitle}
        </h3>
      </div>

      <p
        ref={paragraphRef}
        className='text-jet leading-relaxed text-base md:text-lg max-w-lg text-pretty'
      >
        {service.description}
      </p>
    </div>
  );
}

export function HomeServices({ texts }: { texts: Services }) {
  "use client";
  const spanRef = useIntersectionAnimation<HTMLSpanElement>({
    initialState: initialStates.backgroundSlideIn,
    animation: animations.backgroundSlideIn,
    delay: 0.2,
  });

  const services = useMemo(() => [
    {
      id: 'arquitectura',
      title: texts['arch-title'],
      subtitle: texts['arch-subtitle'],
      description: texts['arch-description'],
    },
    {
      id: 'interiorismo',
      title: texts['int-title'],
      subtitle: texts['int-subtitle'],
      description: texts['int-description'],
    },
    {
      id: 'asesoramiento',
      title: texts['consult-title'],
      subtitle: texts['consult-subtitle'],
      description: texts['consult-description'],
    },
  ], [texts]);

  return (
    <section className='bg-smoke'>
      <div className='max-w-3xl mx-auto text-center py-18 space-y-2 md:space-y-6 '>
        <p
          className='text-xl md:text-5xl lg:text-5xl xl:text-5xl leading-tight font-light'
        >
          La <span className='animate-pulse font-black'>X</span> no es el problema
        </p>
        <p className='text-xl md:text-5xl lg:text-5xl xl:text-5xl font-bold '>
          es el inicio de tu nuevo hogar
        </p>

      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        {/* Left Side - Services */}
        <aside className=''>
          {services.map((service, index) => (
            <ServiceItem key={index} service={service} />
          ))}
        </aside>

        {/* Right Side - Sticky Image */}
        <div className='relative'>
          <div className='sticky top-0 right-0 h-screen flex justify-center'>
            <div className='relative w-full h-full max-w-2xl md:max-h-[80vh]'>
              <Image
                src='/images/servicios.jpg'
                alt='Interior design showcase with modern furniture and decor'
                fill
                className='object-cover rounded-r-xs'
                sizes='(max-width: 768px) 100vw, 50vw'
                placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
              />

              <span
                ref={spanRef}
                style={{
                  background: 'linear-gradient(to right, #EEBA0B 0%, #EEBA0B 100%)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '0% 100%',
                  backgroundPosition: 'left center',

                }}
                className='text-3xl w-fit pl-1 pr-4 font-light text-jet absolute bottom-4 inset-x-4'>
                No es magia, es diseño
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
