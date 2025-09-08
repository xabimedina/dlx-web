"use client";

import Image from 'next/image';
import { GALLERY_MAP_STYLES } from '@/constants';
import { AspectRatio } from '@xabimedina/dlx-components';
import { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { X } from 'lucide-react';

export function ProjectGallery({ images }: { images: string[] }) {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Preparar las imágenes para react-image-gallery
  const galleryImages = images.map((image) => ({
    original: image,
  }));

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
  };

  return (
    <>
      <section className='px-4 mb-12'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {images.map((image, index) => {
              // Obtener el patrón correspondiente usando módulo para repetir el layout
              const patternIndex = index % GALLERY_MAP_STYLES.length;
              const { aspectRatio, gridClass } = GALLERY_MAP_STYLES[patternIndex];

              return (
                <div 
                  key={index} 
                  className={`${gridClass} cursor-pointer hover:opacity-90 transition-opacity`}
                  onClick={() => handleImageClick(index)}
                >
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

      {/* Lightbox */}
      {showLightbox && (
        <div className='fixed inset-0 z-50 bg-jet bg-opacity-90'>
          <ImageGallery
            items={galleryImages}
            showPlayButton={false}
            showFullscreenButton={false}
            showIndex={false}
            infinite={false}
            showThumbnails={false}
            lazyLoad={true}
            startIndex={currentImageIndex}
            additionalClass='lightbox-gallery'
          />
          <button
            className='absolute top-5 right-6 text-white cursor-pointer text-3xl bg-saffron p-1 hover:text-gray-300 z-60'
            onClick={() => setShowLightbox(false)}
          >
            <X />
          </button>
        </div> 
      )}
    </>
  );
}
