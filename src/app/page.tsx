import Link from 'next/link';
import { ArrowRight, ScanLine, ChefHat, Activity, BarChart2, BookOpen, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

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

      {/* Gradient depth layers */}
      <rect width="1440" height="900" fill="url(#rg1)" />
      <rect width="1440" height="900" fill="url(#rg2)" />
      <rect width="1440" height="900" fill="url(#rg3)" />

      {/* Large organic form — right edge */}
      <path
        d="M1440,0 C1360,0 1180,60 1120,210 C1060,360 1150,490 1130,640 C1110,790 1040,900 1440,900 Z"
        fill="#0c2918"
        opacity="0.95"
      />

      {/* Concentric quarter-circles from top-right corner */}
      <circle cx="1440" cy="0" r="260" fill="none" stroke="#1a5c36" strokeWidth="1" opacity="0.55" />
      <circle cx="1440" cy="0" r="400" fill="none" stroke="#113d24" strokeWidth="1" opacity="0.4" />
      <circle cx="1440" cy="0" r="560" fill="none" stroke="#0c2918" strokeWidth="1.5" opacity="0.45" />
      <circle cx="1440" cy="0" r="720" fill="none" stroke="#0c2918" strokeWidth="1" opacity="0.3" />

      {/* Flowing accent line — left of centre */}
      <path
        d="M580,0 C630,120 680,260 660,420 C640,580 560,660 580,840"
        fill="none" stroke="#113d24" strokeWidth="1" opacity="0.35"
      />
      <path
        d="M680,0 C740,140 790,290 770,460 C750,630 660,710 680,900"
        fill="none" stroke="#0c2918" strokeWidth="1" opacity="0.4"
      />

      {/* Bottom-left accent block */}
      <path
        d="M0,900 C0,720 70,650 50,500 C30,350 -30,280 0,150 L0,900 Z"
        fill="#0c2918"
        opacity="0.65"
      />

      {/* Subtle dot cluster — left mid-section */}
      <g fill="#2d9960">
        <circle cx="170" cy="210" r="2"   opacity="0.35" />
        <circle cx="230" cy="310" r="1.5" opacity="0.28" />
        <circle cx="150" cy="420" r="2"   opacity="0.3"  />
        <circle cx="290" cy="260" r="1.5" opacity="0.22" />
        <circle cx="320" cy="390" r="1"   opacity="0.2"  />
        <circle cx="250" cy="510" r="1.5" opacity="0.25" />
        <circle cx="360" cy="190" r="1"   opacity="0.18" />
        <circle cx="140" cy="570" r="2"   opacity="0.2"  />
        <circle cx="310" cy="620" r="1.5" opacity="0.15" />
        <circle cx="200" cy="670" r="1"   opacity="0.18" />
        <circle cx="420" cy="480" r="1"   opacity="0.15" />
        <circle cx="380" cy="580" r="1.5" opacity="0.12" />
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
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl lg:text-[3.75rem] font-bold text-white leading-[1.08] tracking-tight mb-6">
                Know exactly<br />
                <span className="text-brand-400">what you can eat.</span>
              </h1>
              <p className="text-lg text-brand-200 leading-relaxed mb-10 max-w-md">
                Track your meals and symptoms, scan restaurant menus, and fix recipes — all built around the Monash University low FODMAP diet.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-brand-900 font-semibold rounded-xl hover:bg-brand-50 transition-colors text-sm"
                >
                  Start tracking
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-700 text-brand-200 font-semibold rounded-xl hover:bg-brand-900 hover:border-brand-600 hover:text-white transition-colors text-sm"
                >
                  <ScanLine className="w-4 h-4" />
                  Scan a menu
                </Link>
              </div>
            </div>

            {/* App mockup */}
            <div className="hidden lg:flex justify-end">
              <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl w-[260px]">
                <div className="bg-white rounded-[2rem] overflow-hidden">
                  <div className="bg-brand-900 px-4 pt-4 pb-5">
                    <p className="text-xs text-brand-500 font-medium mb-1">Saturday, 19 Apr</p>
                    <p className="text-white font-bold text-base mb-4">Good morning</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-brand-800 rounded-xl px-3 py-2">
                        <p className="text-xs text-brand-400">Meals</p>
                        <p className="text-white font-bold text-lg">3</p>
                      </div>
                      <div className="bg-brand-800 rounded-xl px-3 py-2">
                        <p className="text-xs text-brand-400">High FODMAP</p>
                        <p className="text-emerald-400 font-bold text-lg">0</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 space-y-2 bg-gray-50">
                    {[
                      { emoji: '🌅', label: 'Breakfast', detail: 'Oats, banana', badge: 'Safe', cls: 'bg-emerald-100 text-emerald-700' },
                      { emoji: '☀️', label: 'Lunch', detail: 'Salmon, rice', badge: 'Safe', cls: 'bg-emerald-100 text-emerald-700' },
                      { emoji: '😣', label: 'Symptoms', detail: 'Bloating 2/10', badge: 'Mild', cls: 'bg-amber-100 text-amber-700' },
                    ].map(({ emoji, label, detail, badge, cls }) => (
                      <div key={label} className="flex items-center gap-2 bg-white rounded-xl p-2.5">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-sm flex-shrink-0">{emoji}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-800">{label}</p>
                          <p className="text-xs text-gray-400 truncate">{detail}</p>
                        </div>
                        <span className={clsx('text-2xs font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0', cls)}>{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="border-b border-gray-100 py-4 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2.5">
            {[
              'Based on Monash University FODMAP research',
              'No account needed for free tools',
              'All data stays on your device',
              'Free to use',
            ].map(item => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                <span className="text-sm text-gray-600 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What it does ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">What it does</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight max-w-xl">
              Three tools for eating with IBS
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Activity,
                title: 'Track meals and symptoms',
                desc: 'Log what you eat, how you feel, and bowel movements. Charts show your FODMAP intake and symptom patterns over time.',
                note: 'Free tracker',
                href: '/dashboard',
              },
              {
                icon: ScanLine,
                title: 'Scan a restaurant menu',
                desc: 'Paste a URL, upload a PDF, or copy the menu text. Each dish is assessed as safe, modify, or avoid — with what to ask the waiter.',
                note: 'Free · no account',
                href: '/menu',
              },
              {
                icon: ChefHat,
                title: 'Fix a recipe',
                desc: 'Paste any recipe and get a FODMAP-safe rewrite. Every high-FODMAP ingredient is replaced with a practical alternative.',
                note: 'Free · no account',
                href: '/recipe',
              },
            ].map(({ icon: Icon, title, desc, note, href }) => (
              <Link key={title} href={href} className="group block">
                <div className="border border-gray-100 rounded-2xl p-6 hover:border-brand-200 hover:shadow-lifted transition-all h-full bg-gray-50 hover:bg-white">
                  <div className="w-10 h-10 bg-brand-700 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">{desc}</p>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    {note}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free tools ── */}
      <section className="py-24 bg-brand-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">Try without an account</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight max-w-xl">
              The free tools
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Link href="/menu" className="group bg-brand-900 border border-brand-800 rounded-2xl p-8 hover:border-brand-600 transition-all">
              <ScanLine className="w-7 h-7 text-brand-400 mb-5" />
              <h3 className="text-xl font-bold text-white mb-2">Menu scanner</h3>
              <p className="text-brand-300 text-sm leading-relaxed mb-6">
                Paste a restaurant URL or upload their PDF. Each dish is rated safe, modify, or avoid — with specific modification requests.
              </p>
              <span className="inline-flex items-center gap-1.5 text-brand-400 text-sm font-semibold group-hover:text-white transition-colors">
                Scan a menu <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/recipe" className="group bg-brand-900 border border-brand-800 rounded-2xl p-8 hover:border-brand-600 transition-all">
              <ChefHat className="w-7 h-7 text-brand-400 mb-5" />
              <h3 className="text-xl font-bold text-white mb-2">Recipe fixer</h3>
              <p className="text-brand-300 text-sm leading-relaxed mb-6">
                Paste any recipe. Every high-FODMAP ingredient gets a swap with a brief explanation, and the full method is rewritten.
              </p>
              <span className="inline-flex items-center gap-1.5 text-brand-400 text-sm font-semibold group-hover:text-white transition-colors">
                Fix a recipe <ArrowRight className="w-4 h-4" />
              </span>
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
              Built for the elimination and reintroduction phases
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                num: '01',
                icon: Activity,
                title: 'Log meals and symptoms',
                desc: 'One-tap logging for meals, symptoms, and bowel movements. Search from the FODMAP database or free-type.',
              },
              {
                num: '02',
                icon: BarChart2,
                title: 'Spot the patterns',
                desc: 'Symptom charts and FODMAP intake graphs across your elimination and reintroduction phases.',
              },
              {
                num: '03',
                icon: BookOpen,
                title: 'Read the research',
                desc: 'Articles on enzymes, supplements, and the FODMAP science — written plainly without the hype.',
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
              { emoji: '🧪', tag: 'Enzymes', title: 'FODzyme: does the enzyme actually work?', href: '/blog/fodzyme' },
              { emoji: '🥛', tag: 'Supplements', title: 'Milkaid without the raspberry flavouring', href: '/blog/milkaid' },
              { emoji: '🌾', tag: 'Science', title: 'Fructan sensitivity vs gluten intolerance', href: '/blog/fructan-vs-gluten' },
            ].map(({ emoji, tag, title, href }) => (
              <Link key={href} href={href} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-brand-200 hover:shadow-lifted transition-all">
                <span className="text-2xl mb-4 block">{emoji}</span>
                <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">{tag}</p>
                <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-brand-700 transition-colors">{title}</h3>
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
                Built on Monash University low FODMAP research. Not a substitute for medical advice.
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
