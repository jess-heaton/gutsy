'use client';

import { useState } from 'react';
import { Search, X, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { foods, searchFoods, categoryLabels, categoryEmojis } from '@/data/foods';
import { FoodItem } from '@/lib/types';
import FODMAPBadge, { FODMAPCategoryGrid } from '@/components/FODMAPBadge';
import clsx from 'clsx';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'low', label: '🟢 Low' },
  { value: 'moderate', label: '🟡 Moderate' },
  { value: 'high', label: '🔴 High' },
];

const categoryList = ['all', 'fruit', 'vegetable', 'grain', 'dairy', 'protein', 'legume', 'nut', 'condiment', 'drink'];

function FoodCard({ food }: { food: FoodItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-3.5 py-3 text-left active:bg-gray-50 transition-colors"
      >
        <span className="text-2xl w-8 text-center flex-shrink-0">{food.emoji || '🍽️'}</span>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-gray-800 block">{food.name}</span>
          <span className="text-xs text-gray-400">{food.serving.description}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <FODMAPBadge level={food.fodmap.overall} size="sm" />
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-3.5 pb-3.5 space-y-3 border-t border-gray-50 pt-3 animate-fade-in">
          <FODMAPCategoryGrid fodmap={food.fodmap} />
          {food.notes && (
            <div className="flex gap-2 bg-blue-50 rounded-xl p-2.5">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">{food.notes}</p>
            </div>
          )}
          {food.fodmap.overall === 'high' && (
            <div className="flex gap-2 bg-red-50 rounded-xl p-2.5">
              <span className="text-sm flex-shrink-0">🚫</span>
              <p className="text-xs text-red-700 font-medium">Avoid during the elimination phase.</p>
            </div>
          )}
          {food.fodmap.overall === 'low' && (
            <div className="flex gap-2 bg-emerald-50 rounded-xl p-2.5">
              <span className="text-sm flex-shrink-0">✅</span>
              <p className="text-xs text-emerald-700 font-medium">Safe for the elimination phase at this serve size.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function FoodsPage() {
  const [query, setQuery] = useState('');
  const [fodmapFilter, setFodmapFilter] = useState<'all' | 'low' | 'moderate' | 'high'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  let results = query ? searchFoods(query) : foods;

  if (fodmapFilter !== 'all') {
    results = results.filter((f) => f.fodmap.overall === fodmapFilter);
  }
  if (categoryFilter !== 'all') {
    results = results.filter((f) => f.category === categoryFilter);
  }

  const lowCount = foods.filter((f) => f.fodmap.overall === 'low').length;
  const highCount = foods.filter((f) => f.fodmap.overall === 'high').length;

  return (
    <div className="px-4 pt-6 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">FODMAP Foods</h1>
        <p className="text-sm text-gray-500 mt-1">
          {lowCount} safe foods · {highCount} to avoid · Based on Monash University research
        </p>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { level: 'low' as const, label: 'Low FODMAP', sub: 'Safe to eat', bg: 'bg-emerald-50 border-emerald-200' },
          { level: 'moderate' as const, label: 'Moderate', sub: 'Eat in small amounts', bg: 'bg-amber-50 border-amber-200' },
          { level: 'high' as const, label: 'High FODMAP', sub: 'Avoid', bg: 'bg-red-50 border-red-200' },
        ].map(({ level, label, sub, bg }) => (
          <button
            key={level}
            onClick={() => setFodmapFilter(fodmapFilter === level ? 'all' : level)}
            className={clsx(
              'rounded-xl border-2 p-2 text-center transition-all active:scale-95',
              bg,
              fodmapFilter === level ? 'ring-2 ring-offset-1 ring-indigo-400' : '',
            )}
          >
            <FODMAPBadge level={level} size="sm" showLabel={false} />
            <p className="text-xs font-semibold text-gray-700 mt-1">{label}</p>
            <p className="text-xs text-gray-400">{sub}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search any food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-9 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent shadow-card"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={clsx(
              'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0',
              categoryFilter === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200',
            )}
          >
            {cat !== 'all' && categoryEmojis[cat]} {cat === 'all' ? 'All categories' : categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400 font-medium">
        {results.length} food{results.length !== 1 ? 's' : ''} found
      </p>

      {/* Food list */}
      <div className="space-y-2">
        {results.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-gray-500 text-sm font-medium">No foods found</p>
            <p className="text-gray-400 text-xs mt-1">Try a different search term</p>
          </div>
        ) : (
          results.map((food) => <FoodCard key={food.id} food={food} />)
        )}
      </div>

      {/* Monash note */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <p className="text-xs text-gray-500">
          📚 Data based on Monash University research. Their official app has the full database — worth having alongside this one.
        </p>
      </div>

      <div className="h-4" />
    </div>
  );
}
