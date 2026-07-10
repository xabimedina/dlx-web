import 'server-only'; // Ensure server-only is imported first

import { db } from '../config';

const COLLECTION = 'projects';
const FOOTER_PROJECT_LIMIT = 3;

export interface FooterProjectLink {
  name: string;
  href: string;
}

type RawFooterProject = {
  id?: unknown;
  slug?: unknown;
  name?: unknown;
  createdAt?: unknown;
};

function getProjectSlug(raw: RawFooterProject, documentId: string): string {
  if (typeof raw.slug === 'string' && raw.slug.trim().length > 0) {
    return raw.slug.trim();
  }

  return typeof raw.id === 'string' && raw.id.trim().length > 0
    ? raw.id.trim()
    : documentId;
}

function getCreatedAtMillis(value: unknown): number {
  if (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { toMillis?: unknown }).toMillis === 'function'
  ) {
    return (value as { toMillis: () => number }).toMillis();
  }

  if (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { toDate?: unknown }).toDate === 'function'
  ) {
    return (value as { toDate: () => Date }).toDate().getTime();
  }

  return 0;
}

export async function getFooterProjects(): Promise<FooterProjectLink[]> {
  try {
    const snapshot = await db
      .collection(COLLECTION)
      .where('showProject', '==', true)
      .get();

    return snapshot.docs
      .flatMap(doc => {
        const raw = doc.data() as RawFooterProject;
        if (typeof raw.name !== 'string' || raw.name.trim().length === 0) {
          return [];
        }

        const slug = getProjectSlug(raw, doc.id);

        return [
          {
            name: raw.name.trim(),
            href: `/proyectos/${slug}`,
            createdAt: getCreatedAtMillis(raw.createdAt),
          },
        ];
      })
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, FOOTER_PROJECT_LIMIT)
      .map(({ name, href }) => ({ name, href }));
  } catch (err) {
    console.error('[getFooterProjects] Error:', err);
    return [];
  }
}
