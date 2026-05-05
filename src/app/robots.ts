import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.every.datagsm.kr';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/mypage', '/callback'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
