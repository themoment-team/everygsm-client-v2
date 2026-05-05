import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.every.datagsm.kr';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];
}
