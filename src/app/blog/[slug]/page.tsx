import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { articles, getArticle, getRelatedArticles } from '@/data/articles';
import HeroImage from '@/components/blog/HeroImage';
import AuthorByline from '@/components/blog/AuthorByline';
import KeyTakeaways from '@/components/blog/KeyTakeaways';
import References from '@/components/blog/References';
import TableOfContents from '@/components/blog/TableOfContents';
import Disclaimer from '@/components/blog/Disclaimer';
import ArticleViewTracker from '@/components/blog/ArticleViewTracker';


const SITE_URL = 'https://www.mygutsy.co.uk';

const CATEGORY_COLORS: Record<string, string> = {
  Supplements: 'bg-indigo-100 text-indigo-700',
  Science:     'bg-violet-100 text-violet-700',
  Evidence:    'bg-emerald-100 text-emerald-700',
  Diet:        'bg-amber-100 text-amber-700',
};

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArticle(params.slug);
  if (!a) return { title: 'Article not found' };
  const url = `${SITE_URL}/blog/${a.slug}`;
  return {
    title: a.title,
    description: a.excerpt,
    keywords: a.keywords,
    alternates: { canonical: `/blog/${a.slug}` },
    authors: [{ name: a.author.name }],
    openGraph: {
      type: 'article',
      url,
      title: a.title,
      description: a.excerpt,
      publishedTime: a.date,
      modifiedTime: a.updatedDate ?? a.date,
      authors: [a.author.name],
      tags: a.keywords,
      images: [{ url: a.heroImage, width: 1600, height: 900, alt: a.heroAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: a.title,
      description: a.excerpt,
      images: [a.heroImage],
    },
  };
}

// Extract H2 sections for ToC based on article's structured content.
// Since `content` is a ReactNode we use a manual TOC field derived from known structure.
// For each article, we'll derive ToC headings by scanning the rendered tree at runtime — but since
// we're server-rendering, we instead ship a lightweight client component that reads DOM ids.

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug, 3);
  const url = `${SITE_URL}/blog/${article.slug}`;

  // ToC derived from H2 id attributes used inside the article content.
  // We maintain this in sync with the article data manually.
  const tocMap: Record<string, { id: string; label: string }[]> = {
    'fodzyme': [
      { id: 'how-it-works', label: 'How it actually works' },
      { id: 'evidence',     label: 'What the research says' },
      { id: 'practical',    label: 'Worth knowing before you buy' },
    ],
    'milkaid': [
      { id: 'fix',                   label: 'The fix' },
      { id: 'enzymes-vs-elimination',label: 'Enzymes vs the elimination diet' },
    ],
    'fructan-vs-gluten': [
      { id: 'why-gluten-free-works', label: 'Why gluten-free still works' },
      { id: 'sourdough',             label: 'The sourdough exception' },
      { id: 'testing',               label: 'What this means for testing' },
    ],
    'inulinase-vs-fructan-hydrolase': [
      { id: 'exo-vs-endo',  label: 'Exo vs endo: how they cut' },
      { id: 'supplements',  label: 'Why this matters for supplements' },
      { id: 'temperature',  label: 'Temperature and pH sensitivity' },
      { id: 'bottom-line',  label: 'The bottom line' },
    ],
    'ttg-iga-celiac-testing': [
      { id: 'what-it-measures',        label: 'What tTG-IgA actually tests for' },
      { id: 'gluten-first',            label: 'You must be eating gluten first' },
      { id: 'iga-deficiency',          label: 'The false negative: IgA deficiency' },
      { id: 'reading-results',         label: 'What the numbers mean' },
      { id: 'after-positive',          label: 'What happens after a positive result' },
      { id: 'already-gone-gluten-free',label: 'If you\'ve already gone gluten-free' },
    ],
    'psyllium-husk': [
      { id: 'standout-study',     label: 'The standout study' },
      { id: 'soluble-vs-insoluble', label: 'Soluble vs insoluble' },
      { id: 'both-subtypes',      label: 'IBS-D and IBS-C both respond' },
      { id: 'fodmap-status',      label: 'Low FODMAP status' },
      { id: 'how-to-take',        label: 'How to actually take it' },
      { id: 'limits',             label: 'What it won\'t do' },
    ],
  };
  const toc = tocMap[article.slug] ?? [];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: article.title,
    description: article.excerpt,
    image: [article.heroImage],
    datePublished: article.date,
    dateModified: article.updatedDate ?? article.date,
    author: { '@type': 'Organization', name: article.author.name, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Gutsy',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-128.png` },
    },
    keywords: article.keywords.join(', '),
    articleSection: article.category,
    citation: article.references.map(r => ({
      '@type': 'CreativeWork',
      name: r.label,
      url: r.url,
      ...(r.authors && { author: r.authors }),
      ...(r.journal && { publisher: { '@type': 'Organization', name: r.journal } }),
      ...(r.year && { datePublished: String(r.year) }),
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: article.title, item: url },
    ],
  };

  return (
    <div className="bg-white">
      <ArticleViewTracker slug={article.slug} category={article.category} />
      {/* Hero */}
      <header className="relative">
        {article.slug.startsWith('is-') ? (
          <div className="h-28 bg-brand-900" />
        ) : (
          <HeroImage src={article.heroImage} alt={article.heroAlt} priority aspect="aspect-[21/9] sm:aspect-[21/8]" />
        )}
        <div className={`max-w-wide mx-auto px-4 sm:px-6 relative z-10 ${article.slug.startsWith('is-') ? '-mt-10' : '-mt-16 lg:-mt-24'}`}>
          <div className="bg-white rounded-2xl shadow-lifted p-6 lg:p-10 border border-gray-100">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <Link href="/blog" className="hover:text-gray-700">Blog</Link>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <span className="text-gray-700 truncate">{article.category}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={clsx('text-2xs font-bold uppercase tracking-widest px-2 py-1 rounded-full', CATEGORY_COLORS[article.category] ?? 'bg-gray-100 text-gray-700')}>
                {article.category}
              </span>
              {article.tags.slice(0, 3).map(t => (
                <span key={t} className="text-2xs font-medium text-gray-500 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5">#{t}</span>
              ))}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              {article.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mt-4 max-w-2xl font-serif italic">
              {article.subtitle}
            </p>

            <AuthorByline
              author={article.author}
              reviewer={article.reviewer}
              date={article.date}
              updatedDate={article.updatedDate}
              readTime={article.readTime}
            />
          </div>
        </div>
      </header>

      {/* Body layout */}
      <div className="max-w-wide mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[1fr_220px] gap-10">
          <article className="min-w-0">
            <KeyTakeaways items={article.takeaways} />

            <div className="prose-article">
              {article.content}
            </div>

            <References items={article.references} />
            <Disclaimer />

            {/* Share / CTA */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900">
                <ArrowLeft className="w-4 h-4" /> All articles
              </Link>
              <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-brand-700 hover:bg-brand-800 rounded-xl px-4 py-2.5">
                Start tracking <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>

          {toc.length > 0 && <TableOfContents items={toc} />}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="text-2xs font-bold text-gray-400 uppercase tracking-widest mb-5">Continue reading</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(a => (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="group block">
                  <HeroImage src={a.heroImage} alt={a.heroAlt} aspect="aspect-[4/3]" className="rounded-xl shadow-card group-hover:shadow-lifted transition-all" />
                  <div className="mt-3">
                    <span className={clsx('text-2xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full', CATEGORY_COLORS[a.category] ?? 'bg-gray-100 text-gray-700')}>{a.category}</span>
                    <h3 className="text-base font-bold text-gray-900 leading-snug mt-2 group-hover:text-brand-800 transition-colors">{a.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{a.readTime} read</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]) }} />
    </div>
  );
}
