'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import AuthStatus from './AuthStatus';

const NAV = [
  { href: '/dashboard', label: 'My tracker' },
  { href: '/menu',      label: 'Menu scanner' },
  { href: '/recipe',    label: 'Recipe fixer' },
  { href: '/foods',     label: 'Food guide' },
  { href: '/blog',      label: 'Blog' },
  { href: '/extension', label: 'Extension' },
];

export default function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname?.startsWith('/popup')) return null;

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">

        <Link href="/" className="flex items-center flex-shrink-0">
          <span className="font-display text-2xl text-brand-700 leading-none">gutsy</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                isActive(href)
                  ? 'text-brand-700 bg-brand-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <AuthStatus />
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-brand-700 text-white text-sm font-semibold rounded-lg hover:bg-brand-800 transition-colors"
          >
            Open app →
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-0.5">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={clsx(
                'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive(href) ? 'text-brand-700 bg-brand-50' : 'text-gray-700 hover:bg-gray-50',
              )}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 mt-2 flex gap-2">
            <AuthStatus variant="mobile" />
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex-1 py-2.5 text-center bg-brand-700 text-white text-sm font-semibold rounded-lg"
            >
              Open app →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
