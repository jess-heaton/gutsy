'use client';

import { useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Search, X, Check } from 'lucide-react';
import { MealType, MealEntry, SymptomEntry, BowelEntry, NoteEntry, BristolType, LoggedFood } from '@/lib/types';
import { addEntry, generateId, getTodayKey, getNowTime } from '@/lib/store';
import { foods, searchFoods } from '@/data/foods';
import FODMAPBadge from '@/components/FODMAPBadge';
import BristolScale from '@/components/BristolScale';
import SymptomSlider from '@/components/SymptomSlider';
import clsx from 'clsx';

type LogType = 'meal' | 'symptom' | 'bowel' | 'note';

const TABS: { type: LogType; label: string }[] = [
  { type: 'meal',    label: 'Meal'    },
  { type: 'symptom', label: 'Symptom' },
  { type: 'bowel',   label: 'Bowel'   },
  { type: 'note',    label: 'Note'    },
];

const MEAL_TYPES: { type: MealType; label: string }[] = [
  { type: 'breakfast', label: 'Breakfast' },
  { type: 'lunch',     label: 'Lunch'     },
  { type: 'dinner',    label: 'Dinner'    },
  { type: 'snack',     label: 'Snack'     },
  { type: 'drink',     label: 'Drink'     },
];

function MealLogger({ initialMealType, onSave }: { initialMealType: MealType; onSave: () => void }) {
  const [mealType, setMealType] = useState(initialMealType);
  const [query, setQuery]       = useState('');
  const [selected, setSelected] = useState<LoggedFood[]>([]);
  const [freeText, setFreeText] = useState('');
  const [mode, setMode]         = useState<'search' | 'free'>('search');
  const inputRef = useRef<HTMLInputElement>(null);

  const results  = query ? searchFoods(query) : foods.slice(0, 24);
  const isActive = (id: string) => selected.some(f => f.foodId === id);

  const toggle = (food: (typeof foods)[0]) => {
    setSelected(prev =>
      isActive(food.id)
        ? prev.filter(f => f.foodId !== food.id)
        : [...prev, { foodId: food.id, foodName: food.name, emoji: food.emoji, fodmapOverall: food.fodmap.overall }]
    );
  };

  const save = () => {
    addEntry({
      id: generateId(), date: getTodayKey(), time: getNowTime(),
      type: 'meal', mealType, foods: selected,
      freeText: freeText.trim() || undefined,
    } as MealEntry);
    onSave();
  };

  const canSave = selected.length > 0 || freeText.trim().length > 0;

  return (
    <div className="space-y-5">
      {/* Meal type */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Meal type</label>
        <div className="flex gap-2 flex-wrap">
          {MEAL_TYPES.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => setMealType(type)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all',
                mealType === type
                  ? 'bg-brand-700 text-white border-brand-700'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setMode('search')}
          className={clsx('flex-1 py-2 rounded-lg text-sm font-medium transition-all', mode === 'search' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700')}
        >
          Search foods
        </button>
        <button
          onClick={() => setMode('free')}
          className={clsx('flex-1 py-2 rounded-lg text-sm font-medium transition-all', mode === 'free' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700')}
        >
          Free text
        </button>
      </div>

      {mode === 'search' ? (
        <>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search foods…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
              className="w-full pl-9 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-gray-400" /></button>}
          </div>

          {/* Selected chips */}
          {selected.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {selected.map(f => (
                <button
                  key={f.foodId}
                  onClick={() => setSelected(prev => prev.filter(x => x.foodId !== f.foodId))}
                  className="flex items-center gap-1 bg-brand-100 text-brand-800 px-2.5 py-1 rounded-full text-xs font-medium hover:bg-brand-200 transition-colors"
                >
                  {f.foodName} <X className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}

          {/* List */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-h-72 overflow-y-auto scrollbar-hide divide-y divide-gray-100">
            {results.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-8">Nothing found — try free text</p>
            )}
            {results.map(food => (
              <button
                key={food.id}
                onClick={() => toggle(food)}
                className={clsx('w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50', isActive(food.id) && 'bg-brand-50')}
              >
                <span className="text-base w-6 text-center flex-shrink-0">{food.emoji ?? '—'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{food.name}</p>
                  <p className="text-xs text-gray-400">{food.serving.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <FODMAPBadge level={food.fodmap.overall} size="sm" />
                  <div className={clsx('w-4 h-4 rounded border-2 flex items-center justify-center transition-all', isActive(food.id) ? 'bg-brand-600 border-brand-600' : 'border-gray-300')}>
                    {isActive(food.id) && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>
          <textarea
            placeholder="What did you have? (e.g. scrambled eggs on GF toast, black coffee)"
            value={freeText}
            onChange={e => setFreeText(e.target.value)}
            rows={5}
            autoFocus
            className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <p className="text-xs text-gray-400 mt-1.5">No need to be precise — rough notes are fine.</p>
        </div>
      )}

      <button
        onClick={save}
        disabled={!canSave}
        className={clsx(
          'w-full py-3 rounded-xl font-semibold text-sm transition-all',
          canSave ? 'bg-brand-700 text-white hover:bg-brand-800 active:scale-98' : 'bg-gray-100 text-gray-400 cursor-not-allowed',
        )}
      >
        {canSave ? `Save ${mealType}${selected.length > 0 ? ` (${selected.length} food${selected.length !== 1 ? 's' : ''})` : ''}` : 'Add at least one food'}
      </button>
    </div>
  );
}

function SymptomLogger({ onSave }: { onSave: () => void }) {
  const [v, setV] = useState({ bloating: 0, pain: 0, gas: 0, nausea: 0, fatigue: 0, overall: 0 });
  const [notes, setNotes] = useState('');
  const set = (k: keyof typeof v) => (n: number) => setV(p => ({ ...p, [k]: n }));

  const save = () => {
    addEntry({ id: generateId(), date: getTodayKey(), time: getNowTime(), type: 'symptom', ...v, notes: notes.trim() || undefined } as SymptomEntry);
    onSave();
  };

  return (
    <div className="space-y-3">
      <SymptomSlider label="Overall feeling"   emoji="🌡️" value={v.overall}  onChange={set('overall')}  />
      <SymptomSlider label="Bloating"          emoji="🫃" value={v.bloating} onChange={set('bloating')} />
      <SymptomSlider label="Abdominal pain"    emoji="🤕" value={v.pain}     onChange={set('pain')}     />
      <SymptomSlider label="Gas"               emoji="💨" value={v.gas}      onChange={set('gas')}      />
      <SymptomSlider label="Nausea"            emoji="🤢" value={v.nausea}   onChange={set('nausea')}   />
      <SymptomSlider label="Fatigue"           emoji="😴" value={v.fatigue}  onChange={set('fatigue')}  />
      <textarea
        placeholder="Any notes? (stress, medication, menstrual cycle…)"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        rows={2}
        className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
      <button onClick={save} className="w-full py-3 bg-rose-600 text-white rounded-xl font-semibold text-sm hover:bg-rose-700 active:scale-98 transition-all">
        Save symptom log
      </button>
    </div>
  );
}

function BowelLogger({ onSave }: { onSave: () => void }) {
  const [bristol, setBristol] = useState<BristolType | undefined>();
  const [urgency, setUrgency] = useState<'normal'|'urgent'|'very-urgent'>('normal');
  const [pain, setPain] = useState(0);

  const save = () => {
    if (!bristol) return;
    addEntry({ id: generateId(), date: getTodayKey(), time: getNowTime(), type: 'bowel', bristolType: bristol, urgency, pain } as BowelEntry);
    onSave();
  };

  return (
    <div className="space-y-5">
      <BristolScale value={bristol} onChange={setBristol} />
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Urgency</label>
        <div className="flex gap-2">
          {(['normal','urgent','very-urgent'] as const).map(u => (
            <button
              key={u}
              onClick={() => setUrgency(u)}
              className={clsx('flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all', urgency === u ? 'bg-brand-700 text-white border-brand-700' : 'bg-white text-gray-600 border-gray-200')}
            >
              {u === 'normal' ? 'Normal' : u === 'urgent' ? 'Urgent' : 'Very urgent'}
            </button>
          ))}
        </div>
      </div>
      <SymptomSlider label="Associated pain" emoji="🤕" value={pain} onChange={setPain} />
      <button
        onClick={save}
        disabled={!bristol}
        className={clsx('w-full py-3 rounded-xl font-semibold text-sm transition-all', bristol ? 'bg-violet-700 text-white hover:bg-violet-800 active:scale-98' : 'bg-gray-100 text-gray-400 cursor-not-allowed')}
      >
        {bristol ? 'Save bowel entry' : 'Select a type above'}
      </button>
    </div>
  );
}

function NoteLogger({ onSave }: { onSave: () => void }) {
  const [text, setText] = useState('');
  const save = () => {
    addEntry({ id: generateId(), date: getTodayKey(), time: getNowTime(), type: 'note', text: text.trim() } as NoteEntry);
    onSave();
  };
  return (
    <div className="space-y-4">
      <textarea
        placeholder="Anything worth noting… (new supplement, stressful day, missed medication)"
        value={text}
        onChange={e => setText(e.target.value)}
        rows={8}
        autoFocus
        className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
      <button
        onClick={save}
        disabled={!text.trim()}
        className={clsx('w-full py-3 rounded-xl font-semibold text-sm transition-all', text.trim() ? 'bg-gray-900 text-white hover:bg-gray-800 active:scale-98' : 'bg-gray-100 text-gray-400 cursor-not-allowed')}
      >
        Save note
      </button>
    </div>
  );
}

function LogInner() {
  const router = useRouter();
  const params = useSearchParams();
  const typeParam = params.get('type') as LogType | null;
  const mealParam = params.get('meal') as MealType | null;

  const [tab, setTab]   = useState<LogType>(typeParam || 'meal');
  const [done, setDone] = useState(false);

  const handleSave = () => {
    setDone(true);
    setTimeout(() => { router.push('/'); router.refresh(); }, 900);
  };

  if (done) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 animate-fade-in">
      <div className="w-16 h-16 bg-low/10 rounded-full flex items-center justify-center animate-pop">
        <Check className="w-8 h-8 text-low" strokeWidth={2.5} />
      </div>
      <p className="text-lg font-bold text-gray-900">Saved</p>
      <p className="text-sm text-gray-400">Heading back…</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Add entry</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {TABS.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => setTab(type)}
            className={clsx(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px',
              tab === type
                ? 'text-brand-700 border-brand-700'
                : 'text-gray-500 border-transparent hover:text-gray-700',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'meal'    && <MealLogger initialMealType={mealParam ?? 'breakfast'} onSave={handleSave} />}
      {tab === 'symptom' && <SymptomLogger onSave={handleSave} />}
      {tab === 'bowel'   && <BowelLogger onSave={handleSave} />}
      {tab === 'note'    && <NoteLogger onSave={handleSave} />}
    </div>
  );
}

export default function LogPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="w-6 h-6 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" /></div>}>
      <LogInner />
    </Suspense>
  );
}
