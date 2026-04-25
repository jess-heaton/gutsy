'use client';

import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FALLBACK_IMAGES = [
  '/restaurant-1.png',
  '/restaurant-2.png',
  '/restaurant-3.png',
];

// Pinned cards always shown first
const PINNED = [
  { slug: 'chipotle',  restaurant: 'Chipotle Mexican Grill', image_url: '/chipotle.png',  href: '/menu?q=Chipotle&auto=1',      summary: 'Bowls and salads are highly customisable. Skip the beans and choose rice, grilled protein, and fajita veg.' },
  { slug: 'jamba',     restaurant: 'Jamba Juice',            image_url: '/jamba.png',     href: '/menu?q=Jamba+Juice&auto=1',   summary: "Smoothies can be modified — skip mango and watermelon bases. Ask about apple juice-free options." },
  { slug: 'starbucks', restaurant: 'Starbucks',              image_url: '/starbucks.png', href: '/menu?q=Starbucks&auto=1',     summary: 'Many drinks can be made low-FODMAP. Choose lactose-free milk, skip syrups, and avoid large oat milk serves.' },
];

// Map restaurant names (lowercase, partial) to local images
const RESTAURANT_IMAGES: { match: string; src: string }[] = [
  { match: 'mcdonald', src: '/mcdonalds.png' },
];

interface Scan {
  slug: string;
  restaurant: string | null;
  image_url: string | null;
  analysis: { summary?: string; items?: { status: string }[] };
  created_at: string;
}

function pills(items: { status: string }[] = []) {
  const safe   = items.filter(i => i.status === 'safe').length;
  const modify = items.filter(i => i.status === 'modify').length;
  const avoid  = items.filter(i => i.status === 'avoid').length;
  return { safe, modify, avoid };
}

export default function RestaurantCarousel() {
  const [scans, setScans] = useState<Scan[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/public-scans')
      .then(r => r.json())
      .then(d => setScans(Array.isArray(d) ? d.filter(s => {
          if (!s.restaurant) return false;
          const n = s.restaurant.toLowerCase();
          return !n.includes('starbucks') && !n.includes('chipotle') && !n.includes('jamba');
        }) : []))
      .catch(() => {});
  }, []);

  function scroll(dir: 1 | -1) {
    ref.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
      >
        {/* Pinned featured restaurants */}
        {PINNED.map(p => (
          <Link
            key={p.slug}
            href={p.href}
            className="group flex-shrink-0 w-56 snap-start bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-brand-200 hover:shadow-lifted transition-all"
          >
            <div className="h-32 relative bg-gray-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image_url} alt={p.restaurant} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-gray-900 truncate">{p.restaurant}</p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">{p.summary}</p>
            </div>
          </Link>
        ))}

        {/* DB scans */}
        {scans.map((scan, idx) => {
          const { safe, modify, avoid } = pills(scan.analysis?.items);
          const name = (scan.restaurant ?? '').toLowerCase();
          const mapped = RESTAURANT_IMAGES.find(r => name.includes(r.match));
          const imgSrc = mapped ? mapped.src : FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
          return (
            <Link
              key={scan.slug}
              href={`/s/${scan.slug}`}
              className="group flex-shrink-0 w-56 snap-start bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-brand-200 hover:shadow-lifted transition-all"
            >
              <div className="h-32 relative bg-gradient-to-br from-brand-900 to-brand-700 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgSrc} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-2 left-2 flex gap-1.5">
                  {safe > 0   && <span className="text-2xs font-bold bg-emerald-500/90 text-white px-1.5 py-0.5 rounded-full">{safe} safe</span>}
                  {modify > 0 && <span className="text-2xs font-bold bg-amber-500/90 text-white px-1.5 py-0.5 rounded-full">{modify} modify</span>}
                  {avoid > 0  && <span className="text-2xs font-bold bg-red-500/90 text-white px-1.5 py-0.5 rounded-full">{avoid} avoid</span>}
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-gray-900 truncate">{scan.restaurant ?? 'Restaurant'}</p>
                {scan.analysis?.summary && (
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">{scan.analysis.summary}</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {scans.length > 3 && (
        <div className="absolute -bottom-10 right-0 flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-brand-400 hover:text-brand-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-brand-400 hover:text-brand-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
