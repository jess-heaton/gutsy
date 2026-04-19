import type { MetadataRoute } from 'next';

const SITE = 'https://gutsy.freedible.co.uk';

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
];

/* Add blog posts manually for now; if a CMS shows up later replace with a fetch. */
const BLOG_SLUGS = ['fodzyme', 'milkaid', 'fructan-vs-gluten'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...STATIC_PATHS.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...BLOG_SLUGS.map(slug => ({
      url: `${SITE}/blog/${slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
