'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Flame, Trash2, ChevronRight } from 'lucide-react';
import { DayEntry, MealEntry, SymptomEntry, BowelEntry } from '@/lib/types';
import { getEntriesForDate, deleteEntry, getStreak, getTodayKey } from '@/lib/store';
import FODMAPBadge from '@/components/FODMAPBadge';
import clsx from 'clsx';

const mealTypeEmoji: Record<string, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
  drink: '💧',
};

const bristolLabels: Record<number, { label: string; color: string }> = {
  1: { label: 'Very hard', color: 'text-gray-500' },
  2: { label: 'Hard lumps', color: 'text-gray-500' },
  3: { label: 'Cracked', color: 'text-amber-600' },
  4: { label: 'Ideal ✓', color: 'text-emerald-600' },
  5: { label: 'Soft', color: 'text-yellow-600' },
  6: { label: 'Mushy', color: 'text-orange-600' },
  7: { label: 'Watery', color: 'text-red-600' },
};

function StreakBadge({ streak }: { streak: number }) {
  if (streak === 0) return null;
  return (
    <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
      <Flame className="w-4 h-4 text-orange-500" />
      <span className="text-sm font-bold text-orange-700">{streak}</span>
      <span className="text-xs text-orange-500">{streak === 1 ? 'day' : 'days'}</span>
    </div>
  );
}

function QuickLogButton({ href, emoji, label, color }: { href: string; emoji: string; label: string; color: string }) {
  return (
    <Link
      href={href}
      className={clsx(
        'flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl flex-1 active:scale-95 transition-all',
        color,
      )}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="text-xs font-semibold">{label}</span>
    </Link>
  );
}

