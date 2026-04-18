'use client';

import { useState, useEffect } from 'react';
import { Check, ChevronRight, BookOpen, ExternalLink, Heart } from 'lucide-react';
import { UserSettings, FODMAPCategory } from '@/lib/types';
import { getSettings, saveSettings } from '@/lib/store';
import clsx from 'clsx';

const phases = [
  {
    value: 'elimination' as const,
    label: 'Elimination',
    emoji: '🚫',
    duration: '2–6 weeks',
    desc: 'Cut all high-FODMAP foods. Boring, but necessary to get a clean baseline.',
    color: 'border-red-200 bg-red-50',
    activeColor: 'border-red-400 bg-red-50 ring-2 ring-red-200',
  },
  {
    value: 'reintroduction' as const,
    label: 'Reintroduction',
    emoji: '🔬',
    duration: '6–8 weeks',
    desc: 'Add FODMAP groups back one at a time to figure out what actually sets you off.',
    color: 'border-amber-200 bg-amber-50',
    activeColor: 'border-amber-400 bg-amber-50 ring-2 ring-amber-200',
  },
  {
    value: 'maintenance' as const,
    label: 'Maintenance',
    emoji: '✅',
    duration: 'Ongoing',
    desc: 'You know your triggers. Eat as widely as you can while keeping symptoms manageable.',
    color: 'border-emerald-200 bg-emerald-50',
    activeColor: 'border-emerald-400 bg-emerald-50 ring-2 ring-emerald-200',
  },
];

const reintroCategories: { value: FODMAPCategory; label: string; emoji: string; foods: string }[] = [
  { value: 'fructans', label: 'Fructans', emoji: '🌾', foods: 'Wheat, onion, garlic, rye' },
  { value: 'gos', label: 'GOS', emoji: '🫘', foods: 'Legumes, chickpeas, cashews' },
  { value: 'lactose', label: 'Lactose', emoji: '🥛', foods: "Milk, yogurt, soft cheese" },
  { value: 'fructose', label: 'Fructose', emoji: '🍎', foods: 'Apple, honey, mango, pear' },
  { value: 'sorbitol', label: 'Sorbitol', emoji: '🍑', foods: 'Stone fruits, avocado' },
  { value: 'mannitol', label: 'Mannitol', emoji: '🍄', foods: 'Mushroom, cauliflower, celery' },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  if (!settings) return null;

  const update = (partial: Partial<UserSettings>) => {
    const updated = { ...settings, ...partial };
    setSettings(updated);
    saveSettings(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const daysSinceStart = Math.floor((Date.now() - new Date(settings.startDate).getTime()) / 86400000);

  return (
    <div className="px-4 pt-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        {saved && (
          <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 animate-fade-in">
            <Check className="w-3 h-3" /> Saved
          </span>
        )}
      </div>

      {/* Name */}
      <Section title="Your name" emoji="👤">
        <input
          type="text"
          value={settings.name}
          onChange={(e) => update({ name: e.target.value })}
          placeholder="Enter your name"
          className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
        />
      </Section>

      {/* Diet phase */}
      <Section title="Diet phase" emoji="🗺️">
        <p className="text-xs text-gray-500 mb-3">
          Day {daysSinceStart} since {new Date(settings.startDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
        <div className="space-y-2">
          {phases.map((phase) => (
            <button
              key={phase.value}
              onClick={() => update({ phase: phase.value })}
              className={clsx(
                'w-full flex items-start gap-3 p-3.5 rounded-2xl border-2 text-left transition-all active:scale-98',
                settings.phase === phase.value ? phase.activeColor : phase.color,
              )}
            >
              <span className="text-2xl flex-shrink-0">{phase.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-800">{phase.label}</span>
                  <span className="text-xs text-gray-500 bg-white/70 px-2 py-0.5 rounded-full">{phase.duration}</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{phase.desc}</p>
              </div>
              {settings.phase === phase.value && (
                <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </Section>

      {/* Reintroduction category */}
      {settings.phase === 'reintroduction' && (
        <Section title="Current reintroduction" emoji="🔬">
          <p className="text-xs text-gray-500 mb-3">Which one are you testing this week?</p>
          <div className="grid grid-cols-2 gap-2">
            {reintroCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => update({ reintroductionCategory: cat.value })}
                className={clsx(
                  'flex items-start gap-2 p-3 rounded-xl border-2 text-left transition-all active:scale-98',
                  settings.reintroductionCategory === cat.value
                    ? 'border-indigo-400 bg-indigo-50 ring-2 ring-indigo-100'
                    : 'border-gray-200 bg-white',
                )}
              >
                <span className="text-lg">{cat.emoji}</span>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{cat.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{cat.foods}</p>
                </div>
              </button>
            ))}
          </div>
        </Section>
      )}

      {/* Start date */}
      <Section title="Diet start date" emoji="📅">
        <input
          type="date"
          value={settings.startDate}
          onChange={(e) => update({ startDate: e.target.value })}
          className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </Section>

      {/* Tracking preferences */}
      <Section title="What to track" emoji="📋">
        <div className="space-y-2">
          {[
            { key: 'trackMeals' as const, label: 'Meals & food', emoji: '🍽️' },
            { key: 'trackSymptoms' as const, label: 'Symptoms', emoji: '😣' },
            { key: 'trackBowels' as const, label: 'Bowel movements', emoji: '🚽' },
          ].map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => update({ [key]: !settings[key] })}
              className={clsx(
                'w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border-2 transition-all',
                settings[key] ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200 bg-white',
              )}
            >
              <span className="text-lg">{emoji}</span>
              <span className="text-sm font-semibold text-gray-700 flex-1 text-left">{label}</span>
              <div className={clsx(
                'w-5 h-5 rounded-full transition-all',
                settings[key] ? 'bg-indigo-600' : 'border-2 border-gray-300',
              )}>
                {settings[key] && <Check className="w-5 h-5 text-white p-0.5" strokeWidth={3} />}
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Resources */}
      <Section title="Resources" emoji="📚">
        <div className="space-y-2">
          <ResourceLink
            emoji="🎓"
            title="Monash University FODMAP"
            desc="The world's leading FODMAP research centre"
          />
          <ResourceLink
            emoji="👩‍⚕️"
            title="Find a dietitian"
            desc="Work with an IBS-specialist dietitian"
          />
          <ResourceLink
            emoji="💬"
            title="IBS Network"
            desc="Community support & resources"
          />
        </div>
      </Section>

      {/* App info */}
      <div className="text-center py-4">
        <p className="text-xs text-gray-400">Gut Feeling v0.1.0</p>
        <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
          Built for guts that need a little extra attention <Heart className="w-3 h-3 text-rose-400" />
        </p>
        <p className="text-xs text-gray-300 mt-2">
          Your data stays on your phone. We don't see any of it.
        </p>
      </div>

      <div className="h-4" />
    </div>
  );
}

function Section({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
        <span>{emoji}</span> {title}
      </h2>
      {children}
    </div>
  );
}

function ResourceLink({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 px-3.5 py-3">
      <span className="text-xl flex-shrink-0">{emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-gray-300 flex-shrink-0" />
    </div>
  );
}
