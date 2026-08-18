export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  repo?: string;
  isOpenSource: boolean;
  wip?: boolean;
  isPrivate?: boolean;
}

export const personalProjects: Project[] = [
  {
    title: 'infiniteJumps',
    description: 'High-performance web-based FPS movement game that recreates the mechanics of source engine',
    tags: ['TS', 'Three.js', 'HTML', 'CSS', 'Firebase'],
    image: '/images/infinitejumps.png',
    link: 'https://infinitejumps.kryo.dev/',
    repo: 'https://github.com/kryo1337/infinitejumps',
    isOpenSource: true,
  },
  {
    title: 'pureReaction',
    description: 'Minimal web-based tool for measuring reaction time',
    tags: ['Zig', 'WASM', 'JS', 'HTML', 'CSS'],
    image: '/images/purereaction.png',
    link: 'https://purereaction.kryo.dev/',
    repo: 'https://github.com/kryo1337/purereaction',
    isOpenSource: true,
  },
  {
    title: 'valdog',
    description: 'Windows tray app that detects your live VALORANT match and shows the full lobby roster in a web app',
    tags: ['Go', 'Fyne', 'WebSocket', 'TS', 'React', 'PostgreSQL'],
    image: '/images/valdog.png',
    link: 'https://valdog.kryo.dev',
    repo: 'https://github.com/kryo1337/valdog',
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
  {
    title: 'tracker',
    description: 'Life tracker: daily routine, gym workouts, supplements, habit limits, journal, subscriptions, body weight, with real-time sync and push reminders',
    tags: ['C#', 'ASP.NET', 'EF Core', 'PostgreSQL', 'SignalR', 'Hangfire', 'React', 'TS', 'PWA', 'Docker'],
    image: '/images/tracker.png',
    isOpenSource: false,
    isPrivate: true,
  },
];