function EntryCard({ entry, onDelete }: { entry: DayEntry; onDelete: () => void }) {
  const [showDelete, setShowDelete] = useState(false);

  if (entry.type === 'meal') {
    const meal = entry as MealEntry;
    const hasHigh = meal.foods.some((f) => f.fodmapOverall === 'high');
    const hasMod = meal.foods.some((f) => f.fodmapOverall === 'moderate');
    const overall = hasHigh ? 'high' : hasMod ? 'moderate' : 'low';

    return (
      <div
        className="bg-white rounded-2xl shadow-card p-3.5 border border-gray-100 animate-slide-up"
        onTouchStart={() => setShowDelete(false)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <span className="text-xl flex-shrink-0">{mealTypeEmoji[meal.mealType] || '🍽️'}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-800 capitalize">{meal.mealType}</span>
                {meal.foods.length > 0 && <FODMAPBadge level={overall} size="sm" />}
              </div>
              {meal.foods.length > 0 ? (
                <p className="text-xs text-gray-500 mt-0.5 truncate">
                  {meal.foods.map((f) => f.emoji ? `${f.emoji} ${f.foodName}` : f.foodName).join(', ')}
                </p>
              ) : meal.freeText ? (
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{meal.freeText}</p>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs text-gray-400">{entry.time}</span>
            <button
              onClick={onDelete}
              className="w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (entry.type === 'symptom') {
    const s = entry as SymptomEntry;
    const worst = Math.max(s.bloating, s.pain, s.gas, s.nausea, s.fatigue, s.overall);
    const color = worst <= 3 ? 'text-emerald-600' : worst <= 6 ? 'text-amber-600' : 'text-red-600';
    const dots = [s.bloating, s.pain, s.gas, s.nausea].map((v, i) => ({
      label: ['Bloat', 'Pain', 'Gas', 'Nausea'][i],
      value: v,
    }));

    return (
      <div className="bg-white rounded-2xl shadow-card p-3.5 border border-gray-100 animate-slide-up">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 flex-1">
            <span className="text-xl">😣</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">Symptoms</span>
                <span className={clsx('text-xs font-bold', color)}>{worst}/10</span>
              </div>
              <div className="flex gap-2 mt-1 flex-wrap">
                {dots.filter(d => d.value > 0).map(d => (
                  <span key={d.label} className="text-xs text-gray-500">
                    {d.label}: <span className="font-medium">{d.value}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">{entry.time}</span>
            <button onClick={onDelete} className="w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (entry.type === 'bowel') {
    const b = entry as BowelEntry;
    const bl = bristolLabels[b.bristolType];
    return (
      <div className="bg-white rounded-2xl shadow-card p-3.5 border border-gray-100 animate-slide-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🚽</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">Bowel Movement</span>
                <span className={clsx('text-xs font-semibold', bl.color)}>Type {b.bristolType} · {bl.label}</span>
              </div>
              {b.urgency !== 'normal' && (
                <span className="text-xs text-orange-500 mt-0.5 block">
                  {b.urgency === 'urgent' ? '⚡ Urgent' : '🚨 Very urgent'}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">{entry.time}</span>
            <button onClick={onDelete} className="w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // note
  const n = entry as { type: 'note'; text: string; time: string; id: string; date: string };
  return (
    <div className="bg-white rounded-2xl shadow-card p-3.5 border border-gray-100 animate-slide-up">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5 flex-1">
          <span className="text-xl mt-0.5">📝</span>
          <p className="text-sm text-gray-700 flex-1">{n.text}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-400">{entry.time}</span>
          <button onClick={onDelete} className="w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

const greetings = [
  { hour: 5, text: 'Morning', emoji: '🌅' },
  { hour: 12, text: 'Afternoon', emoji: '☀️' },
  { hour: 17, text: 'Evening', emoji: '🌇' },
  { hour: 21, text: 'Late one', emoji: '🌙' },
];

function getGreeting() {
  const h = new Date().getHours();
  const g = greetings.reverse().find((g) => h >= g.hour) || greetings[0];
  return g;
}

export default function TodayPage() {
  const [entries, setEntries] = useState<DayEntry[]>([]);
  const [streak, setStreak] = useState(0);
  const today = getTodayKey();
  const dateLabel = format(new Date(), 'EEEE, d MMMM');
  const greeting = getGreeting();

  const load = useCallback(() => {
    setEntries(getEntriesForDate(today));
    setStreak(getStreak());
  }, [today]);

  useEffect(() => {
    load();
    const handler = () => load();
    window.addEventListener('focus', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('focus', handler);
      window.removeEventListener('storage', handler);
    };
  }, [load]);

  const handleDelete = (id: string) => {
    deleteEntry(today, id);
    load();
  };

  const meals = entries.filter((e) => e.type === 'meal') as MealEntry[];
  const symptoms = entries.filter((e) => e.type === 'symptom') as SymptomEntry[];
  const bowels = entries.filter((e) => e.type === 'bowel') as BowelEntry[];
  const highFodmapCount = meals.flatMap((m) => m.foods).filter((f) => f.fodmapOverall === 'high').length;

  return (
    <div className="px-4 pt-6 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{dateLabel}</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
            {greeting.emoji} {greeting.text}
          </h1>
        </div>
        <StreakBadge streak={streak} />
      </div>

      {/* Daily summary chips */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white rounded-2xl p-3 shadow-card border border-gray-100 text-center">
          <div className="text-2xl font-bold text-indigo-600">{meals.length}</div>
          <div className="text-xs text-gray-500 mt-0.5 font-medium">Meals logged</div>
        </div>
        <div className={clsx(
          'rounded-2xl p-3 shadow-card border text-center',
          highFodmapCount > 0 ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100',
        )}>
          <div className={clsx('text-2xl font-bold', highFodmapCount > 0 ? 'text-red-600' : 'text-emerald-600')}>
            {highFodmapCount}
          </div>
          <div className="text-xs text-gray-500 mt-0.5 font-medium">High FODMAP</div>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-card border border-gray-100 text-center">
          <div className="text-2xl font-bold text-violet-600">{bowels.length}</div>
          <div className="text-xs text-gray-500 mt-0.5 font-medium">BMs logged</div>
        </div>
      </div>

      {/* Quick add */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Quick Log</h2>
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-2 flex gap-1.5">
          <QuickLogButton href="/log?type=meal&meal=breakfast" emoji="🌅" label="Breakfast" color="bg-amber-50 text-amber-700" />
          <QuickLogButton href="/log?type=meal&meal=lunch" emoji="☀️" label="Lunch" color="bg-sky-50 text-sky-700" />
          <QuickLogButton href="/log?type=meal&meal=dinner" emoji="🌙" label="Dinner" color="bg-indigo-50 text-indigo-700" />
          <QuickLogButton href="/log?type=meal&meal=snack" emoji="🍎" label="Snack" color="bg-emerald-50 text-emerald-700" />
          <QuickLogButton href="/log?type=symptom" emoji="😣" label="Symptom" color="bg-rose-50 text-rose-700" />
          <QuickLogButton href="/log?type=bowel" emoji="🚽" label="Bowel" color="bg-purple-50 text-purple-700" />
        </div>
      </div>

      {/* Empty state nudge */}
      {entries.length === 0 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0">👆</span>
            <div>
              <p className="font-semibold text-sm text-indigo-900">Nothing logged yet today</p>
              <p className="text-xs text-indigo-500 mt-1">
                Hit a button above whenever you eat, feel something, or need to note a BM. Takes 10 seconds.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Today's timeline */}
      {entries.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Today's Log</h2>
            <span className="text-xs text-gray-400">{entries.length} entr{entries.length === 1 ? 'y' : 'ies'}</span>
          </div>
          <div className="space-y-2">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} onDelete={() => handleDelete(entry.id)} />
            ))}
          </div>
        </div>
      )}

      {/* Phase banner */}
      <Link href="/settings" className="block bg-gray-900 rounded-2xl p-4 text-white active:scale-98 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Current phase</p>
            <p className="text-base font-bold mt-0.5">Elimination</p>
            <p className="text-xs text-gray-400 mt-0.5">No high-FODMAP foods for now</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </div>
      </Link>

      {/* Bottom padding */}
      <div className="h-4" />
    </div>
  );
}
