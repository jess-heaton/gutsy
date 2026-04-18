'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Flame, Trash2, ChevronRight, Plus, ExternalLink } from 'lucide-react';
import { DayEntry, MealEntry, SymptomEntry, BowelEntry } from '@/lib/types';
import { getEntriesForDate, deleteEntry, getStreak, getTodayKey, getSettings } from '@/lib/store';
import FODMAPBadge from '@/components/FODMAPBadge';
import clsx from 'clsx';

const MEAL_LABEL: Record<string, string> = {
  breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snack', drink: 'Drink',
};

const BRISTOL: Record<number, { label: string; sentiment: 'good' | 'warn' | 'bad' }> = {
  1: { label: 'Hard pellets', sentiment: 'bad' },
  2: { label: 'Lumpy', sentiment: 'bad' },
  3: { label: 'Cracked', sentiment: 'warn' },
  4: { label: 'Well-formed', sentiment: 'good' },
  5: { label: 'Soft blobs', sentiment: 'warn' },
  6: { label: 'Mushy', sentiment: 'bad' },
  7: { label: 'Watery', sentiment: 'bad' },
};

function Stat({ label, value, sub, variant = 'neutral' }: {
  label: string; value: string | number; sub?: string; variant?: 'neutral' | 'good' | 'warn' | 'bad';
}) {
  const valueColor = {
    neutral: 'text-gray-900',
    good:    'text-low',
    warn:    'text-moderate',
    bad:     'text-high',
  }[variant];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className={clsx('text-2xl font-bold tabular-nums', valueColor)}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function EntryRow({ entry, onDelete }: { entry: DayEntry; onDelete: () => void }) {
  if (entry.type === 'meal') {
    const m = entry as MealEntry;
    const hasHigh = m.foods.some(f => f.fodmapOverall === 'high');
    const hasMod  = m.foods.some(f => f.fodmapOverall === 'moderate');
    const overall = hasHigh ? 'high' : hasMod ? 'moderate' : 'low';
    const foodList = m.foods.map(f => f.foodName).join(', ') || m.freeText || '—';

    return (
      <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 group">
        <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
          {m.mealType === 'breakfast' ? '🌅' : m.mealType === 'lunch' ? '☀️' : m.mealType === 'dinner' ? '🌙' : m.mealType === 'drink' ? '💧' : '🍎'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-gray-800">{MEAL_LABEL[m.mealType]}</span>
            {m.foods.length > 0 && <FODMAPBadge level={overall} size="sm" />}
          </div>
          <p className="text-xs text-gray-500 truncate">{foodList}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-gray-400 tabular-nums">{entry.time}</span>
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-300 hover:text-red-400 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  if (entry.type === 'symptom') {
    const s = entry as SymptomEntry;
    const worst = Math.max(s.bloating, s.pain, s.gas, s.nausea, s.fatigue, s.overall);
    const color = worst <= 3 ? 'text-low' : worst <= 6 ? 'text-moderate' : 'text-high';
    return (
      <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 group">
        <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-sm flex-shrink-0">😣</div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">Symptoms</p>
          <p className="text-xs text-gray-500">
            Worst: <span className={clsx('font-semibold', color)}>{worst}/10</span>
            {s.bloating > 0 && ` · Bloating ${s.bloating}`}
            {s.pain > 0 && ` · Pain ${s.pain}`}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-gray-400 tabular-nums">{entry.time}</span>
          <button onClick={onDelete} className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-300 hover:text-red-400 transition-all">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  if (entry.type === 'bowel') {
    const b = entry as BowelEntry;
    const info = BRISTOL[b.bristolType];
    const dotColor = info.sentiment === 'good' ? 'bg-low' : info.sentiment === 'warn' ? 'bg-moderate' : 'bg-high';
    return (
      <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 group">
        <div className="w-10 h-10 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center text-sm flex-shrink-0">🚽</div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">Bowel movement</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={clsx('w-2 h-2 rounded-full flex-shrink-0', dotColor)} />
            <p className="text-xs text-gray-500">Type {b.bristolType} — {info.label}{b.urgency !== 'normal' ? ` · ${b.urgency === 'urgent' ? 'Urgent' : 'Very urgent'}` : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-gray-400 tabular-nums">{entry.time}</span>
          <button onClick={onDelete} className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-300 hover:text-red-400 transition-all">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  const n = entry as { type: 'note'; text: string; time: string; id: string; date: string };
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 group">
      <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">📝</div>
      <p className="flex-1 text-sm text-gray-600 leading-relaxed">{n.text}</p>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs text-gray-400 tabular-nums">{entry.time}</span>
        <button onClick={onDelete} className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-300 hover:text-red-400 transition-all">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function TodayPage() {
  const [entries, setEntries] = useState<DayEntry[]>([]);
  const [streak, setStreak] = useState(0);
  const today = getTodayKey();
  const settings = typeof window !== 'undefined' ? getSettings() : null;

  const load = useCallback(() => {
    setEntries(getEntriesForDate(today));
    setStreak(getStreak());
  }, [today]);

  useEffect(() => {
    load();
    window.addEventListener('focus', load);
    window.addEventListener('storage', load);
    return () => { window.removeEventListener('focus', load); window.removeEventListener('storage', load); };
  }, [load]);

  const handleDelete = (id: string) => { deleteEntry(today, id); load(); };

  const meals   = entries.filter(e => e.type === 'meal') as MealEntry[];
  const bowels  = entries.filter(e => e.type === 'bowel') as BowelEntry[];
  const symptoms = entries.filter(e => e.type === 'symptom') as SymptomEntry[];
  const allFoods = meals.flatMap(m => m.foods);
  const highCount = allFoods.filter(f => f.fodmapOverall === 'high').length;
  const worstSym = symptoms.length
    ? Math.max(...symptoms.flatMap(s => [s.bloating, s.pain, s.gas, s.nausea, s.fatigue, s.overall]))
    : null;

  const dateStr = format(new Date(), 'EEEE, d MMMM yyyy');
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-7">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 font-medium">{dateStr}</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">{greeting}{settings?.name ? `, ${settings.name}` : ''}</h1>
        </div>
        <div className="flex items-center gap-2">
          {streak > 0 && (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-sm font-bold text-amber-700 tabular-nums">{streak}</span>
              <span className="text-xs text-amber-600">{streak === 1 ? 'day' : 'days'}</span>
            </div>
          )}
          <button
            onClick={() => window.open('/popup', 'gutsy-popup', 'width=390,height=540,toolbar=0,menubar=0,location=0,resizable=1')}
            title="Open quick-log popup"
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Meals logged"   value={meals.length}  sub="today" />
        <Stat label="High FODMAP"    value={highCount}     sub="items" variant={highCount > 0 ? 'bad' : 'good'} />
        <Stat label="Bowel movements" value={bowels.length} sub="today" />
        <Stat
          label="Symptom score"
          value={worstSym !== null ? `${worstSym}/10` : '—'}
          sub="worst today"
          variant={worstSym === null ? 'neutral' : worstSym <= 3 ? 'good' : worstSym <= 6 ? 'warn' : 'bad'}
        />
      </div>

      {/* Quick log */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Quick log</h2>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {[
            { href: '/log?type=meal&meal=breakfast', label: 'Breakfast', bg: 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800' },
            { href: '/log?type=meal&meal=lunch',     label: 'Lunch',     bg: 'bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-800' },
            { href: '/log?type=meal&meal=dinner',    label: 'Dinner',    bg: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-800' },
            { href: '/log?type=meal&meal=snack',     label: 'Snack',     bg: 'bg-brand-50 hover:bg-brand-100 border-brand-200 text-brand-800' },
            { href: '/log?type=symptom',             label: 'Symptom',   bg: 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-800' },
            { href: '/log?type=bowel',               label: 'Bowel',     bg: 'bg-violet-50 hover:bg-violet-100 border-violet-200 text-violet-800' },
          ].map(({ href, label, bg }) => (
            <Link
              key={href}
              href={href}
              className={clsx('flex items-center justify-center py-2.5 rounded-lg border text-xs font-semibold text-center transition-colors active:scale-98', bg)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Today's entries */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Today's log</h2>
          {entries.length > 0 && (
            <span className="text-xs text-gray-400">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</span>
          )}
        </div>

        {entries.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500">Nothing logged yet today.</p>
            <Link href="/log" className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-brand-700 hover:text-brand-900">
              <Plus className="w-4 h-4" /> Add your first entry
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 px-4">
            {entries.map(e => <EntryRow key={e.id} entry={e} onDelete={() => handleDelete(e.id)} />)}
          </div>
        )}
      </div>

      {/* Phase card */}
      <Link href="/settings" className="block bg-brand-900 rounded-xl p-5 hover:bg-brand-800 transition-colors active:scale-98">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest">Current phase</p>
            <p className="text-base font-bold text-white mt-1 capitalize">{settings?.phase ?? 'Elimination'}</p>
            <p className="text-sm text-brand-300 mt-0.5">
              {settings?.phase === 'elimination'
                ? 'Avoid all high-FODMAP foods'
                : settings?.phase === 'reintroduction'
                ? `Testing: ${settings.reintroductionCategory ?? 'select a category'}`
                : 'Personalised maintenance diet'}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-brand-500 flex-shrink-0" />
        </div>
      </Link>
    </div>
  );
}
