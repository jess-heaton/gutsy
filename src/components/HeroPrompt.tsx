'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import {
  ArrowRight, ScanLine, ChefHat, Refrigerator, PlayCircle, Pen, Sparkles, Loader2,
} from 'lucide-react';

const EXAMPLES = [
  "I'm starting the elimination diet",
  'Scan the Nando\'s menu for me',
  'Make carbonara low-FODMAP',
  'I have chicken, rice and spinach in my fridge',
  'Log celery with peanut butter',
  'Is sourdough OK for IBS?',
  'What can I eat at an Italian restaurant?',
  'Swap high-FODMAP ingredients in banana bread',
];

const QUICK_ACTIONS = [
  { icon: PlayCircle,   label: 'Start tracking', href: '/signup' },
  { icon: ScanLine,     label: 'Scan a menu',    href: '/menu' },
  { icon: ChefHat,      label: 'Fix a recipe',   href: '/recipe' },
  { icon: Refrigerator, label: 'Fridge → recipe', href: '/recipe?mode=fridge' },
  { icon: Pen,          label: 'Quick log',      href: '/dashboard?quicklog=1' },
];

type Intent = {
  route: string;
  label: string;
  icon: React.ElementType;
};

function matchIntent(text: string): Intent {
  const t = text.trim();
  const q = encodeURIComponent(t);
  const l = t.toLowerCase();
  const has = (...words: string[]) => words.some(w => l.includes(w));

  if (has('menu', 'restaurant', 'cafe', 'takeaway', 'eating out', 'nando', 'pizza express'))
    return { route: `/menu?q=${q}`, label: 'Scanning menu', icon: ScanLine };

  if (has('fridge', 'have ', 'got ', 'leftover', 'in my kitchen', 'what can i cook', 'what can i make'))
    return { route: `/recipe?mode=fridge&q=${q}`, label: 'Finding a recipe', icon: Refrigerator };

  if (has('recipe', 'bake', 'cook', 'make this', 'fix this', 'swap', 'carbonara', 'bread', 'pasta', 'curry'))
    return { route: `/recipe?q=${q}`, label: 'Fixing recipe', icon: ChefHat };

  if (has('log', 'add ', 'ate ', 'had ', 'track this', 'track my'))
    return { route: `/dashboard?quicklog=${q}`, label: 'Logging it', icon: Pen };

  if (has('elimination', 'reintroduction', 'just got diagnosed', 'diagnosed', 'phase', 'starting'))
    return { route: `/signup?intent=${q}`, label: 'Starting you off', icon: PlayCircle };

  if (has('safe', 'can i eat', 'is ', 'high fodmap', 'low fodmap', 'fodmap'))
    return { route: `/foods?q=${q}`, label: 'Checking the food guide', icon: Sparkles };

  return { route: `/dashboard?quicklog=${q}`, label: 'Taking you to Gutsy', icon: Sparkles };
}

export default function HeroPrompt() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [focused, setFocused] = useState(false);
  const [submitting, setSubmitting] = useState<Intent | null>(null);

  const idxRef = useRef(0);
  const charRef = useRef(0);
  const dirRef = useRef<'type' | 'pause' | 'delete'>('type');
  const inputRef = useRef<HTMLInputElement>(null);

  const showFake = !value && !focused && !submitting;

  // Typewriter. Only runs while idle (no value, not focused, not submitting).
  useEffect(() => {
    if (!showFake) return;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const full = EXAMPLES[idxRef.current];
      let delay = 32;

      if (dirRef.current === 'type') {
        charRef.current = Math.min(charRef.current + 1, full.length);
        setPlaceholder(full.slice(0, charRef.current));
        if (charRef.current === full.length) { dirRef.current = 'pause'; delay = 1100; }
      } else if (dirRef.current === 'pause') {
        dirRef.current = 'delete';
        delay = 30;
      } else {
        charRef.current = Math.max(charRef.current - 1, 0);
        setPlaceholder(full.slice(0, charRef.current));
        if (charRef.current === 0) {
          dirRef.current = 'type';
          idxRef.current = (idxRef.current + 1) % EXAMPLES.length;
          delay = 220;
        }
      }
      setTimeout(tick, delay);
    };
    const t = setTimeout(tick, 200);
    return () => { cancelled = true; clearTimeout(t); };
  }, [showFake]);

  function submit() {
    if (submitting) return;
    const text = value.trim() || EXAMPLES[idxRef.current];
    const intent = matchIntent(text);
    setSubmitting(intent);
    // Brief confirm animation → route. Feels intentional, not jarring.
    setTimeout(() => router.push(intent.route), 550);
  }

  return (
    <div className="w-full max-w-xl">
      <div
        className={clsx(
          'relative rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 border transition-colors',
          focused ? 'border-brand-400' : 'border-white/40',
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-2 px-5 py-3.5">
          <div className="flex-1 relative min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              disabled={!!submitting}
              aria-label="Ask Gutsy anything about your diet"
              className={clsx(
                'w-full bg-transparent outline-none text-[17px] leading-[1.4] text-gray-900 py-1.5',
                showFake && 'caret-transparent',
              )}
            />
            {showFake && (
              <div className="absolute inset-0 flex items-center pointer-events-none text-[17px] leading-[1.4] text-gray-500 py-1.5 truncate">
                <span className="whitespace-pre">{placeholder}</span>
                <span className="inline-block w-[2px] h-[1.1em] bg-brand-600 ml-0.5 animate-blink" />
              </div>
            )}
            {submitting && (
              <div className="absolute inset-0 flex items-center pointer-events-none text-[17px] leading-[1.4] text-gray-700 py-1.5 truncate">
                <submitting.icon className="w-4 h-4 text-brand-600 mr-2 flex-shrink-0" />
                <span>{submitting.label}…</span>
              </div>
            )}
          </div>
          <button
            onClick={submit}
            disabled={!!submitting}
            aria-label="Go"
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-700 hover:bg-brand-800 disabled:opacity-70 text-white flex items-center justify-center transition-colors shadow-sm"
          >
            {submitting
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Quick-action chips */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {QUICK_ACTIONS.map(({ icon: Icon, label, href }) => (
          <button
            key={label}
            onClick={() => router.push(href)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/90 text-xs font-medium hover:bg-white/15 hover:border-white/25 transition-colors"
          >
            <Icon className="w-3.5 h-3.5 text-brand-300" /> {label}
          </button>
        ))}
      </div>

      <style jsx global>{`
        @keyframes gutsy-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .animate-blink { animation: gutsy-blink 0.9s steps(2, end) infinite; }
      `}</style>
    </div>
  );
}
