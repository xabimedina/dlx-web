'use client';
import { Button } from '@xabimedina/dlx-components';
import { DlxLink } from '@xabimedina/dlx-components';
import { useTrackCalculatorCTA, useTrackContact } from '@/lib/posthog';
import type { HomeContact } from '@/types/texts';

export const ContactSection = ({ texts }: { texts: HomeContact }) => {
  const { trackCalculatorClick } = useTrackCalculatorCTA();
  const { trackContactClick } = useTrackContact();

  return (
    <section id='contacto' className='bg-smoke py-24'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='grid lg:grid-cols-2 gap-12 items-start mb-16 place-items-center'>
          {/* Left Column - Calculator */}
            <div className='space-y-6 max-w-md'>
              <h2 className='text-3xl md:text-4xl font-bold text-jet font-kanit leading-tight'>
                CALCULADORA DE
                <br />
                PROYECTO
              </h2>
              <p className='text-gray-600 leading-relaxed'>
                {texts['contact-calculator-subtitle']}
              </p>
              <a 
                href='https://calculadora.despejalax.es' 
                target='_blank' 
                rel='noopener noreferrer'
                onClick={() => trackCalculatorClick('contact-section')}
              >
                <Button variant="accent">
                  Calcula tu presupuesto
                </Button>
              </a>
            </div>

          {/* Right Column - Services */}
          <div className='space-y-8'>
            <ServiceBlock
              title={texts['contact-interior-title']}
              description={texts['contact-interior-subtitle']}
              buttonText='Estoy interesadx'
              service='interiorismo'
              onContactClick={trackContactClick}
            />
            <ServiceBlock
              title={texts['contact-consult-title']}
              description={texts['contact-consult-subtitle']}
              buttonText='Quiero asesoramiento'
              service='asesoramiento'
              onContactClick={trackContactClick}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-center mb-16'>
          <ContactInfo
            title='CORREO'
            value='INFO@DESPEJALAX.COM'
            link='mailto:info@despejalax.com'
            onContactClick={() => trackContactClick('email')}
          />
          <ContactInfo
            title='TELÉFONO'
            value='+34 607 24 58 86'
            link='https://wa.me/34607245886?text=Hola%20quiero%20más%20información%20sobre%20los%20servicios%20de%20reforma%20y%20arquitectura'
            onContactClick={() => trackContactClick('whatsapp')}
          />
         {/*  <ContactInfo
            title='REDES SOCIALES'
            value='@DESPEJALAX'
          /> */}
        </div>

      </div>
    </section>
  );
};

const ServiceBlock = ({
  title,
  description,
  buttonText,
  service,
  onContactClick,
}: {
  title: string;
  description: string;
  buttonText: string;
  service: string;
  onContactClick: (type: 'email' | 'phone' | 'whatsapp', service?: string) => void;
}) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-xl font-bold text-jet uppercase tracking-wide'>
        {title}
      </h3>
      <p className='text-gray-600 leading-relaxed'>
        {description}
      </p>
      <a 
        href='mailto:info@despejalax.com'
        onClick={() => onContactClick('email', service)}
      >
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
  onContactClick,
}: {
  title: string;
  value: string;
  link?: string;
  onContactClick?: () => void;
}) => {
  return (
    <div className='space-y-2'>
      <p className='text-sm font-medium text-gray-500 uppercase tracking-wide'>
        {title}
      </p>
      {link ? (
        <DlxLink 
          href={link} 
          className='text-lg font-bold text-jet block'
          onClick={onContactClick}
        >
          {value}
        </DlxLink>
      ) : (
        <span className='text-lg font-bold text-jet block'>{value}</span>
      )}
    </div>
  );
};
