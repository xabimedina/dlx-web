import { useEffect, useRef, useState } from 'react';

export const useVideo = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleCanPlay = () => {
            setIsVideoLoaded(true);
        };

        const handleLoadedData = () => {
            setIsVideoLoaded(true);
        };

        const handleLoadStart = () => {
            setIsVideoLoaded(false);
        };

        // Agregar listeners para detectar cuando el video está listo
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('loadstart', handleLoadStart);

        // Si el video ya está cargado, ejecutar inmediatamente
        if (video.readyState >= 3) {
            setIsVideoLoaded(true);
        }

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('loadstart', handleLoadStart);
        };
    }, []);

    return {
        videoRef,
        isVideoLoaded,
    };
};
