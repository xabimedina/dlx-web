import { MetadataRoute } from 'next';
import { getAllProjects } from '@/server/firebase/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.despejalax.com';

  try {
    const projects = await getAllProjects();
    
    // Mapear proyectos a entradas del sitemap con sus imágenes
    const projectRoutes: MetadataRoute.Sitemap = projects.flatMap((project) => {
      const images: string[] = [project.portrait];

      // Agregar imágenes de la galería si existen
      if ('gallery' in project && Array.isArray(project.gallery)) {
        images.push(...project.gallery);
      }

      return {
        url: `${baseUrl}/proyectos/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        images: images,
      };
    });

    return projectRoutes;
  } catch (error) {
    console.error('Error generating image sitemap:', error);
    return [];
  }
}
