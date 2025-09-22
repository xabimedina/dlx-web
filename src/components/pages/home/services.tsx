import Image from 'next/image';
import { useIntersectionAnimation } from '@/hooks/use-intersection-animation';
import { animations, initialStates } from '@/lib/gsap';

const services = [
  {
    id: 'arquitectura',
    title: 'ARQUITECTURA',
    subtitle: 'Reformas integrales y obra nueva',
    description:
      'Una casa tiene muros, puertas y ventanas. Pero un hogar tiene historia, intención y alma. Con nosotros podrás proyectar espacios que, además de ser funcionales, hablen y expresen tu forma de ser. ',
  },
  {
    id: 'interiorismo',
    title: 'INTERIORISMO',
    subtitle: "Muebles, colores, textura y alma",
    description:
      'Una vivienda es estructura. Pero un hogar es ese rincón de lectura con tu manta, esa cocina donde te apetece cocinar o ese salón adaptado para recibir a tus amigos. Traducimos tus gustos y experiencias en algo tangible, sin fórmulas genéricas ni estilos prefabricados',
  },
  {
    id: 'asesoramiento',
    title: 'ASESORAMIENTO',
    subtitle: 'Ver un espacio y comprender lo que puede llegar a ser',
    description:
      'Un piso es un espacio preestablecido. Pero un futuro hogar va más allá de visitar casas: evaluamos distribución, estructura y potencial real, para que tomes decisiones inteligentes y sin riesgos.',
  },
];

// Componente individual para cada servicio
function ServiceItem({ service }: { service: typeof services[0] }) {
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
          className='text-2xl md:text-4xl lg:text-5xl font-bold text-jet tracking-wide'
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

export function HomeServices() {
  "use client";
  const spanRef = useIntersectionAnimation<HTMLSpanElement>({
    initialState: initialStates.backgroundSlideIn,
    animation: animations.backgroundSlideIn,
    delay: 0.2,
  });
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
