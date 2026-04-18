'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, BarChart2, Settings, Plus, BookMarked, ExternalLink, ScanLine, ChefHat } from 'lucide-react';
import clsx from 'clsx';

const primary = [
  { href: '/',         icon: Home,       label: 'Today'    },
  { href: '/foods',    icon: BookOpen,   label: 'Foods'    },
  { href: '/insights', icon: BarChart2,  label: 'Insights' },
];

const tools = [
  { href: '/menu',    icon: ScanLine,  label: 'Menu scanner' },
  { href: '/recipe',  icon: ChefHat,   label: 'Recipe fixer' },
];

const secondary = [
  { href: '/blog',     icon: BookMarked, label: 'Reading'  },
  { href: '/settings', icon: Settings,   label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  if (pathname?.startsWith('/popup')) return null;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[240px] bg-brand-900 text-white z-40">
      {/* Brand */}
      <div className="px-6 pt-7 pb-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-sm leading-none">G</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">Gutsy</span>
        </Link>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {primary.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                active
                  ? 'bg-brand-700 text-white'
                  : 'text-brand-200 hover:bg-brand-800 hover:text-white',
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={active ? 2.5 : 2} />
              {label}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400" />}
            </Link>
          );
        })}

        {/* Log button */}
        <Link
          href="/log"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold mt-2 bg-brand-600 hover:bg-brand-500 text-white transition-all"
        >
          <Plus className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
          Log entry
        </Link>

        <div className="my-4 border-t border-brand-800" />

        <p className="px-3 text-2xs font-semibold text-brand-600 uppercase tracking-widest mb-1">Tools</p>
        {tools.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                active
                  ? 'bg-brand-700 text-white'
                  : 'text-brand-300 hover:bg-brand-800 hover:text-white',
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}

        <div className="my-4 border-t border-brand-800" />

        {secondary.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                active
                  ? 'bg-brand-700 text-white'
                  : 'text-brand-300 hover:bg-brand-800 hover:text-white',
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / popup launcher */}
      <div className="px-3 pb-6 space-y-3">
        <div className="border-t border-brand-800 pt-4">
          <button
            onClick={() => window.open('/popup', 'gutsy-popup', 'width=390,height=540,toolbar=0,menubar=0,location=0,resizable=1')}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-brand-400 hover:text-white hover:bg-brand-800 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            Open quick-log popup
          </button>
        </div>
        <div className="px-3">
          <p className="text-2xs text-brand-700 leading-relaxed">
            Based on Monash University FODMAP research
          </p>
        </div>
      </div>
    </aside>
  );
}
