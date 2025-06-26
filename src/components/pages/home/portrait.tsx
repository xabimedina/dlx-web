'use client';
import Image from 'next/image';
import { Button } from 'dlx-components';
import BackgroundVideo from './background-video';

export function HomePortrait() {
  return (
    <div className='relative w-full h-screen  '>
      <BackgroundVideo />
      <div className='max-w-[512px] absolute left-30 top-1/2 -translate-y-1/2 h-auto font-sans w-full flex flex-col items-center justify-center gap-12 z-10 text-smoke'>
        <div className='space-y-4'>
          <h1 className='text-6xl font-bold'>UN PASO MAS A TU HOGAR</h1>
          <p className=''>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            lacinia orci in ante iaculis laoreet. Sed hendrerit porttitor quam
            cursus mattis.
          </p>
        </div>

        <Button size='lg' variant='accent'>
          Calcula tu presupuesto
        </Button>
      </div>
    </div>
  );
}
