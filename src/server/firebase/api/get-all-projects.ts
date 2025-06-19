import { db } from '../config';
import { getDownloadUrl } from '../storage/get-download-url';
import type { Project } from '@/types/project';

const COLLECTION = 'projects';

/**
 * Devuelve todos los proyectos con las URLs de descarga
 * resueltas para imágenes y retrato.
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    const snapshot = await db.collection(COLLECTION).get();

    const projectPromises = snapshot.docs.map(async doc => {
      const raw = doc.data() as Omit<Project, 'images' | 'portrait'> & {
        images: string[];
        portrait: string;
      };

      const [images, portrait] = await Promise.all([
        Promise.all(raw.images.map(path => getDownloadUrl(path))),
        getDownloadUrl(raw.portrait),
      ]);

      return { ...raw, images, portrait } as Project;
    });

    return await Promise.all(projectPromises);
  } catch (err) {
    console.error('[getAllProjects] Error:', err);
    throw new Error('No se pudieron obtener los proyectos');
  }
}

export async function getPortraitProjects(): Promise<Project[]> {
  try {
    const snapshot = await db.collection(COLLECTION).limit(3).get();

    const projectPromises = snapshot.docs.map(async doc => {
      const raw = doc.data() as Omit<Project, 'images' | 'portrait'> & {
        images: string[];
        portrait: string;
      };

      const [images, portrait] = await Promise.all([
        Promise.all(raw.images.map(path => getDownloadUrl(path))),
        getDownloadUrl(raw.portrait),
      ]);

      return { ...raw, images, portrait } as Project;
    });

    return await Promise.all(projectPromises);
  } catch (err) {
    console.error('[getAllProjects] Error:', err);
    throw new Error('No se pudieron obtener los proyectos');
  }
}
