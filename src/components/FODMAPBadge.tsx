'use client';

import { FODMAPLevel } from '@/lib/types';
import clsx from 'clsx';

interface FODMAPBadgeProps {
  level: 'low' | 'moderate' | 'high';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const config = {
  low: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
    border: 'border-emerald-200',
    label: 'Low',
  },
  moderate: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
    border: 'border-amber-200',
    label: 'Moderate',
  },
  high: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    dot: 'bg-red-500',
    border: 'border-red-200',
    label: 'High',
  },
};

export default function FODMAPBadge({ level, size = 'md', showLabel = true }: FODMAPBadgeProps) {
  const c = config[level];
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full font-medium border',
        c.bg, c.text, c.border,
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-2.5 py-1 text-xs',
        size === 'lg' && 'px-3 py-1.5 text-sm',
      )}
    >
      <span className={clsx('rounded-full flex-shrink-0', c.dot, size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2')} />
      {showLabel && c.label}
    </span>
  );
}

interface FODMAPCategoryGridProps {
  fodmap: {
    fructans: FODMAPLevel;
    gos: FODMAPLevel;
    lactose: FODMAPLevel;
    fructose: FODMAPLevel;
    sorbitol: FODMAPLevel;
    mannitol: FODMAPLevel;
  };
}

const categoryNames: Record<string, string> = {
  fructans: 'Fructans',
  gos: 'GOS',
  lactose: 'Lactose',
  fructose: 'Fructose',
  sorbitol: 'Sorbitol',
  mannitol: 'Mannitol',
};

const levelColors: Record<FODMAPLevel, string> = {
  none: 'bg-gray-100 text-gray-400',
  low: 'bg-emerald-100 text-emerald-700',
  moderate: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
};

export function FODMAPCategoryGrid({ fodmap }: FODMAPCategoryGridProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {Object.entries(categoryNames).map(([key, label]) => {
        const level = fodmap[key as keyof typeof fodmap];
        return (
          <div key={key} className={clsx('rounded-lg px-2 py-1.5 text-center', levelColors[level])}>
            <div className="text-xs font-semibold">{label}</div>
            <div className="text-xs capitalize mt-0.5 opacity-80">{level === 'none' ? '—' : level}</div>
          </div>
        );
      })}
    </div>
  );
}
