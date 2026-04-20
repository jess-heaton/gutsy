'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, Pen } from 'lucide-react';
import { addEntry, generateId, getTodayKey, getNowTime } from '@/lib/store';
import { BristolType } from '@/lib/types';
import clsx from 'clsx';

const BRISTOL_LABELS: Record<number, string> = {
  1: 'Hard', 2: 'Lumpy', 3: 'Cracked', 4: 'Normal', 5: 'Soft', 6: 'Mushy', 7: 'Watery',
};

type MedKey = 'paracetamol' | 'psyllium' | 'lactase' | 'fodzyme';
const MEDS: { key: MedKey; label: string; emoji: string }[] = [
  { key: 'paracetamol', label: 'Paracetamol', emoji: '💊' },
  { key: 'psyllium', label: 'Psyllium', emoji: '🌾' },
  { key: 'lactase', label: 'Lactase', emoji: '🥛' },
  { key: 'fodzyme', label: 'Fodzyme', emoji: '🧪' },
];

export default function QuickLogWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [flashMsg, setFlashMsg] = useState<string | null>(null);

  if (pathname?.startsWith('/popup')) return null;

  const flash = (msg: string) => {
    setFlashMsg(msg);
    setText('');
    setTimeout(() => setFlashMsg(null), 1200);
  };

  const base = () => ({ id: generateId(), date: getTodayKey(), time: getNowTime() });

  const logMeal = () => {
    const t = text.trim();
    if (!t) return;
    addEntry({ ...base(), type: 'meal', mealType: 'snack', foods: [], freeText: t });
    flash('✓ Meal logged');
  };

  const logBristol = (n: number) => {
    addEntry({ ...base(), type: 'bowel', bristolType: n as BristolType, urgency: 'normal', pain: 0 });
    flash(`✓ Bristol ${n} — ${BRISTOL_LABELS[n]}`);
  };

  const logMed = (med: { key: MedKey; label: string }) => {
    const t = text.trim();
    if (med.key === 'lactase' || med.key === 'fodzyme') {
      if (t) {
        addEntry({ ...base(), type: 'meal', mealType: 'snack', foods: [], freeText: `${t} (with ${med.label.toLowerCase()})` });
        flash(`✓ Logged with ${med.label}`);
        return;
      }
    }
    const noteText = t ? `${med.label} — ${t}` : `Took ${med.label}`;
    addEntry({ ...base(), type: 'note', text: noteText });
    flash(`✓ ${med.label} logged`);
  };

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
    <div className="hidden lg:block fixed bottom-5 left-5 z-[9999] w-[300px] rounded-2xl overflow-hidden shadow-2xl border border-white/5"
      style={{ background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(20px)' }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <span className="font-display text-base text-white leading-none">gutsy</span>
        <button
          onClick={() => setOpen(false)}
          className="p-1 text-gray-600 hover:text-gray-300 rounded transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="px-3 py-3 space-y-3">
        <textarea
          placeholder="What did you eat or feel? Enter to log…"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={2}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); logMeal(); } }}
          className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-gray-600 resize-none focus:outline-none border border-white/5 focus:border-brand-800"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        />

        <div>
          <p className="text-2xs uppercase tracking-wider text-gray-600 px-0.5 mb-1.5">Stool type</p>
          <div className="grid grid-cols-7 gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map(n => (
              <button
                key={n}
                onClick={() => logBristol(n)}
                title={BRISTOL_LABELS[n]}
                className="py-2 rounded-lg text-xs font-bold text-gray-400 hover:text-white hover:bg-brand-700 transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-2xs uppercase tracking-wider text-gray-600 px-0.5 mb-1.5">Meds & enzymes</p>
          <div className="grid grid-cols-2 gap-1">
            {MEDS.map(m => (
              <button
                key={m.key}
                onClick={() => logMed(m)}
                className="py-2 px-2 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-brand-700 transition-colors flex items-center gap-1.5"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {flashMsg && (
          <div className={clsx(
            'text-center text-xs font-semibold py-2 rounded-xl',
            'bg-emerald-900/50 text-emerald-300',
          )}>
            {flashMsg}
          </div>
        )}
      </div>
    </div>
  );
}
