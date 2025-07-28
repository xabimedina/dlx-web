// components/BackgroundVideo.tsx
'use client';
import { useRef, useEffect } from 'react';

interface BackgroundVideoProps {
  onVideoLoaded?: () => void;
}

const BackgroundVideo = ({ onVideoLoaded }: BackgroundVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      onVideoLoaded?.();
    };

    const handleLoadedData = () => {
      onVideoLoaded?.();
    };

    // Agregar listeners para detectar cuando el video está listo
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);

    // Si el video ya está cargado, ejecutar inmediatamente
    if (video.readyState >= 3) {
      onVideoLoaded?.();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [onVideoLoaded]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload='auto'
      poster='/portrait.jpg'
      id='bgVideo'
      style={{
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        opacity: 0.8,
      }}
    >
      <source src='/portrait.webm' type='video/webm' />
    </video>
  );
};

export default BackgroundVideo;
