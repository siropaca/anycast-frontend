import type { MetadataRoute } from 'next';

/**
 * robots.txt の設定
 *
 * @returns robots.txt の設定
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/settings/'],
    },
  };
}
