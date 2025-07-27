import Image from 'next/image';
import { GALLERY_MAP_STYLES } from '@/constants';
import { AspectRatio } from '@xabimedina/dlx-components';

export function ProjectGallery({ images }: { images: string[] }) {
  return (
    <section className='px-4 mb-12'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {images.map((image, index) => {
            // Obtener el patrón correspondiente usando módulo para repetir el layout
            const patternIndex = index % GALLERY_MAP_STYLES.length;
            const { aspectRatio, gridClass } = GALLERY_MAP_STYLES[patternIndex];

            return (
              <div key={index} className={`${gridClass}`}>
                <AspectRatio ratio={aspectRatio}>
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                </AspectRatio>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
