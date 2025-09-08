'use client';
import { Button } from '@xabimedina/dlx-components';
import { DlxLink } from '@xabimedina/dlx-components';

export const ContactSection = () => {
  return (
    <section id='contacto' className='bg-smoke py-24'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='grid lg:grid-cols-2 gap-12 items-start mb-16 place-items-center'>
          {/* Left Column - Calculator */}
            <div className='space-y-6 max-w-md'>
              <h2 className='text-3xl md:text-4xl font-bold text-jet font-kanit leading-tight'>
                CALCULA TU
                <br />
                PROYECTO
              </h2>
              <p className='text-gray-600 leading-relaxed'>
                Descubre en minutos un estimado del coste para una reforma a través de 8 preguntas sencillas
              </p>
              <Button variant="accent">
                Calcula tu presupuesto
              </Button>
            </div>

          {/* Right Column - Services */}
          <div className='space-y-8'>
            <ServiceBlock
              title='INTERIORISMO'
              description='¿Quieres que el diseño de tu casa refleje tu esencia y se convierta en el hogar de tus sueños? Te asesoramos y acompañamos en cada paso de esta transformación.'
              buttonText='Estoy interesadx'
            />
            <ServiceBlock
              title='ASESORAMIENTO'
              description='¿Has encontrado un piso, chalet o casa con potencial y te preguntas si es el lugar perfecto para ti? Te ofrecemos nuestro acompañamiento para que resuelvas tus dudas y tomes la mejor decisión.'
              buttonText='Quiero asesoramiento'
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16'>
          <ContactInfo
            title='CORREO'
            value='INFO@DESPEJALAX.COM'
            link='mailto:info@despejalax.com'
          />
          <ContactInfo
            title='TELÉFONO'
            value='123 456 789'
            link='tel:123456789'
          />
          <ContactInfo
            title='REDES SOCIALES'
            value='@DESPEJALAX'
          />
        </div>

      </div>
    </section>
  );
};

const ServiceBlock = ({
  title,
  description,
  buttonText,
}: {
  title: string;
  description: string;
  buttonText: string;
}) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-xl font-bold text-jet uppercase tracking-wide'>
        {title}
      </h3>
      <p className='text-gray-600 leading-relaxed'>
        {description}
      </p>
      <a href='mailto:info@despejalax.com'>
        <Button className='bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-full text-sm'>
          {buttonText}
        </Button>
      </a>
    </div>
  );
};

const ContactInfo = ({
  title,
  value,
  link,
}: {
  title: string;
  value: string;
  link?: string;
}) => {
  return (
    <div className='space-y-2'>
      <p className='text-sm font-medium text-gray-500 uppercase tracking-wide'>
        {title}
      </p>
      {link ? (
        <DlxLink href={link} className='text-lg font-bold text-jet block'>
          {value}
        </DlxLink>
      ) : (
        <span className='text-lg font-bold text-jet block'>{value}</span>
      )}
    </div>
  );
};
