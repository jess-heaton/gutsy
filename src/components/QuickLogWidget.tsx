'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, Pen } from 'lucide-react';
import { addEntry, generateId, getTodayKey, getNowTime } from '@/lib/store';
import { BristolType } from '@/lib/types';
import clsx from 'clsx';

type Mode = 'meal' | 'bowel' | 'symptom';

const BRISTOL_LABELS: Record<number, string> = {
  1: 'Hard',
  2: 'Lumpy',
  3: 'Cracked',
  4: 'Normal',
  5: 'Soft',
  6: 'Mushy',
  7: 'Watery',
};

export default function QuickLogWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('meal');
  const [text, setText] = useState('');
  const [bristol, setBristol] = useState<number | null>(null);
  const [symptomScore, setSymptomScore] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  if (pathname?.startsWith('/popup')) return null;

  const flash = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); setText(''); setBristol(null); setSymptomScore(null); }, 1400);
  };

  const save = () => {
    const base = { id: generateId(), date: getTodayKey(), time: getNowTime() };
    if (mode === 'meal' && text.trim()) {
      addEntry({ ...base, type: 'meal', mealType: 'snack', foods: [], freeText: text.trim() });
      flash();
    } else if (mode === 'bowel' && bristol !== null) {
      addEntry({ ...base, type: 'bowel', bristolType: bristol as BristolType, urgency: 'normal', pain: 0 });
      flash();
    } else if (mode === 'symptom' && symptomScore !== null) {
      addEntry({ ...base, type: 'symptom', overall: symptomScore, bloating: 0, pain: 0, gas: 0, nausea: 0, fatigue: 0, notes: '' });
      flash();
    }
  };

  const canSave = (mode === 'meal' && text.trim()) || (mode === 'bowel' && bristol !== null) || (mode === 'symptom' && symptomScore !== null);

  /* ── Collapsed pill ── */
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:flex fixed bottom-5 left-5 z-[9999] items-center gap-2 bg-brand-900 border border-brand-800 text-white px-3.5 py-2 rounded-full shadow-xl hover:bg-brand-800 hover:border-brand-700 transition-all text-sm font-medium"
      >
        <Pen className="w-3.5 h-3.5 text-brand-400" />
        Quick log
      </button>
    );
  }

  /* ── Expanded widget ── */
  return (
    <div className="hidden lg:block fixed bottom-5 left-5 z-[9999] w-[280px] rounded-2xl overflow-hidden shadow-2xl border border-white/5"
      style={{ background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(20px)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <span className="font-display text-base text-white leading-none">gutsy</span>
        <button
          onClick={() => setOpen(false)}
          className="p-1 text-gray-600 hover:text-gray-300 rounded transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-1 px-3 pt-3">
        {(['meal', 'bowel', 'symptom'] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={clsx(
              'flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize',
              mode === m ? 'bg-brand-800 text-brand-300' : 'text-gray-600 hover:text-gray-300',
            )}
          >
            {m === 'meal' ? '🍎' : m === 'bowel' ? '🚽' : '😣'} {m}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-3 py-3 space-y-2">
        {mode === 'meal' && (
          <textarea
            placeholder="What did you eat?"
            value={text}
            onChange={e => setText(e.target.value)}
            rows={2}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); save(); } }}
            className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-gray-600 resize-none focus:outline-none border border-white/5 focus:border-brand-800"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          />
        )}

        {mode === 'bowel' && (
          <div className="space-y-2">
            <p className="text-xs text-gray-600 px-0.5">Bristol stool type</p>
            <div className="grid grid-cols-7 gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map(n => (
                <button
                  key={n}
                  onClick={() => setBristol(n)}
                  className={clsx(
                    'py-2 rounded-lg text-xs font-bold transition-colors',
                    bristol === n ? 'bg-brand-700 text-white' : 'text-gray-500 hover:text-gray-200',
                  )}
                  style={{ background: bristol === n ? undefined : 'rgba(255,255,255,0.04)' }}
                >
                  {n}
                </button>
              ))}
            </div>
            {bristol !== null && (
              <p className="text-xs text-gray-500 text-center">{BRISTOL_LABELS[bristol]}</p>
            )}
          </div>
        )}

        {mode === 'symptom' && (
          <div className="space-y-2">
            <p className="text-xs text-gray-600 px-0.5">Overall symptom score</p>
            <div className="grid grid-cols-5 gap-1">
              {[2, 4, 6, 8, 10].map(n => (
                <button
                  key={n}
                  onClick={() => setSymptomScore(n)}
                  className={clsx(
                    'py-2 rounded-lg text-xs font-bold transition-colors',
                    symptomScore === n ? 'bg-brand-700 text-white' : 'text-gray-500 hover:text-gray-200',
                  )}
                  style={{ background: symptomScore === n ? undefined : 'rgba(255,255,255,0.04)' }}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-between px-0.5">
              <span className="text-2xs text-gray-700">mild</span>
              <span className="text-2xs text-gray-700">severe</span>
            </div>
          </div>
        )}

        <button
          onClick={save}
          disabled={!canSave || saved}
          className={clsx(
            'w-full py-2 rounded-xl text-xs font-semibold transition-all',
            saved
              ? 'bg-emerald-800 text-emerald-300'
              : canSave
              ? 'bg-brand-700 text-white hover:bg-brand-600'
              : 'text-gray-700 cursor-not-allowed',
          )}
          style={{ background: !canSave && !saved ? 'rgba(255,255,255,0.04)' : undefined }}
        >
          {saved ? '✓ Saved' : 'Log it'}
        </button>
      </div>
    </div>
  );
}
