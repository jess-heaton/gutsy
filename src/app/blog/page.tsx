import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import { articles } from '@/data/articles';
import HeroImage from '@/components/blog/HeroImage';

const SITE_URL = 'https://www.mygutsy.co.uk';

export const metadata: Metadata = {
  title: 'Blog — Evidence-based articles on IBS, FODMAPs and the gut',
  description:
    'Long-form articles on the science of IBS, the low-FODMAP diet, digestive enzymes and gut-health supplements — all based on peer-reviewed research, not marketing copy.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blog`,
    title: 'Gutsy Blog — Evidence-based articles on IBS and the FODMAP diet',
    description:
      'Long-form, research-backed articles on IBS, the low-FODMAP diet, enzymes and supplements. Written and reviewed for accuracy.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gutsy Blog — IBS and the FODMAP diet, backed by the evidence',
    description: 'Long-form, research-backed articles on IBS, the low-FODMAP diet, enzymes and supplements.',
    images: ['/og.png'],
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Supplements: 'bg-indigo-100 text-indigo-700',
  Science:     'bg-violet-100 text-violet-700',
  Evidence:    'bg-emerald-100 text-emerald-700',
  Diet:        'bg-amber-100 text-amber-700',
};

export default function BlogPage() {
  const [featured, ...rest] = articles;
  const categories = Array.from(new Set(articles.map(a => a.category)));

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Gutsy Blog',
    url: `${SITE_URL}/blog`,
    description: 'Evidence-based articles on IBS, the low-FODMAP diet, and gut-health supplements.',
    publisher: { '@type': 'Organization', name: 'Gutsy', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-128.png` } },
    blogPost: articles.map(a => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      datePublished: a.date,
      dateModified: a.updatedDate ?? a.date,
      author: { '@type': 'Organization', name: a.author.name },
      image: a.heroImage,
      url: `${SITE_URL}/blog/${a.slug}`,
      keywords: a.keywords.join(', '),
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <div className="bg-white">
      {/* Hero header */}
      <header className="border-b border-gray-100 bg-gradient-to-b from-brand-50/40 to-white">
        <div className="max-w-wide mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-700 uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            The Gutsy Blog
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight max-w-2xl">
            Evidence-based writing on IBS, FODMAPs and the gut.
          </h1>
          <p className="text-base text-gray-600 leading-relaxed mt-4 max-w-xl">
            Long-form articles built from peer-reviewed research and current Monash University guidance — plain-English, no supplement ads, every claim sourced.
          </p>
        </div>
      </header>

      <div className="max-w-wide mx-auto px-4 sm:px-6 py-10 lg:py-14 space-y-14">
        {/* Featured */}
        <Link href={`/blog/${featured.slug}`} className="group block">
          <article className="grid md:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="md:order-2">
              <HeroImage src={featured.heroImage} alt={featured.heroAlt} priority aspect="aspect-[4/3]" className="rounded-2xl shadow-card group-hover:shadow-lifted transition-shadow" />
            </div>
            <div className="md:order-1">
              <div className="flex items-center gap-2 mb-3">
                <span className={clsx('text-2xs font-bold uppercase tracking-widest px-2 py-1 rounded-full', CATEGORY_COLORS[featured.category] ?? 'bg-gray-100 text-gray-700')}>
                  Featured · {featured.category}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight tracking-tight group-hover:text-brand-800 transition-colors">
                {featured.title}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mt-3 line-clamp-3">{featured.excerpt}</p>
              <div className="flex items-center gap-3 mt-5 text-sm text-gray-500">
                <span className="font-medium">{featured.author.name}</span>
                <span className="text-gray-300">·</span>
                <time dateTime={featured.date}>{new Date(featured.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                <span className="text-gray-300">·</span>
                <span>{featured.readTime} read</span>
              </div>
              <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-brand-700 group-hover:text-brand-900">
                Read the article <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </article>
        </Link>

        {/* Category strip */}
        <div className="flex flex-wrap items-center gap-2 border-y border-gray-100 py-5">
          <span className="text-2xs font-bold text-gray-400 uppercase tracking-widest mr-2">Browse</span>
          {categories.map(cat => (
            <span key={cat} className={clsx('text-xs font-semibold px-3 py-1.5 rounded-full', CATEGORY_COLORS[cat] ?? 'bg-gray-100 text-gray-700')}>
              {cat}
            </span>
          ))}
        </div>

        {/* Article grid */}
        <section>
          <h2 className="text-2xs font-bold text-gray-400 uppercase tracking-widest mb-5">All articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="group block">
                <article>
                  <HeroImage src={a.heroImage} alt={a.heroAlt} aspect="aspect-[4/3]" className="rounded-xl shadow-card group-hover:shadow-lifted transition-all group-hover:-translate-y-0.5" />
                  <div className="mt-4">
                    <span className={clsx('text-2xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full', CATEGORY_COLORS[a.category] ?? 'bg-gray-100 text-gray-700')}>
                      {a.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug mt-3 tracking-tight group-hover:text-brand-800 transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mt-2 line-clamp-2">{a.excerpt}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                      <time dateTime={a.date}>{new Date(a.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                      <span>·</span>
                      <span>{a.readTime} read</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Editorial note */}
        <section className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-2xl p-6 lg:p-8">
          <h2 className="text-base font-bold text-gray-900 mb-2">Our editorial standards</h2>
          <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
            Every article is written against primary sources — clinical trials, Monash University FODMAP research, and peer-reviewed gastroenterology journals. We don't accept paid placements or affiliate commissions from supplement brands, and each article is dated and updated as the evidence changes.
          </p>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([blogJsonLd, breadcrumbJsonLd]) }} />
    </div>
  );
}
