import { useEffect, useRef, useState } from 'react';

export const useVideo = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let isLoaded = false;

        const handleCanPlay = () => {
            if (!isLoaded) {
                isLoaded = true;
                setIsVideoLoaded(true);
                setHasError(false);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            }
        };

        const handleLoadedData = () => {
            if (!isLoaded) {
                isLoaded = true;
                setIsVideoLoaded(true);
                setHasError(false);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            }
        };

        const handleError = () => {
            console.error('Video failed to load');
            setHasError(true);
            setIsVideoLoaded(true); // Hide loader even on error
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };

        const handleStalled = () => {
            console.warn('Video loading stalled');
        };

        // Timeout fallback: if video doesn't load in 10 seconds, show content anyway
        timeoutRef.current = setTimeout(() => {
            if (!isLoaded) {
                console.warn('Video loading timeout - showing content anyway');
                setIsVideoLoaded(true);
            }
        }, 10000);

        // Add event listeners
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('error', handleError);
        video.addEventListener('stalled', handleStalled);

        // Check if video is already loaded
        if (video.readyState >= 3) {
            isLoaded = true;
            setIsVideoLoaded(true);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('error', handleError);
            video.removeEventListener('stalled', handleStalled);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return {
        videoRef,
        isVideoLoaded,
        hasError,
    };
};
