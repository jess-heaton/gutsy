import Link from 'next/link';
import { ArrowRight, ScanLine, ChefHat, Activity, Search, Share2, Users, BarChart2, BookOpen, CheckCircle, Utensils, QrCode } from 'lucide-react';
import HeroPrompt from '@/components/HeroPrompt';
import RestaurantCarousel from '@/components/RestaurantCarousel';
import PublicCookbook from '@/components/PublicCookbook';
import RecipeReels from '@/components/RecipeReels';

const SITE_URL = 'https://gutsy.freedible.co.uk';

const FAQS = [
  {
    q: 'What is the low-FODMAP diet?',
    a: 'A three-phase elimination diet developed by Monash University for IBS. Phase 1 removes high-FODMAP foods for 2–6 weeks. Phase 2 reintroduces each FODMAP group one at a time to find your triggers. Phase 3 is a personalised long-term diet that only restricts the FODMAPs you actually react to.',
  },
  {
    q: 'Is Gutsy free?',
    a: 'The menu scanner, recipe fixer and food guide are completely free — no account needed. The meal and symptom tracker is also free; you just need a free account so your data syncs across devices.',
  },
  {
    q: 'Do you use real Monash FODMAP data?',
    a: 'Yes. Gutsy is built around Monash University FODMAP research and follows their three-phase protocol. We\'re not affiliated with Monash and don\'t republish their proprietary database. For definitive per-serving thresholds, use the official Monash app alongside Gutsy.',
  },
  {
    q: 'How does the menu scanner work?',
    a: 'Paste a restaurant URL, upload their PDF, or paste the menu text. Gutsy fetches the actual menu from the restaurant\'s site, then rates every dish safe, modify, or avoid — with the exact words to use when ordering.',
  },
  {
    q: 'Can Gutsy replace my dietitian?',
    a: 'No. Gutsy helps you track, log and stay consistent between appointments — but the low-FODMAP diet should be done under a qualified dietitian\'s guidance, especially during reintroduction.',
  },
];

const RECIPE_EXAMPLES = [
  {
    name: 'Spaghetti Bolognese',
    swaps: ['Garlic → garlic-infused oil', 'Onion → green tops of spring onion', 'Regular pasta → gluten-free pasta'],
    tag: 'Italian',
  },
  {
    name: 'Thai Green Curry',
    swaps: ['Shallots → chives', 'Garlic → garlic-infused oil', 'Regular milk → coconut cream (½ tin max)'],
    tag: 'Asian',
  },
  {
    name: 'Caesar Salad',
    swaps: ['Regular croutons → GF bread croutons', 'Garlic dressing → garlic-infused oil base', 'Parmesan → fine (low-lactose in small amounts)'],
    tag: 'Salad',
  },
];

function HeroBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="rg1" cx="85%" cy="10%" r="60%">
          <stop offset="0%" stopColor="#1a5c36" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#071a0f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rg2" cx="5%" cy="95%" r="45%">
          <stop offset="0%" stopColor="#237a49" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#071a0f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rg3" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#0c2918" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#071a0f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#rg1)" />
      <rect width="1440" height="900" fill="url(#rg2)" />
      <rect width="1440" height="900" fill="url(#rg3)" />
      <path
        d="M1440,0 C1360,0 1180,60 1120,210 C1060,360 1150,490 1130,640 C1110,790 1040,900 1440,900 Z"
        fill="#0c2918" opacity="0.95"
      />
      <circle cx="1440" cy="0" r="260" fill="none" stroke="#1a5c36" strokeWidth="1" opacity="0.55" />
      <circle cx="1440" cy="0" r="400" fill="none" stroke="#113d24" strokeWidth="1" opacity="0.4" />
      <circle cx="1440" cy="0" r="560" fill="none" stroke="#0c2918" strokeWidth="1.5" opacity="0.45" />
      <circle cx="1440" cy="0" r="720" fill="none" stroke="#0c2918" strokeWidth="1" opacity="0.3" />
      <path d="M580,0 C630,120 680,260 660,420 C640,580 560,660 580,840" fill="none" stroke="#113d24" strokeWidth="1" opacity="0.35" />
      <path d="M680,0 C740,140 790,290 770,460 C750,630 660,710 680,900" fill="none" stroke="#0c2918" strokeWidth="1" opacity="0.4" />
      <path d="M0,900 C0,720 70,650 50,500 C30,350 -30,280 0,150 L0,900 Z" fill="#0c2918" opacity="0.65" />
      <g fill="#2d9960">
        <circle cx="170" cy="210" r="2" opacity="0.35" />
        <circle cx="230" cy="310" r="1.5" opacity="0.28" />
        <circle cx="150" cy="420" r="2" opacity="0.3" />
        <circle cx="290" cy="260" r="1.5" opacity="0.22" />
        <circle cx="320" cy="390" r="1" opacity="0.2" />
        <circle cx="250" cy="510" r="1.5" opacity="0.25" />
        <circle cx="360" cy="190" r="1" opacity="0.18" />
        <circle cx="140" cy="570" r="2" opacity="0.2" />
        <circle cx="310" cy="620" r="1.5" opacity="0.15" />
        <circle cx="200" cy="670" r="1" opacity="0.18" />
      </g>
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative bg-brand-950 overflow-hidden min-h-[88vh] flex items-center">
        <HeroBg />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 w-full flex flex-col items-center text-center">
          <h1 className="text-5xl lg:text-[4rem] font-bold text-white leading-[1.05] tracking-tight mb-5">
            Eating out with IBS<br />
            <span className="text-brand-400">doesn't have to be stressful.</span>
          </h1>
          <p className="text-lg text-brand-200 leading-relaxed mb-10 max-w-xl">
            Gutsy scans restaurant menus dish by dish, fixes your favourite recipes, and tracks your gut — all built around the Monash low-FODMAP diet.
          </p>
          <HeroPrompt />
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="border-b border-gray-100 py-4 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2.5">
            {[
              'Built on Monash University FODMAP research',
              'Menu scanner finds the right menu automatically',
              'Free to use · no account needed',
              'Works with any restaurant URL, PDF, or text',
            ].map(item => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                <span className="text-sm text-gray-600 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recipe reels ── */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-6">
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-2">Recipe inspiration</p>
            <h2 className="text-2xl font-bold text-gray-900">Recipes you can make FODMAP-safe</h2>
            <p className="text-sm text-gray-500 mt-1">Tap any reel — we'll fix the recipe for you instantly.</p>
          </div>
          <RecipeReels />
        </div>
      </section>

      {/* ── Restaurant carousel ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-2">Real scans</p>
              <h2 className="text-2xl font-bold text-gray-900">Restaurants people have scanned</h2>
              <p className="text-sm text-gray-500 mt-1">Click any to see the full dish-by-dish breakdown.</p>
            </div>
            <Link href="/menu" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 flex-shrink-0">
              Scan a restaurant <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <RestaurantCarousel />
          <div className="mt-14 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <ScanLine className="w-4 h-4" />
              Scan your restaurant
            </Link>
          </div>
        </div>
      </section>

      {/* ── You are not alone ── */}
      <section className="py-20 bg-brand-950 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-5">Community</p>
              <h2 className="text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6">
                You are<br />not alone.
              </h2>
              <p className="text-brand-200 text-lg leading-relaxed mb-4">
                We started Gutsy because we know what it's like living with IBS — the anxiety before every restaurant, the mental load of scanning every ingredient, the awkward explanations to friends.
              </p>
              <p className="text-brand-300 text-base leading-relaxed mb-8">
                Over 1 in 7 people live with it. Most just quietly stop going out. Gutsy gives you the tools to live freely — without IBS defining your social life.
              </p>
              <Link
                href="/mission"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Our mission <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Kodak disposable photo */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative bg-white p-2.5 pb-10 shadow-2xl"
                style={{ borderRadius: '4px 24px 4px 24px', transform: 'rotate(-1.5deg)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ingredient-check.png"
                  alt="Friends checking ingredients in a grocery store"
                  className="w-72 h-80 object-cover"
                  style={{ borderRadius: '2px 18px 2px 18px' }}
                />
                <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-400 font-medium tracking-wide" style={{ fontFamily: 'monospace' }}>
                  gut check ✓
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tools you need ── */}
      <section className="py-20 bg-brand-950 border-t border-brand-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">What we built</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              The tools you need to be Gutsy.
            </h2>
          </div>

          {/* Horizontal scrollable glassmorphism tiles */}
          <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
            {[
              {
                icon: ScanLine,
                title: 'Scan a menu',
                desc: 'Paste any restaurant URL. Gutsy finds the real menu and rates every dish safe, modify, or avoid — with exact words to use when ordering.',
                badge: 'Free · no account',
                href: '/menu',
              },
              {
                icon: ChefHat,
                title: 'Fix a recipe',
                desc: 'Paste any recipe and get a fully rewritten FODMAP-safe version with practical swaps, not just a list of things to remove.',
                badge: 'Free · no account',
                href: '/recipe',
              },
              {
                icon: Activity,
                title: 'Track your gut',
                desc: 'Log meals, symptoms, and bowel movements. Charts show your FODMAP intake and symptom patterns so you find your real triggers.',
                badge: 'Free tracker',
                href: '/dashboard',
              },
              {
                icon: Search,
                title: 'Search foods',
                desc: 'Instant low / moderate / high FODMAP lookup for 200+ foods with serving sizes and category breakdowns — based on Monash research.',
                badge: 'Free · no account',
                href: '/foods',
              },
              {
                icon: Share2,
                title: 'Share with your dietitian',
                desc: 'Generate a clean summary of your logs, flares, and patterns to bring to your next gastro or dietitian appointment.',
                badge: 'Coming soon',
                href: '/share/dietitian',
              },
              {
                icon: QrCode,
                title: 'Share with friends',
                desc: "Going to a friend's for dinner? Share a QR code with your sensitivities, safe foods, and favourite recipes — so they can cook for you with confidence.",
                badge: 'Coming soon',
                href: '/share/friends',
              },
            ].map(({ icon: Icon, title, desc, badge, href }) => (
              <Link
                key={title}
                href={href}
                className="group flex-shrink-0 w-64 bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/12 hover:border-white/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-600/30 border border-brand-500/30 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-300" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                <p className="text-xs text-brand-300 leading-relaxed mb-4">{desc}</p>
                <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/60">{badge}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recipe fixer showcase ── */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">Recipe fixer</p>
              <h2 className="text-3xl font-bold text-gray-900">Your favourite dishes, FODMAP-safe</h2>
              <p className="text-sm text-gray-500 mt-2 max-w-md">Paste any recipe — Gutsy rewrites it with practical swaps, not just a list of things to avoid.</p>
            </div>
            <Link href="/recipe" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 flex-shrink-0">
              Fix a recipe <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {RECIPE_EXAMPLES.map(({ name, swaps, tag }) => (
              <div key={name} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-brand-200 hover:shadow-lifted transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-100 text-brand-700">{tag}</span>
                  <Utensils className="w-4 h-4 text-gray-300" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-4">{name}</h3>
                <div className="space-y-2">
                  {swaps.map(swap => {
                    const [before, after] = swap.split(' → ');
                    return (
                      <div key={swap} className="flex items-start gap-2 text-xs">
                        <span className="text-red-500 line-through text-gray-400 flex-shrink-0 pt-px">{before}</span>
                        <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0 mt-px" />
                        <span className="text-emerald-700 font-medium">{after}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link href="/recipe" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
              Fix a recipe <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── The tracker ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">The tracker</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight max-w-xl">
              Know your triggers, not just the common ones
            </h2>
            <p className="text-gray-500 text-sm mt-3 max-w-lg">Everyone's gut is different. The tracker helps you find your personal FODMAP threshold — so you're not avoiding things you don't need to.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                num: '01',
                icon: Activity,
                title: 'Log meals and symptoms',
                desc: 'One-tap logging for meals, symptoms, and bowel movements. Search from the FODMAP database or free-type anything.',
              },
              {
                num: '02',
                icon: BarChart2,
                title: 'Spot the patterns',
                desc: 'Symptom charts and FODMAP intake graphs across your elimination and reintroduction phases — all in one place.',
              },
              {
                num: '03',
                icon: BookOpen,
                title: 'Read the research',
                desc: 'Plain-English articles on enzymes, supplements, and the FODMAP science — written without the noise.',
              },
            ].map(({ num, icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-5">
                <span className="text-4xl font-bold text-gray-100 leading-none flex-shrink-0 font-mono tabular-nums">{num}</span>
                <div>
                  <Icon className="w-5 h-5 text-brand-600 mb-3" />
                  <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors text-sm"
            >
              Open the tracker <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">Common questions</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-base font-semibold text-gray-900 pr-8">{q}</span>
                  <span className="text-brand-600 text-xl group-open:rotate-45 transition-transform leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Structured data for SEO ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Gutsy',
              url: SITE_URL,
              description: 'IBS diary and low-FODMAP tracker. Log meals and symptoms, scan restaurant menus, and fix recipes for the Monash low-FODMAP diet.',
              applicationCategory: 'HealthApplication',
              operatingSystem: 'Web, Chrome',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
              featureList: [
                'Low-FODMAP meal and symptom tracker',
                'Restaurant menu scanner',
                'Recipe FODMAP fixer',
                'FODMAP food guide',
                'FODMAP food guide',
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Gutsy',
              url: SITE_URL,
              logo: `${SITE_URL}/icon-128.png`,
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQS.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            },
          ]),
        }}
      />

      {/* ── Blog ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">Blog</p>
              <h2 className="text-3xl font-bold text-gray-900">From the research</h2>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900">
              All posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=1000&q=80', alt: 'Fresh garlic and onions', tag: 'Supplements', title: 'FODzyme: can you actually eat garlic and onion again?', href: '/blog/fodzyme' },
              { image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1000&q=80', alt: 'A glass of milk', tag: 'Supplements', title: 'The Milkaid thing nobody tells you', href: '/blog/milkaid' },
              { image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80', alt: 'Fresh sourdough bread', tag: 'Science', title: 'It was probably the fructans, not the gluten', href: '/blog/fructan-vs-gluten' },
            ].map(({ image, alt, tag, title, href }) => (
              <Link key={href} href={href} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-brand-200 hover:shadow-lifted transition-all">
                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-brand-900 to-brand-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">{tag}</p>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-brand-700 transition-colors">{title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 md:hidden">
            <Link href="/blog" className="flex items-center gap-1.5 text-sm font-semibold text-brand-700">
              All posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-brand-950 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            <div>
              <div className="font-display text-3xl text-white mb-3">gutsy</div>
              <p className="text-sm text-brand-500 max-w-xs leading-relaxed">
                Built on Monash University low-FODMAP research. Not a substitute for medical advice.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-14 gap-y-8">
              <div>
                <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-4">Free tools</p>
                <div className="space-y-2.5">
                  <Link href="/menu"   className="block text-sm text-brand-400 hover:text-white transition-colors">Menu scanner</Link>
                  <Link href="/recipe" className="block text-sm text-brand-400 hover:text-white transition-colors">Recipe fixer</Link>
                  <Link href="/foods"  className="block text-sm text-brand-400 hover:text-white transition-colors">Food guide</Link>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-4">Tracker</p>
                <div className="space-y-2.5">
                  <Link href="/dashboard" className="block text-sm text-brand-400 hover:text-white transition-colors">Today</Link>
                  <Link href="/log"       className="block text-sm text-brand-400 hover:text-white transition-colors">Log entry</Link>
                  <Link href="/insights"  className="block text-sm text-brand-400 hover:text-white transition-colors">Insights</Link>
                  <Link href="/settings"  className="block text-sm text-brand-400 hover:text-white transition-colors">Settings</Link>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-4">Blog</p>
                <div className="space-y-2.5">
                  <Link href="/blog" className="block text-sm text-brand-400 hover:text-white transition-colors">All posts</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-brand-900 mt-12 pt-6">
            <p className="text-xs text-brand-800">© 2025 Gutsy. FODMAP data based on Monash University research.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
