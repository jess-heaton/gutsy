'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Search, X, Plus, Check, PenLine, Utensils } from 'lucide-react';
import { MealType, MealEntry, SymptomEntry, BowelEntry, NoteEntry, BristolType, LoggedFood } from '@/lib/types';
import { addEntry, generateId, getTodayKey, getNowTime } from '@/lib/store';
import { foods, searchFoods } from '@/data/foods';
import FODMAPBadge from '@/components/FODMAPBadge';
import BristolScale from '@/components/BristolScale';
import SymptomSlider from '@/components/SymptomSlider';
import clsx from 'clsx';

type LogType = 'meal' | 'symptom' | 'bowel' | 'note';

const tabConfig: { type: LogType; emoji: string; label: string; color: string; activeColor: string }[] = [
  { type: 'meal', emoji: '🍽️', label: 'Meal', color: 'text-amber-600', activeColor: 'bg-amber-500' },
  { type: 'symptom', emoji: '😣', label: 'Symptom', color: 'text-rose-600', activeColor: 'bg-rose-500' },
  { type: 'bowel', emoji: '🚽', label: 'Bowel', color: 'text-violet-600', activeColor: 'bg-violet-500' },
  { type: 'note', emoji: '📝', label: 'Note', color: 'text-sky-600', activeColor: 'bg-sky-500' },
];

const mealTypes: { type: MealType; emoji: string; label: string }[] = [
  { type: 'breakfast', emoji: '🌅', label: 'Breakfast' },
  { type: 'lunch', emoji: '☀️', label: 'Lunch' },
  { type: 'dinner', emoji: '🌙', label: 'Dinner' },
  { type: 'snack', emoji: '🍎', label: 'Snack' },
  { type: 'drink', emoji: '💧', label: 'Drink' },
];

