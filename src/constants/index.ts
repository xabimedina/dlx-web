export const Z_INDEX_CLASSES = [
  'z-[1]',
  'z-[2]',
  'z-[3]',
  'z-[4]',
  'z-[5]',
  'z-[6]',
  'z-[7]',
  'z-[8]',
  'z-[9]',
  'z-[10]',
  'z-[11]',
  'z-[12]',
  'z-[13]',
  'z-[14]',
  'z-[15]',
] as const;

export const BACKGROUND_MAP_STYLES = [
  {
    background: 'bg-jet text-smoke',
    paragraph: {
      color: 'smoke',
      borderColor: 'smoke',
    },
  },
  {
    background: 'bg-saffron text-jet',
    paragraph: {
      color: 'jet',
      borderColor: 'jet',
    },
  },
  {
    background: 'bg-smoke text-jet',
    paragraph: {
      color: 'jet',
      borderColor: 'saffron',
    },
  },
] as const;

// Destinado para la pagina de proyecto
export const GALLERY_MAP_STYLES = [
  { aspectRatio: 4 / 3, gridClass: 'md:col-span-1' }, // Imagen 1
  { aspectRatio: 4 / 3, gridClass: 'md:col-span-1' }, // Imagen 2
  { aspectRatio: 16 / 10, gridClass: 'md:col-span-2' }, // Imagen 3 (ancha)
  { aspectRatio: 9 / 16, gridClass: 'md:col-span-1' }, // Imagen 4
  { aspectRatio: 9 / 16, gridClass: 'md:col-span-1' }, // Imagen 5
  { aspectRatio: 4 / 3, gridClass: 'md:col-span-2' }, // Imagen 6
] as const;
