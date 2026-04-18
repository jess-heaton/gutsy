'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { addEntry, generateId, getTodayKey, getNowTime } from '@/lib/store';
import { MealEntry, BowelEntry, SymptomEntry, BristolType } from '@/lib/types';
import clsx from 'clsx';

type Mode = 'home' | 'meal' | 'bowel' | 'symptom' | 'done';

const bristolOptions: { type: BristolType; emoji: string; label: string; note: string }[] = [
  { type: 1, emoji: '⚫', label: 'Type 1', note: 'Hard pellets' },
  { type: 2, emoji: '🟤', label: 'Type 2', note: 'Lumpy' },
  { type: 3, emoji: '🟫', label: 'Type 3', note: 'Cracked' },
  { type: 4, emoji: '🟢', label: 'Type 4', note: 'Smooth — ideal' },
  { type: 5, emoji: '🟡', label: 'Type 5', note: 'Soft blobs' },
  { type: 6, emoji: '🟠', label: 'Type 6', note: 'Mushy' },
  { type: 7, emoji: '🔴', label: 'Type 7', note: 'Watery' },
];

const mealEmojis: Record<string, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
  drink: '💧',
};

function MealMode({ onDone }: { onDone: () => void }) {
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | 'drink'>('snack');
  const [text, setText] = useState('');

  const save = () => {
    const entry: MealEntry = {
      id: generateId(),
      date: getTodayKey(),
      time: getNowTime(),
      type: 'meal',
      mealType,
      foods: [],
      freeText: text.trim() || undefined,
    };
    addEntry(entry);
    onDone();
  };

  return (
    <div className="space-y-3">
      {/* Meal type row */}
      <div className="flex gap-1.5">
        {(Object.keys(mealEmojis) as (keyof typeof mealEmojis)[]).map((type) => (
          <button
            key={type}
            onClick={() => setMealType(type as typeof mealType)}
            className={clsx(
              'flex-1 flex flex-col items-center py-2 rounded-xl text-xs font-semibold transition-all',
              mealType === type ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            )}
          >
            <span className="text-base">{mealEmojis[type]}</span>
            <span className="capitalize mt-0.5">{type}</span>
          </button>
        ))}
      </div>

      <textarea
        placeholder="What did you have? (or leave blank)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        autoFocus
        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />

      <button
        onClick={save}
        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 active:scale-98 transition-all"
      >
        Save {mealEmojis[mealType]} {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
      </button>
    </div>
  );
}

function BowelMode({ onDone }: { onDone: () => void }) {
  const [selected, setSelected] = useState<BristolType | null>(null);
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'very-urgent'>('normal');

  const save = () => {
    if (!selected) return;
    const entry: BowelEntry = {
      id: generateId(),
      date: getTodayKey(),
      time: getNowTime(),
      type: 'bowel',
      bristolType: selected,
      urgency,
      pain: 0,
    };
    addEntry(entry);
    onDone();
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-7 gap-1">
        {bristolOptions.map(({ type, emoji, label, note }) => (
          <button
            key={type}
            onClick={() => setSelected(type)}
            title={`${label}: ${note}`}
            className={clsx(
              'flex flex-col items-center py-2 rounded-xl transition-all',
              selected === type ? 'bg-indigo-600 ring-2 ring-indigo-300' : 'bg-gray-100 hover:bg-gray-200',
            )}
          >
            <span className="text-xl">{emoji}</span>
            <span className={clsx('text-xs font-bold mt-0.5', selected === type ? 'text-white' : 'text-gray-600')}>
              {type}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <p className="text-xs text-center text-gray-500">
          Type {selected} — {bristolOptions.find(b => b.type === selected)?.note}
          {selected === 4 && ' ✓'}
        </p>
      )}

      <div className="flex gap-1.5">
        {(['normal', 'urgent', 'very-urgent'] as const).map((u) => (
          <button
            key={u}
            onClick={() => setUrgency(u)}
            className={clsx(
              'flex-1 py-2 rounded-xl text-xs font-semibold border transition-all',
              urgency === u ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-500 border-gray-200',
            )}
          >
            {u === 'normal' ? '😌 Normal' : u === 'urgent' ? '⚡ Urgent' : '🚨 Very'}
          </button>
        ))}
      </div>

      <button
        onClick={save}
        disabled={!selected}
        className={clsx(
          'w-full py-3 rounded-xl font-bold text-sm transition-all',
          selected
            ? 'bg-violet-600 text-white hover:bg-violet-700 active:scale-98'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed',
        )}
      >
        {selected ? `Log Type ${selected}` : 'Pick a type above'}
      </button>
    </div>
  );
}

function SymptomMode({ onDone }: { onDone: () => void }) {
  const [overall, setOverall] = useState(5);

  const save = () => {
    const entry: SymptomEntry = {
      id: generateId(),
      date: getTodayKey(),
      time: getNowTime(),
      type: 'symptom',
      bloating: 0,
      pain: 0,
      gas: 0,
      nausea: 0,
      fatigue: 0,
      overall,
    };
    addEntry(entry);
    onDone();
  };

  const label = overall <= 2 ? 'Fine' : overall <= 4 ? 'Mild' : overall <= 6 ? 'Moderate' : overall <= 8 ? 'Rough' : 'Bad day';
  const color = overall <= 2 ? 'text-emerald-600' : overall <= 5 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold text-gray-700">How are you feeling?</p>
          <span className={clsx('text-sm font-bold', color)}>{overall}/10 · {label}</span>
        </div>
        <div className="grid grid-cols-11 gap-1">
          {Array.from({ length: 11 }, (_, i) => (
            <button
              key={i}
              onClick={() => setOverall(i)}
              className={clsx(
                'py-2.5 rounded-lg text-xs font-bold transition-all',
                overall === i
                  ? i <= 2 ? 'bg-emerald-500 text-white' : i <= 5 ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
              )}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={save}
        className="w-full py-3 bg-rose-500 text-white rounded-xl font-bold text-sm hover:bg-rose-600 active:scale-98 transition-all"
      >
        Log how I'm feeling ({overall}/10)
      </button>
    </div>
  );
}

export default function PopupPage() {
  const [mode, setMode] = useState<Mode>('home');

  if (mode === 'done') {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-emerald-600" strokeWidth={3} />
        </div>
        <p className="text-lg font-bold text-gray-800">Logged</p>
        <button onClick={() => setMode('home')} className="text-sm text-indigo-600 hover:underline mt-1">
          Log another
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {mode !== 'home' && (
            <button
              onClick={() => setMode('home')}
              className="text-xs text-gray-400 hover:text-gray-600 mr-1"
            >
              ←
            </button>
          )}
          <span className="text-sm font-bold text-gray-900">
            {mode === 'home' ? 'Quick log' : mode === 'meal' ? '🍽️ Meal' : mode === 'bowel' ? '🚽 Bowel' : '😣 Symptoms'}
          </span>
        </div>
        <span className="text-xs text-gray-400">{new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {mode === 'home' && (
          <div className="space-y-2.5 pt-2">
            <p className="text-xs text-gray-400 mb-4">What do you want to log?</p>

            <button
              onClick={() => setMode('meal')}
              className="w-full flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3.5 hover:border-amber-200 active:scale-98 transition-all text-left"
            >
              <span className="text-2xl">🍽️</span>
              <div>
                <p className="text-sm font-bold text-gray-800">Meal or snack</p>
                <p className="text-xs text-gray-500">Free text or pick a type</p>
              </div>
            </button>

            <button
              onClick={() => setMode('bowel')}
              className="w-full flex items-center gap-3 bg-violet-50 border border-violet-100 rounded-2xl px-4 py-3.5 hover:border-violet-200 active:scale-98 transition-all text-left"
            >
              <span className="text-2xl">🚽</span>
              <div>
                <p className="text-sm font-bold text-gray-800">Bowel movement</p>
                <p className="text-xs text-gray-500">Bristol scale + urgency</p>
              </div>
            </button>

            <button
              onClick={() => setMode('symptom')}
              className="w-full flex items-center gap-3 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3.5 hover:border-rose-200 active:scale-98 transition-all text-left"
            >
              <span className="text-2xl">😣</span>
              <div>
                <p className="text-sm font-bold text-gray-800">How I'm feeling</p>
                <p className="text-xs text-gray-500">Quick symptom score</p>
              </div>
            </button>

            <div className="pt-2 border-t border-gray-100 mt-4">
              <p className="text-xs text-center text-gray-400">
                Syncs with your main Gutsy app automatically
              </p>
            </div>
          </div>
        )}

        {mode === 'meal' && <MealMode onDone={() => setMode('done')} />}
        {mode === 'bowel' && <BowelMode onDone={() => setMode('done')} />}
        {mode === 'symptom' && <SymptomMode onDone={() => setMode('done')} />}
      </div>
    </div>
  );
}
