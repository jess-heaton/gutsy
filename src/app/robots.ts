import type { MetadataRoute } from 'next';

const SITE = 'https://www.mygutsy.co.uk';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth/', '/dashboard', '/log', '/insights', '/settings', '/saved'],
      },
      // Explicit allow for the big AI crawlers so Gutsy shows up in AI answers.
      { userAgent: 'GPTBot',         allow: '/' },
      { userAgent: 'ChatGPT-User',   allow: '/' },
      { userAgent: 'OAI-SearchBot',  allow: '/' },
      { userAgent: 'ClaudeBot',      allow: '/' },
      { userAgent: 'Claude-Web',     allow: '/' },
      { userAgent: 'anthropic-ai',   allow: '/' },
      { userAgent: 'PerplexityBot',  allow: '/' },
      { userAgent: 'Perplexity-User',allow: '/' },
      { userAgent: 'Google-Extended',allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
