export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  isOpenSource: boolean;
}

export const personalProjects: Project[] = [
  {
    title: 'Infinite Jumps',
    description: 'High-performance web-based FPS movement game that recreates the mechanics of source engine',
    tags: ['TS', 'Three.js', 'HTML', 'CSS', 'Firebase'],
    image: '/images/infinitejumps.png',
    link: 'https://infinite-jumps.vercel.app/',
    isOpenSource: true,
  },
  {
    title: 'pureReaction',
    description: 'The ultimate web-based tool for measuring and training your reflexes with near-native speed and accuracy',
    tags: ['Zig', 'WASM', 'JS', 'HTML', 'CSS'],
    image: '/images/purereaction.png',
    link: 'https://pure-reaction.vercel.app/',
    isOpenSource: true,
  },
  {
    title: 'GETRANK',
    description: 'Fast Valorant player lookup via leaderboard rank or Riot ID',
    tags: ['Bun', 'TS', 'Python', 'React', 'Tailwind CSS', 'Playwright', 'Redis', 'Docker'],
    image: '/images/getrank.png',
    link: 'https://getrank.vercel.app/',
    isOpenSource: true,
  },
];

export const wipProjects: Project[] = [
  {
    title: 'Valorant Discord Hub',
    description: 'E2E Discord bot, with API and front. Faceit alike system for valorant with team selection, map bans, leaderboard, stats and more',
    tags: ['Python', 'FastAPI', 'discord.py', 'React', 'Tailwind CSS', 'MongoDB', 'Docker', 'Kubernetes'],
    image: '/images/shhh.png',
    link: 'https://github.com/kryo1337/valodiscordhub',
    isOpenSource: true,
  },
  {
    title: 'Rewiring',
    description: 'Mobile app that helps users truly improve in any aspect',
    tags: ['Python', 'FastAPI', 'React Native', 'Expo', 'GraphQL', 'Tailwind CSS', 'PostgreSQL'],
    image: '/images/shhh.png',
    link: 'https://github.com/kryo1337',
    isOpenSource: false,
  },
];
