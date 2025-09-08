
export interface CategoryItem {
  id: string;
  name: string;
}

export interface CategoriesData {
  colors: ['jet', 'saffron', 'smoke'];
  projectStyle: CategoryItem[];
  workType: CategoryItem[];
}

export interface Project {
  id: string;
  name: string;
  location: string;
  area: number;
  color: CategoriesData['colors'][number];
  portrait: string;
  images: string[];
  subName: string;
  description: string;
  projectStyle: CategoryItem;
  workType: CategoryItem;
  createdAt: Date;
}

export type ProjectPortrait = Pick<
  Project,
  'name' | 'description' | 'portrait' | 'color' | 'id' | 'subName'
>;
