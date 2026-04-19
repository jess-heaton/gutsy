'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getArticle, articles } from '@/data/articles';
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

export default function ArticlePage() {
  const params  = useParams();
  const article = getArticle(params.slug as string);

  if (!article) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-sm">Article not found.</p>
        <Link href="/blog" className="text-brand-700 text-sm mt-2 inline-block">← Back to reading</Link>
      </div>
    );
  }

  const dateStr = new Date(article.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
  const related = articles.filter(a => a.slug !== article.slug && a.tags.some(t => article.tags.includes(t))).slice(0, 2);

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 lg:py-12 pb-20 lg:pb-12">
      {/* Back */}
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-8 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Reading
      </Link>

      {/* Article header */}
      <header className="mb-8">
        <div className="text-5xl mb-5">{article.emoji}</div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.map(tag => (
            <span key={tag} className={clsx('text-xs px-2 py-0.5 rounded-full font-medium', TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600')}>
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-3">{article.title}</h1>
        <p className="text-base text-gray-600 leading-relaxed">{article.subtitle}</p>
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400">{dateStr}</span>
          <span className="text-gray-200">·</span>
          <span className="text-xs text-gray-400">{article.readTime} read</span>
        </div>
      </header>

      {/* Body */}
      <div className="prose-article">
        {article.content}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Related reading</h3>
          <div className="space-y-3">
            {related.map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                <span className="text-xl">{a.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{a.title}</p>
                  <p className="text-xs text-gray-400">{a.readTime} read</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-gray-300 rotate-180 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-gray-100">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-900">
          <ArrowLeft className="w-4 h-4" /> Back to reading
        </Link>
      </div>
    </div>
  );
}
