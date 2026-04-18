'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getArticle } from '@/data/articles';
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

export default function ArticlePage() {
  const params = useParams();
  const article = getArticle(params.slug as string);

  if (!article) {
    return (
      <div className="px-4 pt-6 text-center">
        <p className="text-gray-400">Article not found.</p>
        <Link href="/blog" className="text-indigo-600 text-sm mt-2 block">← Back to reading</Link>
      </div>
    );
  }

  const dateFormatted = new Date(article.date).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="px-4 pt-5 pb-8">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        Reading
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="text-4xl mb-4">{article.emoji}</div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className={clsx('text-xs px-2 py-0.5 rounded-full font-medium', tagColors[tag] || 'bg-gray-100 text-gray-600')}
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{article.title}</h1>
        <p className="text-base text-gray-500">{article.subtitle}</p>
        <p className="text-xs text-gray-400 mt-3">{dateFormatted} · {article.readTime} read</p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-6" />

      {/* Content */}
      <div className="prose-gutsy">
        {article.content}
      </div>

      {/* Back link */}
      <div className="mt-10 pt-6 border-t border-gray-100">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to reading
        </Link>
      </div>
    </div>
  );
}
