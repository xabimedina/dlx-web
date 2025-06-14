import Image from 'next/image';

const services = [
  {
    title: 'ARQUITECTURA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia orci in ante iaculis laoreet. Sed hendrerit porttitor quam cursus mattis. Cras tincidunt est eu sagittis eleifend. Donec scelerisque ipsum in orci ultrices feugiat.',
  },
  {
    title: 'INTERIORISMO',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia orci in ante iaculis laoreet. Sed hendrerit porttitor quam cursus mattis. Cras tincidunt est eu sagittis eleifend.',
  },
  {
    title: 'ASESORAMIENTO',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia orci in ante iaculis laoreet. Sed hendrerit porttitor quam cursus mattis. Cras tincidunt est eu sagittis eleifend. Donec scelerisque ipsum in orci ultrices feugiat.',
  },
];

export function HomeServices() {
  return (
    <section className='bg-smoke '>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        {/* Left Side - Services */}
        <aside className=''>
          {services.map((service, index) => (
            <div
              key={index}
              className='h-[80vh] flex flex-col justify-center px-8 md:px-16 lg:px-20 space-y-4'
            >
              <h2 className='text-4xl md:text-3xl lg:text-4xl font-bold text-jet tracking-wide'>
                {service.title}
              </h2>
              <p className='text-jet leading-relaxed text-lg md:text-base max-w-md'>
                {service.description}
              </p>
            </div>
          ))}
        </aside>

        {/* Right Side - Sticky Image */}
        <div className='relative'>
          <div className='sticky top-0 right-0 h-screen flex justify-center'>
            <div className='relative w-full h-full max-w-2xl max-h-[80vh]'>
              <Image
                src='/images/services.jpg'
                alt='Interior design showcase with modern furniture and decor'
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
