'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/gtag';

export default function ArticleViewTracker({ slug, category }: { slug: string; category: string }) {
  useEffect(() => {
    trackEvent('blog_article_view', { slug, category });
  }, [slug, category]);
  return null;
}
