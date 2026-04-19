'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface TocItem { id: string; label: string; }

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );
    items.forEach(i => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  return (
    <nav aria-label="Table of contents" className="hidden lg:block sticky top-24 self-start">
      <p className="text-2xs font-bold text-gray-400 uppercase tracking-widest mb-3">On this page</p>
      <ul className="space-y-2 border-l border-gray-200">
        {items.map(i => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={clsx(
                'block text-sm pl-4 -ml-px border-l-2 transition-colors',
                active === i.id
                  ? 'border-brand-600 text-brand-700 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-800',
              )}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
