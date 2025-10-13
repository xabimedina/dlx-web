import { useEffect } from 'react';
import {useVideo} from '@/hooks/use-video';

interface BackgroundVideoProps {
  onVideoLoaded?: () => void;
}

const BackgroundVideo = ({ onVideoLoaded }: BackgroundVideoProps) => {
  const { videoRef, isVideoLoaded, hasError } = useVideo();

  useEffect(() => {
    if (isVideoLoaded && onVideoLoaded) {
      onVideoLoaded();
    }
  }, [isVideoLoaded, onVideoLoaded]);

  return (
    <div className="relative w-full h-full">
      {/* Placeholder que se muestra mientras el video carga */}
      <div
        className={`absolute inset-0 bg-gray-900 transition-opacity duration-500 ease-in-out ${
          isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        }}
      >
        {/* Opcional: añadir un spinner o logo mientras carga */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
        </div>
      </div>

      {/* Video principal */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload='auto'
        className={`transition-opacity duration-500 ease-in-out ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
        }}
      >
        <source src='/dlx-intro.webm' type='video/webm' />
        {/* Fallback for browsers that don't support WebM */}
        <source src='/dlx-intro-video.mp4' type='video/mp4' />
      </video>

      {/* Fallback static image if video fails completely */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          aria-label="Background gradient"
        />
      )}
    </div>
  );
};

export default BackgroundVideo;
