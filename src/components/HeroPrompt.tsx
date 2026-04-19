'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ScanLine, ChefHat, Refrigerator, PlayCircle, Pen } from 'lucide-react';

/* Cycling example prompts. Each maps to a route via routeFor(). */
const EXAMPLES = [
  "I'm starting the elimination diet",
  'Scan this menu',
  'Make this recipe low-FODMAP',
  'I have chicken, rice and spinach in my fridge',
  'Add celery and peanut butter to today',
  'Is sourdough OK for IBS?',
];

const QUICK_ACTIONS = [
  { icon: PlayCircle,   label: 'Start tracking', href: '/signup' },
  { icon: ScanLine,     label: 'Scan a menu',    href: '/menu' },
  { icon: ChefHat,      label: 'Fix a recipe',   href: '/recipe' },
  { icon: Refrigerator, label: 'What can I cook?', href: '/recipe?mode=fridge' },
  { icon: Pen,          label: 'Quick log',      href: '/dashboard?quicklog=1' },
];

function routeFor(text: string): string {
  const t = text.trim();
  const q = encodeURIComponent(t);
  const l = t.toLowerCase();

  const has = (...words: string[]) => words.some(w => l.includes(w));

  if (has('menu', 'restaurant', 'cafe', 'takeaway', 'eating out')) return `/menu?q=${q}`;
  if (has('fridge', 'have ', 'leftover', 'in my kitchen', 'what can i cook', 'what can i make')) return `/recipe?mode=fridge&q=${q}`;
  if (has('recipe', 'bake', 'cook', 'make this', 'fix this', 'swap')) return `/recipe?q=${q}`;
  if (has('log', 'add ', 'ate ', 'had ', 'track this', 'track my')) return `/dashboard?quicklog=${q}`;
  if (has('elimination', 'reintroduction', 'start', 'begin', 'just got diagnosed', 'diagnosed', 'phase')) return `/signup?intent=${q}`;
  if (has('safe', 'is ', 'can i eat', 'high fodmap', 'low fodmap', 'fodmap')) return `/foods?q=${q}`;
  // Default: take them to the tracker with the text prefilled as a quick log.
  return `/dashboard?quicklog=${q}`;
}

export default function HeroPrompt() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [focused, setFocused] = useState(false);
  const idxRef = useRef(0);
  const charRef = useRef(0);
  const dirRef = useRef<'type' | 'pause' | 'delete'>('type');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Typewriter cycling through EXAMPLES. Pauses when input is focused or has content.
  useEffect(() => {
    if (focused || value) return;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const full = EXAMPLES[idxRef.current];
      let delay = 55;

      if (dirRef.current === 'type') {
        charRef.current += 1;
        setPlaceholder(full.slice(0, charRef.current));
        if (charRef.current === full.length) { dirRef.current = 'pause'; delay = 1800; }
      } else if (dirRef.current === 'pause') {
        dirRef.current = 'delete';
        delay = 60;
      } else {
        charRef.current -= 1;
        setPlaceholder(full.slice(0, charRef.current));
        if (charRef.current === 0) {
          dirRef.current = 'type';
          idxRef.current = (idxRef.current + 1) % EXAMPLES.length;
          delay = 350;
        }
      }
      setTimeout(tick, delay);
    };
    tick();
    return () => { cancelled = true; };
  }, [focused, value]);

  function submit() {
    const text = value.trim() || EXAMPLES[idxRef.current];
    router.push(routeFor(text));
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="w-full max-w-xl">
      <div
        className="relative rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/40 p-1.5 ring-1 ring-black/5"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-start gap-2 px-4 py-3">
          <div className="flex-1 min-h-[52px] relative">
            <textarea
              ref={inputRef}
              rows={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKey}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full resize-none bg-transparent outline-none text-[17px] text-gray-900 placeholder-transparent leading-relaxed pt-1"
              aria-label="Ask Gutsy anything about your diet"
            />
            {!value && (
              <div className="absolute inset-0 pt-1 pointer-events-none text-[17px] leading-relaxed text-gray-500">
                <span>{placeholder}</span>
                <span className="inline-block w-[2px] h-[1.15em] bg-brand-600 align-middle ml-0.5 animate-[blink_1s_steps(2)_infinite]" />
              </div>
            )}
          </div>
          <button
            onClick={submit}
            aria-label="Go"
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-700 hover:bg-brand-800 text-white flex items-center justify-center transition-colors shadow-sm"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick-action chips */}
      <div className="flex flex-wrap gap-2 mt-4">
        {QUICK_ACTIONS.map(({ icon: Icon, label, href }) => (
          <button
            key={label}
            onClick={() => router.push(href)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
          >
            <Icon className="w-3.5 h-3.5 text-brand-300" /> {label}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
