'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Plus, BarChart2, BookMarked } from 'lucide-react';
import clsx from 'clsx';

const items = [
  { href: '/',         icon: Home,       label: 'Today'    },
  { href: '/foods',    icon: BookOpen,   label: 'Foods'    },
  { href: '/log',      icon: Plus,       label: 'Log',     special: true },
  { href: '/blog',     icon: BookMarked, label: 'Read'     },
  { href: '/insights', icon: BarChart2,  label: 'Insights' },
];

export default function BottomNav() {
  const pathname = usePathname();
  if (pathname?.startsWith('/popup')) return null;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around px-2 py-1">
        {items.map(({ href, icon: Icon, label, special }) => {
          const active = href === '/' ? pathname === '/' : pathname?.startsWith(href);
          if (special) {
            return (
              <Link key={href} href={href} className="flex flex-col items-center -mt-4" aria-label={label}>
                <span className="w-12 h-12 rounded-full bg-brand-700 flex items-center justify-center shadow-lifted">
                  <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                </span>
                <span className="text-2xs text-gray-500 mt-0.5 font-medium">{label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors',
                active ? 'text-brand-700' : 'text-gray-400',
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
              <span className="text-2xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
      <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
    </nav>
  );
}
