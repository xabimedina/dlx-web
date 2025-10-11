import 'server-only'; // Ensure server-only is imported first
import { Timestamp } from 'firebase/firestore';
import { db } from '../config';
import { getDownloadUrl } from '../storage';
import type { Project } from '@/types/project';

const COLLECTION = 'projects';
const STARRED_PROJECTS_IDS = ['sAhxxQQQ45cab5wu76bl', 'w0dsQwdUym5BMjDk84Sx', 'YSf9otEJoelmc6sZSMqD']; // Reemplaza con los IDs reales de los proyectos destacados

/**
 * Devuelve un proyecto específico por su ID con las URLs de descarga
 * resueltas para imágenes y retrato.
 */
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const doc = await db.collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return null;
    }

    const raw = doc.data() as Omit<Project, 'images' | 'portrait' | 'createdAt'> & {
      images: string[];
      portrait: string;
      createdAt: Timestamp;
    };

    const [images, portrait] = await Promise.all([
      Promise.all(raw.images.slice(0, 6).map(path => getDownloadUrl(path))),
      getDownloadUrl(raw.portrait),
    ]);

    return { ...raw, createdAt: raw.createdAt.toDate(), images, portrait } as Project;
  } catch (err) {
    console.error('Error fetching project:', err);
    return null;
  }
}

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

    return (await Promise.all(projectPromises)).reverse();
  } catch (err) {
    console.error('[getAllProjects] Error:', err);
    throw new Error('No se pudieron obtener los proyectos');
  }
}

export async function getPortraitProjects(): Promise<Project[]> {
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

    const projects = await Promise.all(projectPromises);
    const starredProjects = projects.filter(project => STARRED_PROJECTS_IDS.includes(project.id));

    const starredIds = new Set(starredProjects.map(project => project.id));
    if (starredProjects.length < 3) {
      const additionalProjects = projects
        .filter(project => !starredIds.has(project.id))
        .slice(0, 3 - starredProjects.length);
      starredProjects.push(...additionalProjects);
    }
    
    return starredProjects;

  } catch (err) {
    console.error('[getAllProjects] Error:', err);
    throw new Error('No se pudieron obtener los proyectos');
  }
}
