'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, BarChart2, Settings, PlusCircle } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/', icon: Home, label: 'Today' },
  { href: '/foods', icon: BookOpen, label: 'Foods' },
  { href: '/log', icon: PlusCircle, label: 'Log', special: true },
  { href: '/insights', icon: BarChart2, label: 'Insights' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-nav">
      <div className="flex items-center justify-around px-2 py-1 max-w-lg mx-auto">
        {navItems.map(({ href, icon: Icon, label, special }) => {
          const active = pathname === href;
          if (special) {
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center -mt-5"
                aria-label={label}
              >
                <span className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                </span>
                <span className="text-xs text-gray-500 mt-0.5 font-medium">{label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all',
                active ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600',
              )}
              aria-label={label}
            >
              <Icon
                className={clsx('w-5 h-5 transition-transform', active && 'scale-110')}
                strokeWidth={active ? 2.5 : 2}
              />
              <span className={clsx('text-xs font-medium', active && 'text-indigo-600')}>
                {label}
              </span>
              {active && (
                <span className="w-1 h-1 rounded-full bg-indigo-600 -mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
      <div className="h-safe-bottom" />
    </nav>
  );
}
