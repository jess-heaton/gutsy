'use client';

import { useState, useEffect } from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { UserSettings, FODMAPCategory } from '@/lib/types';
import { getSettings, saveSettings } from '@/lib/store';
import clsx from 'clsx';

const PHASES = [
  {
    value: 'elimination'    as const,
    label: 'Elimination',
    duration: '2–6 weeks',
    desc: 'Cut all high-FODMAP foods to get a clean, symptom-free baseline.',
  },
  {
    value: 'reintroduction' as const,
    label: 'Reintroduction',
    duration: '6–8 weeks',
    desc: 'Add one FODMAP group back at a time to identify your actual triggers.',
  },
  {
    value: 'maintenance'    as const,
    label: 'Maintenance',
    duration: 'Ongoing',
    desc: 'Eat as widely as possible while keeping symptoms manageable.',
  },
];

const REINTRO_CATS: { value: FODMAPCategory; label: string; foods: string }[] = [
  { value: 'fructans',  label: 'Fructans',  foods: 'Wheat, onion, garlic, rye'       },
  { value: 'gos',       label: 'GOS',       foods: 'Legumes, chickpeas, cashews'     },
  { value: 'lactose',   label: 'Lactose',   foods: "Milk, yogurt, soft cheese"       },
  { value: 'fructose',  label: 'Fructose',  foods: 'Apple, honey, mango, pear'       },
  { value: 'sorbitol',  label: 'Sorbitol',  foods: 'Stone fruits, avocado'           },
  { value: 'mannitol',  label: 'Mannitol',  foods: 'Mushroom, cauliflower, celery'   },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</h2>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [s, setS] = useState<UserSettings | null>(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => { setS(getSettings()); }, []);
  if (!s) return null;

  const update = (patch: Partial<UserSettings>) => {
    const next = { ...s, ...patch };
    setS(next);
    saveSettings(next);
    setFlash(true);
    setTimeout(() => setFlash(false), 1800);
  };

  const daysSince = Math.floor((Date.now() - new Date(s.startDate).getTime()) / 86400000);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        {flash && (
          <span className="inline-flex items-center gap-1 text-xs text-low font-semibold animate-fade-in">
            <Check className="w-3.5 h-3.5" /> Saved
          </span>
        )}
      </div>

      {/* Profile */}
      <Section title="Profile">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Your name</label>
          <input
            type="text"
            value={s.name}
            onChange={e => update({ name: e.target.value })}
            placeholder="Optional"
            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
      </Section>

      {/* Diet phase */}
      <Section title="Diet phase">
        <p className="text-xs text-gray-500">Day {daysSince} · started {new Date(s.startDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        <div className="space-y-2">
          {PHASES.map(phase => (
            <button
              key={phase.value}
              onClick={() => update({ phase: phase.value })}
              className={clsx(
                'w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all active:scale-98',
                s.phase === phase.value
                  ? 'border-brand-600 bg-brand-50'
                  : 'border-gray-200 bg-white hover:border-gray-300',
              )}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{phase.label}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{phase.duration}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{phase.desc}</p>
              </div>
              <div className={clsx(
                'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all',
                s.phase === phase.value ? 'bg-brand-600 border-brand-600' : 'border-gray-300',
              )}>
                {s.phase === phase.value && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Reintroduction */}
      {s.phase === 'reintroduction' && (
        <Section title="Reintroduction — current group">
          <p className="text-xs text-gray-500">Which FODMAP are you testing this week?</p>
          <div className="grid grid-cols-2 gap-2">
            {REINTRO_CATS.map(cat => (
              <button
                key={cat.value}
                onClick={() => update({ reintroductionCategory: cat.value })}
                className={clsx(
                  'p-3 rounded-xl border-2 text-left transition-all active:scale-98',
                  s.reintroductionCategory === cat.value
                    ? 'border-brand-600 bg-brand-50'
                    : 'border-gray-200 bg-white hover:border-gray-300',
                )}
              >
                <p className="text-xs font-semibold text-gray-900">{cat.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{cat.foods}</p>
              </button>
            ))}
          </div>
        </Section>
      )}

      {/* Start date */}
      <Section title="Diet start date">
        <input
          type="date"
          value={s.startDate}
          onChange={e => update({ startDate: e.target.value })}
          className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </Section>

      {/* Tracking */}
      <Section title="What to track">
        {([
          { key: 'trackMeals'    as const, label: 'Meals and food'     },
          { key: 'trackSymptoms' as const, label: 'Symptoms'           },
          { key: 'trackBowels'   as const, label: 'Bowel movements'    },
        ]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => update({ [key]: !s[key] })}
            className={clsx(
              'w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all',
              s[key] ? 'border-brand-600 bg-brand-50' : 'border-gray-200 bg-white',
            )}
          >
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <div className={clsx('w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all', s[key] ? 'bg-brand-600 border-brand-600' : 'border-gray-300')}>
              {s[key] && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
          </button>
        ))}
      </Section>

      {/* Resources */}
      <Section title="Resources">
        {[
          { label: 'Monash University FODMAP', desc: 'The source of most FODMAP research' },
          { label: 'Find an IBS dietitian',    desc: 'Work with a specialist'             },
          { label: 'The IBS Network',          desc: 'Community and support'              },
        ].map(({ label, desc }) => (
          <div key={label} className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-800">{label}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-300 flex-shrink-0" />
          </div>
        ))}
      </Section>

      <p className="text-xs text-gray-400 text-center pb-4">
        All data stored locally on your device. Nothing is sent anywhere.
      </p>
    </div>
  );
}
