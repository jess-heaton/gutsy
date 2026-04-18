'use client';

import clsx from 'clsx';

interface SymptomSliderProps {
  label: string;
  emoji: string;
  value: number;
  onChange: (v: number) => void;
}

const label = (v: number) => v === 0 ? 'None' : v <= 3 ? 'Mild' : v <= 6 ? 'Moderate' : v <= 8 ? 'Severe' : 'Very severe';
const textColor  = (v: number) => v === 0 ? 'text-gray-400' : v <= 3 ? 'text-low' : v <= 6 ? 'text-moderate' : 'text-high';
const trackColor = (v: number) => v === 0 ? 'bg-gray-200' : v <= 3 ? 'bg-low' : v <= 6 ? 'bg-moderate' : 'bg-high';

export default function SymptomSlider({ label: l, emoji, value, onChange }: SymptomSliderProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3.5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
          <span>{emoji}</span> {l}
        </span>
        <span className={clsx('text-xs font-semibold', textColor(value))}>
          {value}/10 · {label(value)}
        </span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute inset-x-0 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className={clsx('h-full rounded-full transition-all', trackColor(value))} style={{ width: `${value * 10}%` }} />
        </div>
        <input
          type="range"
          min={0} max={10}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between mt-2.5">
        {[0, 5, 10].map(n => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={clsx('text-xs font-medium transition-colors px-1', value === n ? textColor(n) + ' font-bold' : 'text-gray-300 hover:text-gray-500')}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
