export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export const personalProjects: Project[] = [
  {
    title: 'Infinite Jumps',
    description: 'High-performance web-based FPS movement game that recreates the mechanics of source engine',
    tags: ['React', 'Three.js', 'TS', 'HTML', 'CSS'],
    image: '/images/infinitejumps.png',
    link: 'https://infinite-jumps.vercel.app/',
  },
  {
    title: 'pureReaction',
    description: 'The ultimate web-based tool for measuring and training your reflexes with near-native speed and accuracy',
    tags: ['Zig', 'WASM', 'JS', 'HTML', 'CSS'],
    image: '/images/purereaction.png',
    link: 'https://pure-reaction.vercel.app/',
  },
];

export const wipProjects: Project[] = [
  {
    title: 'Valorant Discord Hub',
    description: 'E2E Discord bot, with API and front. Faceit alike system for valorant with team selection, map bans, leaderboard, stats and more',
    tags: ['Python', 'FastAPI', 'React', 'Tailwind CSS', 'MongoDB'],
    image: '/images/shhh.png',
    link: 'https://github.com/kryo1337',
  },
  {
    title: 'Rewiring',
    description: 'Mobile app that helps users truly improve in any aspect',
    tags: ['React Native', 'Expo', 'Python', 'FastAPI', 'GraphQL', 'Tailwind CSS', 'PostgreSQL'],
    image: '/images/shhh.png',
    link: 'https://github.com/kryo1337',
  },
];