function MealLogger({ mealType: initialMealType, onSave }: { mealType: MealType; onSave: () => void }) {
  const [mealType, setMealType] = useState<MealType>(initialMealType);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFoods, setSelectedFoods] = useState<LoggedFood[]>([]);
  const [freeText, setFreeText] = useState('');
  const [mode, setMode] = useState<'search' | 'free'>('search');
  const searchRef = useRef<HTMLInputElement>(null);

  const results = searchQuery.length > 0 ? searchFoods(searchQuery) : foods.slice(0, 20);
  const isSelected = (id: string) => selectedFoods.some((f) => f.foodId === id);

  const toggle = (food: (typeof foods)[0]) => {
    if (isSelected(food.id)) {
      setSelectedFoods((prev) => prev.filter((f) => f.foodId !== food.id));
    } else {
      setSelectedFoods((prev) => [
        ...prev,
        {
          foodId: food.id,
          foodName: food.name,
          emoji: food.emoji,
          fodmapOverall: food.fodmap.overall,
        },
      ]);
    }
  };

  const save = () => {
    const entry: MealEntry = {
      id: generateId(),
      date: getTodayKey(),
      time: getNowTime(),
      type: 'meal',
      mealType,
      foods: selectedFoods,
      freeText: freeText.trim() || undefined,
    };
    addEntry(entry);
    onSave();
  };

  const canSave = selectedFoods.length > 0 || freeText.trim().length > 0;

  return (
    <div className="space-y-4">
      {/* Meal type picker */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Meal type</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {mealTypes.map(({ type, emoji, label }) => (
            <button
              key={type}
              onClick={() => setMealType(type)}
              className={clsx(
                'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0',
                mealType === type
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300',
              )}
            >
              {emoji} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
        <button
          onClick={() => setMode('search')}
          className={clsx(
            'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all',
            mode === 'search' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500',
          )}
        >
          <Search className="w-4 h-4" /> Search foods
        </button>
        <button
          onClick={() => setMode('free')}
          className={clsx(
            'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all',
            mode === 'free' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500',
          )}
        >
          <PenLine className="w-4 h-4" /> Free text
        </button>
      </div>

      {mode === 'search' ? (
        <>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search foods (e.g. banana, rice, chicken)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Selected foods */}
          {selectedFoods.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {selectedFoods.map((f) => (
                <button
                  key={f.foodId}
                  onClick={() => setSelectedFoods((prev) => prev.filter((x) => x.foodId !== f.foodId))}
                  className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-semibold hover:bg-indigo-200 transition-colors"
                >
                  {f.emoji} {f.foodName}
                  <X className="w-3 h-3 ml-0.5" />
                </button>
              ))}
            </div>
          )}

          {/* Food list */}
          <div className="space-y-1.5 max-h-72 overflow-y-auto scrollbar-hide">
            {results.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-6">Nothing found — switch to free text if it's not in the list.</p>
            )}
            {results.map((food) => {
              const selected = isSelected(food.id);
              return (
                <button
                  key={food.id}
                  onClick={() => toggle(food)}
                  className={clsx(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left active:scale-98',
                    selected
                      ? 'border-indigo-300 bg-indigo-50'
                      : 'border-gray-100 bg-white hover:border-gray-200',
                  )}
                >
                  <span className="text-xl w-7 text-center flex-shrink-0">{food.emoji || '🍽️'}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-gray-800 block truncate">{food.name}</span>
                    <span className="text-xs text-gray-400">{food.serving.description}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <FODMAPBadge level={food.fodmap.overall} size="sm" />
                    <div className={clsx(
                      'w-5 h-5 rounded-full flex items-center justify-center transition-all flex-shrink-0',
                      selected ? 'bg-indigo-600' : 'border-2 border-gray-300',
                    )}>
                      {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div>
          <textarea
            placeholder="What did you have? (e.g. scrambled eggs on GF toast, black coffee)"
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            rows={5}
            className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            autoFocus
          />
          <p className="text-xs text-gray-400 mt-1.5">
            No need to be precise — rough notes are fine.
          </p>
        </div>
      )}

      <button
        onClick={save}
        disabled={!canSave}
        className={clsx(
          'w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all',
          canSave
            ? 'bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-lg shadow-indigo-200'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed',
        )}
      >
        {canSave
          ? `Save ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} (${selectedFoods.length} food${selectedFoods.length !== 1 ? 's' : ''}${freeText.trim() ? ' + notes' : ''})`
          : 'Add at least one food'}
      </button>
    </div>
  );
}

function SymptomLogger({ onSave }: { onSave: () => void }) {
  const [values, setValues] = useState({ bloating: 0, pain: 0, gas: 0, nausea: 0, fatigue: 0, overall: 0 });
  const [notes, setNotes] = useState('');

  const set = (key: keyof typeof values) => (v: number) => setValues((prev) => ({ ...prev, [key]: v }));

  const save = () => {
    const entry: SymptomEntry = {
      id: generateId(),
      date: getTodayKey(),
      time: getNowTime(),
      type: 'symptom',
      ...values,
      notes: notes.trim() || undefined,
    };
    addEntry(entry);
    onSave();
  };

  const hasAny = Object.values(values).some((v) => v > 0);

  return (
    <div className="space-y-3">
      <SymptomSlider label="Overall feeling" emoji="🌡️" value={values.overall} onChange={set('overall')} />
      <SymptomSlider label="Bloating" emoji="🫃" value={values.bloating} onChange={set('bloating')} />
      <SymptomSlider label="Abdominal pain" emoji="🤕" value={values.pain} onChange={set('pain')} />
      <SymptomSlider label="Gas / flatulence" emoji="💨" value={values.gas} onChange={set('gas')} />
      <SymptomSlider label="Nausea" emoji="🤢" value={values.nausea} onChange={set('nausea')} />
      <SymptomSlider label="Fatigue" emoji="😴" value={values.fatigue} onChange={set('fatigue')} />

      <div>
        <textarea
          placeholder="Any additional notes... (e.g. stress, menstrual cycle, medication)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
        />
      </div>

      <button
        onClick={save}
        className="w-full py-3.5 rounded-2xl font-bold text-white text-sm bg-rose-500 hover:bg-rose-600 active:scale-98 transition-all shadow-lg shadow-rose-200"
      >
        Save Symptom Log
      </button>
    </div>
  );
}

function BowelLogger({ onSave }: { onSave: () => void }) {
  const [bristol, setBristol] = useState<BristolType | undefined>();
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'very-urgent'>('normal');
  const [pain, setPain] = useState(0);
  const [notes, setNotes] = useState('');

  const save = () => {
    if (!bristol) return;
    const entry: BowelEntry = {
      id: generateId(),
      date: getTodayKey(),
      time: getNowTime(),
      type: 'bowel',
      bristolType: bristol,
      urgency,
      pain,
      notes: notes.trim() || undefined,
    };
    addEntry(entry);
    onSave();
  };

  return (
    <div className="space-y-4">
      <BristolScale value={bristol} onChange={setBristol} />

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Urgency</p>
        <div className="flex gap-2">
          {(['normal', 'urgent', 'very-urgent'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUrgency(u)}
              className={clsx(
                'flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all',
                urgency === u ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200',
              )}
            >
              {u === 'normal' ? '😌 Normal' : u === 'urgent' ? '⚡ Urgent' : '🚨 Very urgent'}
            </button>
          ))}
        </div>
      </div>

      <SymptomSlider label="Associated pain" emoji="🤕" value={pain} onChange={setPain} />

      <textarea
        placeholder="Notes (optional)..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
      />

      <button
        onClick={save}
        disabled={!bristol}
        className={clsx(
          'w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all',
          bristol
            ? 'bg-violet-600 hover:bg-violet-700 active:scale-98 shadow-lg shadow-violet-200'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed',
        )}
      >
        {bristol ? 'Save Bowel Entry' : 'Select a type above'}
      </button>
    </div>
  );
}

function NoteLogger({ onSave }: { onSave: () => void }) {
  const [text, setText] = useState('');

  const save = () => {
    const entry: NoteEntry = {
      id: generateId(),
      date: getTodayKey(),
      time: getNowTime(),
      type: 'note',
      text: text.trim(),
    };
    addEntry(entry);
    onSave();
  };

  return (
    <div className="space-y-4">
      <textarea
        placeholder="What do you want to note? (e.g. feeling stressed, trying a new food, missed medication...)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
        autoFocus
      />
      <button
        onClick={save}
        disabled={!text.trim()}
        className={clsx(
          'w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all',
          text.trim()
            ? 'bg-sky-500 hover:bg-sky-600 active:scale-98 shadow-lg shadow-sky-200'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed',
        )}
      >
        Save Note
      </button>
    </div>
  );
}

function LogPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as LogType | null;
  const mealParam = searchParams.get('meal') as MealType | null;

  const [activeType, setActiveType] = useState<LogType>(typeParam || 'meal');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      router.push('/');
      router.refresh();
    }, 800);
  };

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-fade-in">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center animate-pop">
          <Check className="w-10 h-10 text-emerald-600" strokeWidth={3} />
        </div>
        <p className="text-xl font-bold text-gray-800">Done.</p>
        <p className="text-sm text-gray-400">Heading back...</p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Add Log Entry</h1>
      </div>

      {/* Type tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
        {tabConfig.map(({ type, emoji, label, activeColor }) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={clsx(
              'flex-1 flex flex-col items-center py-2 rounded-lg text-xs font-semibold transition-all gap-0.5',
              activeType === type ? `${activeColor} text-white shadow-sm` : 'text-gray-500',
            )}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeType === 'meal' && (
        <MealLogger mealType={mealParam || 'breakfast'} onSave={handleSave} />
      )}
      {activeType === 'symptom' && <SymptomLogger onSave={handleSave} />}
      {activeType === 'bowel' && <BowelLogger onSave={handleSave} />}
      {activeType === 'note' && <NoteLogger onSave={handleSave} />}

      <div className="h-4" />
    </div>
  );
}

export default function LogPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" /></div>}>
      <LogPageInner />
    </Suspense>
  );
}
