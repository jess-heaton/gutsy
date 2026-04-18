'use client';

import { BristolType } from '@/lib/types';
import clsx from 'clsx';

const types: { type: BristolType; label: string; desc: string; emoji: string; color: string }[] = [
  { type: 1, label: 'Type 1', desc: 'Separate hard lumps', emoji: '⚫⚫⚫', color: 'bg-gray-100 border-gray-300 text-gray-700' },
  { type: 2, label: 'Type 2', desc: 'Lumpy and sausage-like', emoji: '⚫⚫⚫', color: 'bg-gray-100 border-gray-300 text-gray-700' },
  { type: 3, label: 'Type 3', desc: 'Sausage with cracks', emoji: '🟫🟫', color: 'bg-amber-50 border-amber-300 text-amber-800' },
  { type: 4, label: 'Type 4', desc: 'Smooth, soft sausage', emoji: '✅', color: 'bg-emerald-50 border-emerald-300 text-emerald-800' },
  { type: 5, label: 'Type 5', desc: 'Soft blobs, clear-cut edges', emoji: '🟡', color: 'bg-yellow-50 border-yellow-300 text-yellow-800' },
  { type: 6, label: 'Type 6', desc: 'Fluffy pieces, mushy stool', emoji: '🟠', color: 'bg-orange-50 border-orange-300 text-orange-800' },
  { type: 7, label: 'Type 7', desc: 'Watery, no solid pieces', emoji: '🔴', color: 'bg-red-50 border-red-300 text-red-800' },
];

const idealNote: Record<BristolType, string> = {
  1: 'Constipated',
  2: 'Constipated',
  3: 'Normal',
  4: 'Ideal!',
  5: 'Tending loose',
  6: 'Loose / mild diarrhoea',
  7: 'Diarrhoea',
};

interface BristolScaleProps {
  value?: BristolType;
  onChange: (type: BristolType) => void;
}

export default function BristolScale({ value, onChange }: BristolScaleProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-700">Bristol Stool Scale</p>
        {value && (
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            {idealNote[value]}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {types.map(({ type, label, desc, emoji, color }) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-left transition-all active:scale-98',
              value === type
                ? 'border-indigo-400 bg-indigo-50 ring-2 ring-indigo-200'
                : clsx(color, 'border hover:border-gray-400'),
            )}
          >
            <span className="text-lg w-8 text-center flex-shrink-0">{emoji}</span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold block">{label}</span>
              <span className="text-xs opacity-70 block">{desc}</span>
            </div>
            {value === type && (
              <span className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">✓</span>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
