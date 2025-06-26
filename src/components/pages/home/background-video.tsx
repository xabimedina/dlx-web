// components/BackgroundVideo.tsx
'use client';

const BackgroundVideo = () => (
  <video
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

export default BackgroundVideo;
