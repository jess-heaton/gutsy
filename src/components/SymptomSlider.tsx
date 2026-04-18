'use client';

import clsx from 'clsx';

interface SymptomSliderProps {
  label: string;
  emoji: string;
  value: number;
  onChange: (v: number) => void;
}

const severityLabel = (v: number) => {
  if (v === 0) return 'None';
  if (v <= 3) return 'Mild';
  if (v <= 6) return 'Moderate';
  if (v <= 8) return 'Severe';
  return 'Very severe';
};

const severityColor = (v: number) => {
  if (v === 0) return 'text-gray-400';
  if (v <= 3) return 'text-emerald-600';
  if (v <= 6) return 'text-amber-600';
  return 'text-red-600';
};

const trackColor = (v: number) => {
  if (v === 0) return 'bg-gray-200';
  if (v <= 3) return 'bg-emerald-400';
  if (v <= 6) return 'bg-amber-400';
  return 'bg-red-400';
};

export default function SymptomSlider({ label, emoji, value, onChange }: SymptomSliderProps) {
  return (
    <div className="bg-gray-50 rounded-xl px-3.5 py-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
          <span>{emoji}</span> {label}
        </span>
        <span className={clsx('text-xs font-semibold', severityColor(value))}>
          {value}/10 · {severityLabel(value)}
        </span>
      </div>
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={clsx('h-full rounded-full transition-all', trackColor(value))}
            style={{ width: `${value * 10}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={10}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
          style={{ height: '100%' }}
        />
      </div>
      <div className="flex justify-between mt-1">
        {[0, 2, 4, 6, 8, 10].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={clsx(
              'w-7 h-7 rounded-full text-xs font-semibold transition-all',
              value === n
                ? 'bg-indigo-600 text-white scale-110'
                : 'bg-white text-gray-400 hover:bg-gray-100',
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
