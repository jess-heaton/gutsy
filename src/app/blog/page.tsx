'use client';

import Link from 'next/link';
import { articles } from '@/data/articles';
import clsx from 'clsx';

const tagColors: Record<string, string> = {
  enzymes: 'bg-violet-100 text-violet-700',
  fructans: 'bg-amber-100 text-amber-700',
  supplements: 'bg-indigo-100 text-indigo-700',
  lactase: 'bg-sky-100 text-sky-700',
  dairy: 'bg-blue-100 text-blue-700',
  gluten: 'bg-orange-100 text-orange-700',
  research: 'bg-emerald-100 text-emerald-700',
  science: 'bg-pink-100 text-pink-700',
  fibre: 'bg-lime-100 text-lime-700',
};

export default function BlogPage() {
  return (
    <div className="px-4 pt-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reading</h1>
        <p className="text-sm text-gray-500 mt-1">Things worth knowing about IBS, FODMAPs, and managing your gut.</p>
      </div>

      <div className="space-y-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block bg-white rounded-2xl shadow-card border border-gray-100 p-4 hover:border-gray-200 active:scale-98 transition-all"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                {article.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-bold text-gray-900 leading-snug">{article.title}</h2>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{article.subtitle}</p>
                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className={clsx('text-xs px-2 py-0.5 rounded-full font-medium', tagColors[tag] || 'bg-gray-100 text-gray-600')}
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-xs text-gray-400 ml-auto">{article.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="h-4" />
    </div>
  );
}
