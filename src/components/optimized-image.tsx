import Image from 'next/image';
import { cn } from '@xabimedina/dlx-components';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  quality = 85,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('object-cover', className)}
      priority={priority}
      sizes={sizes}
      fill={fill}
      quality={quality}
      placeholder="blur"
      {...props}
    />
  );
}

// Hook para lazy loading de imágenes
export function useImagePreloader(imageUrls: string[]) {
  const preloadImages = () => {
    imageUrls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  };

  return { preloadImages };
}
