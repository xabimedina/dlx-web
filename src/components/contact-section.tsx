'use client';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { Button } from 'dlx-components';
import { DlxLink } from 'dlx-components';

export const ContactSection = () => {
  return (
    <section id='contacto' className='bg-smoke py-24'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-40 items-center'>
          <div className='border border-jet p-20'>
            <div className='space-y-4'>
              <h2 className='text-3xl md:text-4xl font-bold text-jet font-kanit leading-tight'>
                CALCULA TU PROYECTO
              </h2>
              <p className='text-jet leading-relaxed'>
                Obtén una cotización personalizada para tu proyecto. Nuestro
                equipo de expertos te ayudará a encontrar la solución perfecta
                que se adapte a tus necesidades y presupuesto.
              </p>
              <Button className='mt-4' variant='accent' size='lg'>
                Calcula tu presupuesto
              </Button>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <aside className='space-y-6'>
            <ContactLinks
              icon={<Mail className='h-6 w-6 text-saffron' />}
              title='CORREO'
              link='mailto:info@despejalax.com'
              contactLabel='INFO@DESPEJALAX.COM'
            />
            <ContactLinks
              icon={<Phone className='h-6 w-6 text-saffron' />}
              title='TELÉFONO'
              link='tel:123456789'
              contactLabel='123 456 789'
            />
            <ContactLinks
              icon={<MessageCircle className='h-6 w-6 text-saffron' />}
              title='REDES SOCIALES'
              contactLabel='@DESPEJALAX'
            />
          </aside>
        </div>
      </div>
    </section>
  );
};

const ContactLinks = ({
  icon,
  title,
  link,
  contactLabel,
}: {
  icon: React.ReactNode;
  title: string;
  link?: string;
  contactLabel: string;
}) => {
  return (
    <div className='flex items-start space-x-4'>
      <div className='bg-jet p-3 rounded-full'>{icon}</div>
      <div>
        <p className='text-sm font-medium text-jet-foreground uppercase tracking-wide'>
          {title}
        </p>
        {link ? (
          <DlxLink href={link} className='text-xl font-bold text-jet'>
            {contactLabel}
          </DlxLink>
        ) : (
          <span className='text-xl font-bold text-jet'>{contactLabel}</span>
        )}
      </div>
    </div>
  );
};
