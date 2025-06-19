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
