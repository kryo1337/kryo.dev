export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  isOpenSource: boolean;
  wip?: boolean;
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
    description: 'Minimal web-based tool for measuring reaction time',
    tags: ['Zig', 'WASM', 'JS', 'HTML', 'CSS'],
    image: '/images/purereaction.png',
    link: 'https://purereaction.kryo.dev/',
    isOpenSource: true,
  },
  {
    title: 'valdog',
    description: 'Windows tray app that detects your live VALORANT match and shows the full lobby roster in a web app',
    tags: ['Go', 'Fyne', 'WebSocket', 'TS', 'React', 'PostgreSQL'],
    image: '/images/valdog.png',
    link: 'https://valdog.kryo.dev',
    isOpenSource: true,
  },
  {
    title: 'letsgamba',
    description: 'Real-time multiplayer betting platform with a 3D roulette table and Twitch integration',
    tags: ['React', 'Three.js', 'TS', 'C#', 'SignalR', 'PostgreSQL', 'Docker'],
    image: '/images/letsgamba.png',
    link: 'https://letsgamba.tv',
    isOpenSource: false,
    wip: true,
  },
  {
    title: 'YTVOD Pipeline',
    description: 'Automated Valorant VOD pipeline that scrapes pro matches, downloads VODs, processes footage, generates thumbnails, and uploads to YouTube with Telegram notifications',
    tags: ['Python', 'OpenCV', 'YouTube API', 'Twitch API', 'SOOP API', 'Telegram API', 'FFmpeg', 'yt-dlp'],
    image: '/images/ytvod.png',
    link: 'https://www.youtube.com/@ValoBengBeng',
    isOpenSource: false,
  },
];
