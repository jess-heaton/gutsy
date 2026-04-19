import Link from 'next/link';
import { ArrowRight, ScanLine, ChefHat, Activity, BarChart2, BookOpen, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative bg-brand-950 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-900 border border-brand-800 rounded-full px-3.5 py-1.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse flex-shrink-0" />
                <span className="text-xs font-medium text-brand-300">Based on Monash University FODMAP research</span>
              </div>
              <h1 className="text-5xl lg:text-[3.75rem] font-bold text-white leading-[1.08] tracking-tight mb-6">
                Know exactly<br />
                <span className="text-brand-400">what you can eat.</span>
              </h1>
              <p className="text-lg text-brand-200 leading-relaxed mb-10 max-w-md">
                Track meals and symptoms, scan restaurant menus, and fix any recipe for FODMAP safety — all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-brand-900 font-semibold rounded-xl hover:bg-brand-50 transition-colors text-sm"
                >
                  Start tracking — it&apos;s free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-700 text-brand-200 font-semibold rounded-xl hover:bg-brand-900 hover:text-white transition-colors text-sm"
                >
                  <ScanLine className="w-4 h-4" />
                  Scan a menu free
                </Link>
              </div>
              <p className="text-xs text-brand-700 mt-4">Menu scanning and recipe fixing require no account.</p>
            </div>

            {/* App preview mockup */}
            <div className="hidden lg:flex justify-end">
              <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl w-[260px]">
                <div className="bg-white rounded-[2rem] overflow-hidden">
                  <div className="bg-brand-900 px-4 pt-4 pb-5">
                    <p className="text-xs text-brand-500 font-medium mb-1">Saturday, 19 Apr</p>
                    <p className="text-white font-bold text-base mb-4">Good morning</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Meals', value: '3', color: 'text-white' },
                        { label: 'High FODMAP', value: '0', color: 'text-emerald-400' },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="bg-brand-800 rounded-xl px-3 py-2">
                          <p className="text-xs text-brand-400">{label}</p>
                          <p className={clsx('font-bold text-lg', color)}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 space-y-2 bg-gray-50">
                    {[
                      { emoji: '🌅', label: 'Breakfast', detail: 'Oats, banana', badge: 'Safe', badgeClass: 'bg-emerald-100 text-emerald-700' },
                      { emoji: '☀️', label: 'Lunch', detail: 'Salmon, rice', badge: 'Safe', badgeClass: 'bg-emerald-100 text-emerald-700' },
                      { emoji: '😣', label: 'Symptoms', detail: 'Bloating 2/10', badge: 'Mild', badgeClass: 'bg-amber-100 text-amber-700' },
                    ].map(({ emoji, label, detail, badge, badgeClass }) => (
                      <div key={label} className="flex items-center gap-2 bg-white rounded-xl p-2.5">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-sm flex-shrink-0">{emoji}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-800">{label}</p>
                          <p className="text-xs text-gray-400 truncate">{detail}</p>
                        </div>
                        <span className={clsx('text-2xs font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0', badgeClass)}>{badge}</span>
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
              'Based on Monash University research',
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

      {/* ── What Gutsy does ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">What Gutsy does</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight max-w-xl">
              Everything you need to manage IBS with confidence
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Activity,
                title: 'Track meals and symptoms',
                desc: 'Log what you eat, how you feel, and bowel movements. See patterns emerge with FODMAP charts and symptom graphs.',
                note: 'Free tracker',
                free: true,
                href: '/dashboard',
              },
              {
                icon: ScanLine,
                title: 'Scan any restaurant menu',
                desc: 'Paste a URL, upload a PDF, or paste the menu text. Get a dish-by-dish breakdown — safe, modify, or avoid.',
                note: 'Free · no account',
                free: true,
                href: '/menu',
              },
              {
                icon: ChefHat,
                title: 'Fix any recipe',
                desc: 'Drop in a recipe. Get every high-FODMAP ingredient swapped out and the full method rewritten for FODMAP safety.',
                note: 'Free · no account',
                free: true,
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

      {/* ── Free tools CTA ── */}
      <section className="py-24 bg-brand-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">Try it now, free</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight max-w-xl">
              No account. No credit card. Just answers.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Link href="/menu" className="group bg-brand-900 border border-brand-800 rounded-2xl p-8 hover:border-brand-600 transition-all">
              <ScanLine className="w-7 h-7 text-brand-400 mb-5" />
              <h3 className="text-xl font-bold text-white mb-2">Menu scanner</h3>
              <p className="text-brand-300 text-sm leading-relaxed mb-6">
                Paste a restaurant URL or upload their PDF. We&apos;ll tell you exactly what to order, what to modify, and what to avoid.
              </p>
              <span className="inline-flex items-center gap-1.5 text-brand-400 text-sm font-semibold group-hover:text-white transition-colors">
                Scan a menu <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/recipe" className="group bg-brand-900 border border-brand-800 rounded-2xl p-8 hover:border-brand-600 transition-all">
              <ChefHat className="w-7 h-7 text-brand-400 mb-5" />
              <h3 className="text-xl font-bold text-white mb-2">Recipe fixer</h3>
              <p className="text-brand-300 text-sm leading-relaxed mb-6">
                Paste any recipe — we&apos;ll identify every high-FODMAP ingredient and rewrite the whole thing with practical safe swaps.
              </p>
              <span className="inline-flex items-center gap-1.5 text-brand-400 text-sm font-semibold group-hover:text-white transition-colors">
                Fix a recipe <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── How tracking works ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">The tracker</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight max-w-xl">
              See what your gut is actually telling you
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                num: '01',
                icon: Activity,
                title: 'Log meals and symptoms',
                desc: 'Quick one-tap logging for meals, symptoms, and bowel movements. Free-text or pick from the FODMAP food guide.',
              },
              {
                num: '02',
                icon: BarChart2,
                title: 'Spot the patterns',
                desc: 'Symptom charts, FODMAP intake graphs, and bowel tracking — built around the elimination and reintroduction phases.',
              },
              {
                num: '03',
                icon: BookOpen,
                title: 'Learn as you go',
                desc: 'Evidence-based articles on enzymes, supplements, and the science behind the FODMAP diet. No fluff.',
              },
            ].map(({ num, icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-5">
                <span className="text-4xl font-bold text-gray-100 leading-none flex-shrink-0 font-mono">{num}</span>
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
              Start tracking — it&apos;s free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Blog preview ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-3">From the reading list</p>
              <h2 className="text-3xl font-bold text-gray-900">Research you can actually use</h2>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900">
              All articles <ArrowRight className="w-4 h-4" />
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
              All articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-brand-950 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-brand-700 flex items-center justify-center">
                  <span className="text-white font-black text-xs">G</span>
                </div>
                <span className="font-bold text-white text-base">Gutsy</span>
              </div>
              <p className="text-sm text-brand-500 max-w-xs leading-relaxed">
                IBS management tools built on Monash University low FODMAP research. Not medical advice.
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
                <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-4">Reading</p>
                <div className="space-y-2.5">
                  <Link href="/blog" className="block text-sm text-brand-400 hover:text-white transition-colors">All articles</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-brand-900 mt-12 pt-6">
            <p className="text-xs text-brand-800">© 2025 Gutsy. FODMAP data based on Monash University research. Not a substitute for medical advice.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
