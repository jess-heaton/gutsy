'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { foods, searchFoods, categoryLabels, categoryEmojis } from '@/data/foods';
import { trackEvent } from '@/lib/gtag';
import { FoodItem } from '@/lib/types';
import FODMAPBadge, { FODMAPCategoryGrid } from '@/components/FODMAPBadge';
import AIDisclaimer from '@/components/AIDisclaimer';
import clsx from 'clsx';

const FODMAP_FILTERS = [
  { value: 'all',      label: 'All foods' },
  { value: 'low',      label: 'Low FODMAP' },
  { value: 'moderate', label: 'Moderate'   },
  { value: 'high',     label: 'High FODMAP' },
];

const CATEGORIES = ['all', 'fruit', 'vegetable', 'grain', 'dairy', 'protein', 'legume', 'nut', 'condiment', 'drink'];

function FoodRow({ food }: { food: FoodItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2"
      >
        <span className="text-lg w-7 text-center flex-shrink-0">{food.emoji ?? '—'}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{food.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{food.serving.description}</p>
        </div>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <FODMAPBadge level={food.fodmap.overall} size="sm" />
          {open ? <ChevronUp className="w-4 h-4 text-gray-300" /> : <ChevronDown className="w-4 h-4 text-gray-300" />}
        </div>
      </button>

      {open && (
        <div className="pb-4 px-2 space-y-3 animate-fade-in">
          <FODMAPCategoryGrid fodmap={food.fodmap} />
          {food.notes && (
            <div className="flex gap-2 bg-blue-50 border border-blue-100 rounded-lg p-3">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed">{food.notes}</p>
            </div>
          )}
          {food.fodmap.overall === 'high' && (
            <p className="text-xs text-high font-medium px-1">Avoid during the elimination phase.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function FoodsPage() {
  return <Suspense fallback={null}><FoodsInner /></Suspense>;
}

function FoodsInner() {
  const params = useSearchParams();
  const [query,    setQuery]    = useState('');
  const [fodmap,   setFodmap]   = useState<'all'|'low'|'moderate'|'high'>('all');
  const [category, setCategory] = useState('all');
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const q = params.get('q');
    if (q) setQuery(q);
  }, [params]);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (q.trim().length >= 2) {
      searchTimer.current = setTimeout(() => {
        trackEvent('food_search', { query: q.trim().toLowerCase(), result_count: searchFoods(q).length });
      }, 800);
    }
  };

  let results = query ? searchFoods(query) : foods;
  if (fodmap !== 'all')    results = results.filter(f => f.fodmap.overall === fodmap);
  if (category !== 'all')  results = results.filter(f => f.category === category);

  const lowCount  = foods.filter(f => f.fodmap.overall === 'low').length;
  const highCount = foods.filter(f => f.fodmap.overall === 'high').length;

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 lg:py-12 pb-20 lg:pb-12 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">FODMAP food guide</h1>
        <p className="text-sm text-gray-500 mt-1">
          {lowCount} safe foods, {highCount} to avoid. Based on Monash University research.
        </p>
      </div>

      <AIDisclaimer tool="Food guide" />

      {/* Traffic light filter */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { level: 'low'      as const, label: 'Low',      sub: 'Safe at listed serve',   border: 'border-low/30',      bg: 'bg-emerald-50',   text: 'text-low'      },
          { level: 'moderate' as const, label: 'Moderate', sub: 'Small amounts only',     border: 'border-moderate/30', bg: 'bg-amber-50',     text: 'text-moderate' },
          { level: 'high'     as const, label: 'High',     sub: 'Avoid in elimination',   border: 'border-high/30',     bg: 'bg-red-50',       text: 'text-high'     },
        ].map(({ level, label, sub, border, bg, text }) => (
          <button
            key={level}
            onClick={() => setFodmap(fodmap === level ? 'all' : level)}
            className={clsx(
              'rounded-xl border-2 py-3 px-2 text-center transition-all active:scale-98',
              bg, border,
              fodmap === level && 'ring-2 ring-offset-1 ring-brand-500',
            )}
          >
            <div className={clsx('text-xs font-bold', text)}>{label}</div>
            <div className="text-2xs text-gray-500 mt-0.5 leading-tight">{sub}</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search foods…"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          className="w-full pl-9 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 border transition-colors',
              category === cat
                ? 'bg-brand-700 text-white border-brand-700'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300',
            )}
          >
            {cat !== 'all' && <span>{categoryEmojis[cat]}</span>}
            {cat === 'all' ? 'All' : categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Results */}
      <div>
        <p className="text-xs text-gray-400 font-medium mb-3">
          {results.length} food{results.length !== 1 ? 's' : ''}
        </p>

        {results.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
            <p className="text-gray-500 text-sm">No foods found</p>
            <p className="text-gray-400 text-xs mt-1">Try a different search or clear the filters</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl px-4">
            {results.map(food => <FoodRow key={food.id} food={food} />)}
          </div>
        )}
      </div>

      {/* Source note */}
      <p className="text-xs text-gray-400 text-center">
        Data based on Monash University FODMAP research. The official Monash app has the full database.
      </p>
    </div>
  );
}
