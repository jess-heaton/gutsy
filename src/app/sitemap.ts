import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';

const SITE = 'https://www.mygutsy.co.uk';

const STATIC_PATHS = [
  { path: '',            priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/menu',       priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/recipe',     priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/foods',      priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog',       priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/extension',  priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/login',      priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/signup',     priority: 0.5, changeFrequency: 'yearly' as const },
  { path: '/privacy',    priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/s',          priority: 0.5, changeFrequency: 'daily' as const  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...STATIC_PATHS.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...articles.map(a => ({
      url: `${SITE}/blog/${a.slug}`,
      lastModified: new Date(a.updatedDate ?? a.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
