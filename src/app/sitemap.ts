import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://kryo.dev',
      priority: 1,
    },
    {
      url: 'https://kryo.dev/world',
      priority: 0.8,
    },
  ];
}
