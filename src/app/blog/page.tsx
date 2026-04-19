'use client';

import Link from 'next/link';
import { articles } from '@/data/articles';
import clsx from 'clsx';

const TAG_COLORS: Record<string, string> = {
  enzymes:     'bg-violet-100 text-violet-700',
  fructans:    'bg-amber-100  text-amber-700',
  supplements: 'bg-indigo-100 text-indigo-700',
  lactase:     'bg-sky-100    text-sky-700',
  dairy:       'bg-blue-100   text-blue-700',
  gluten:      'bg-orange-100 text-orange-700',
  research:    'bg-emerald-100 text-emerald-700',
  science:     'bg-pink-100   text-pink-700',
  fibre:       'bg-lime-100   text-lime-700',
};

export default function BlogPage() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 lg:py-12 pb-20 lg:pb-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
        <p className="text-sm text-gray-500 mt-1 max-w-md">
          Articles on the science of IBS, the FODMAP diet, and supplements — based on published research, not guesswork.
        </p>
      </div>

      {/* Featured (first article) */}
      <Link
        href={`/blog/${articles[0].slug}`}
        className="block bg-brand-900 rounded-xl p-6 hover:bg-brand-800 transition-colors active:scale-98 group"
      >
        <div className="text-4xl mb-4">{articles[0].emoji}</div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {articles[0].tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs bg-brand-700 text-brand-200 px-2 py-0.5 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-lg font-bold text-white leading-snug mb-2">{articles[0].title}</h2>
        <p className="text-sm text-brand-200 line-clamp-2">{articles[0].subtitle}</p>
        <p className="text-xs text-brand-400 mt-3">{articles[0].readTime} read</p>
      </Link>

      {/* Rest of articles */}
      <div className="space-y-1">
        {articles.slice(1).map((article, i) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors group"
          >
            <div className="w-11 h-11 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-xl flex-shrink-0">
              {article.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-1 mb-1">
                {article.tags.slice(0, 1).map(tag => (
                  <span key={tag} className={clsx('text-2xs px-1.5 py-0.5 rounded font-medium', TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600')}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-brand-700 transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{article.subtitle}</p>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">{article.readTime}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
