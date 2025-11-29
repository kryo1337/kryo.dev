export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export const personalProjects: Project[] = [
  {
    title: 'Lorem Ipsum Alpha',
    description: 'Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Project+Alpha',
    link: 'https://github.com',
  },
  {
    title: 'Dolor Sit Amet',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    tags: ['Rust', 'WebAssembly', 'Tokio'],
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Project+Beta',
    link: 'https://github.com',
  },
  {
    title: 'Consectetur Elit',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    tags: ['Python', 'TensorFlow', 'FastAPI'],
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Project+Gamma',
    link: 'https://github.com',
  },
];

export const wipProjects: Project[] = [
  {
    title: 'Tempor Incididunt',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tags: ['Next.js', 'Tailwind', 'Prisma'],
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=WIP+One',
    link: 'https://github.com',
  },
  {
    title: 'Labore et Dolore',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    tags: ['Go', 'Docker', 'Kubernetes'],
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=WIP+Two',
    link: 'https://github.com',
  },
  {
    title: 'Magna Aliqua',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.',
    tags: ['Svelte', 'Vite', 'Firebase'],
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=WIP+Three',
    link: 'https://github.com',
  },
];