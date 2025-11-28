export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  content: string;
}

export const projects: Project[] = [
  {
    slug: 'project-1',
    title: 'Project Title 1',
    description: 'Description for project 1.',
    tags: ['Tag1', 'Tag2'],
    content: 'Content for project 1.',
  },
  {
    slug: 'project-2',
    title: 'Project Title 2',
    description: 'Description for project 2.',
    tags: ['Tag1', 'Tag2'],
    content: 'Content for project 2.',
  },
  {
    slug: 'project-3',
    title: 'Project Title 3',
    description: 'Description for project 3.',
    tags: ['Tag1', 'Tag2'],
    content: 'Content for project 3.',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}