'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import {
  ArrowRight, ScanLine, ChefHat, Refrigerator, PlayCircle, Pen, Sparkles, Loader2,
} from 'lucide-react';
import { trackEvent } from '@/lib/gtag';

const EXAMPLES = [
  "I'm starting the elimination diet",
  'Scan the Nando\'s menu for me',
  'Make carbonara low-FODMAP',
  'I have chicken, rice and spinach in my fridge',
  'Can I have hummus with Fodzyme?',
  'Is sourdough OK for IBS?',
  'What can I eat at Wagamama?',
  'Swap high-FODMAP ingredients in banana bread',
];

const QUICK_ACTIONS = [
  { icon: PlayCircle,   label: 'Start tracking', href: '/signup' },
  { icon: ScanLine,     label: 'Scan a menu',    href: '/menu' },
  { icon: ChefHat,      label: 'Fix a recipe',   href: '/recipe' },
  { icon: Refrigerator, label: 'Fridge → recipe', href: '/recipe?mode=fridge' },
];

// Common restaurant/chain keywords — triggers menu scanner even without the word "restaurant"
const RESTAURANT_CHAINS = [
  'nando', 'wagamama', 'pizza express', 'pizza hut', 'domino', 'subway', 'mcdonald', "mcdonald's",
  'burger king', 'kfc', 'pret', 'itsu', 'wasabi', 'leon', 'honest burger', 'five guys', 'shake shack',
  'chipotle', 'côte', 'cote brasserie', 'zizzi', 'bella italia', 'prezzo', 'ask italian', 'giraffe',
  'harvester', 'toby carvery', 'beefeater', 'wetherspoon', 'spoons', 'caffe nero', 'starbucks',
  'costa', 'greggs', 'tortilla', 'byron', 'patty & bun', 'bill\'s', 'bills', 'the ivy', 'carluccio',
  'franco manca', 'youngs', 'mitchells', 'brewdog', 'wahaca', 'rosa\'s thai', 'thai', 'sushi',
];

type Intent = { route: string; label: string; cta: string; icon: React.ElementType; };

function matchIntent(text: string): Intent {
  const t = text.trim();
  const q = encodeURIComponent(t);
  const l = t.toLowerCase();
  const has = (...words: string[]) => words.some(w => l.includes(w));

  // URL → always menu scanner, auto-scan
  if (/^https?:\/\//i.test(t))
    return { route: `/menu?q=${q}&auto=1`, label: 'Menu scanner', cta: 'View full scan', icon: ScanLine };

  // Named restaurant chain → menu scanner, auto-scan
  if (RESTAURANT_CHAINS.some(c => l.includes(c)))
    return { route: `/menu?q=${q}&auto=1`, label: 'Menu scanner', cta: 'Scan the menu', icon: ScanLine };

  // Explicit restaurant/eating-out context → menu scanner, auto-scan
  if (has('restaurant', 'cafe', 'café', 'takeaway', 'takeout', 'eating out', 'eat out', 'menu', 'dine'))
    return { route: `/menu?q=${q}&auto=1`, label: 'Menu scanner', cta: 'Scan the menu', icon: ScanLine };

  // Fridge / pantry → recipe fridge mode
  if (has('fridge', 'freezer', 'pantry', 'leftover', 'in my kitchen', 'what can i cook', 'what can i make', 'what should i make'))
    return { route: `/recipe?mode=fridge&q=${q}`, label: 'Fridge → recipe', cta: 'Build the recipe', icon: Refrigerator };

  // Have X, got X (ingredient lists) → fridge mode
  if (/i('ve)? (have|got) .{3,}/.test(l) && !has('ibs', 'symptom', 'pain', 'bloat'))
    return { route: `/recipe?mode=fridge&q=${q}`, label: 'Fridge → recipe', cta: 'Build the recipe', icon: Refrigerator };

  // Recipe fixing
  if (has('recipe', 'bake', 'cook', 'make this', 'fix this', 'swap', 'substitute', 'carbonara', 'bread', 'pasta', 'curry', 'low-fodmap version', 'fodmap safe version', 'fodmap-safe'))
    return { route: `/recipe?q=${q}`, label: 'Recipe fixer', cta: 'Fix the recipe', icon: ChefHat };

  // Logging
  if (has('log', 'ate ', 'just ate', 'just had', 'track this', 'track my', 'add to my log', 'diary'))
    return { route: `/dashboard?quicklog=${q}`, label: 'Log', cta: 'Open the tracker', icon: Pen };

  // Onboarding / starting out
  if (has('elimination', 'reintroduction', 'just got diagnosed', 'diagnosed', 'starting the diet', 'new to fodmap', 'where do i start', 'just started', 'beginning'))
    return { route: `/signup?intent=${q}`, label: 'Get started', cta: 'Create your account', icon: PlayCircle };

  // Default: food/FODMAP question, meds question, anything else → food guide
  return { route: `/foods?q=${q}`, label: 'Food guide', cta: 'Open the food guide', icon: Sparkles };
}

export default function HeroPrompt() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [focused, setFocused] = useState(false);

  const [intent, setIntent] = useState<Intent | null>(null);
  const [answer, setAnswer] = useState('');
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const idxRef = useRef(0);
  const charRef = useRef(0);
  const dirRef = useRef<'type' | 'pause' | 'delete'>('type');
  const inputRef = useRef<HTMLInputElement>(null);

  const showFake = !value && !focused && !intent;

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
        dirRef.current = 'delete'; delay = 30;
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

  async function submit() {
    if (streaming) return;
    const text = value.trim() || EXAMPLES[idxRef.current];
    const matched = matchIntent(text);
    setIntent(matched);
    setAnswer('');
    setStreaming(true);
    trackEvent('hero_submit', { intent: matched.label, query_length: text.length });

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch('/api/hero-respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) throw new Error('bad response');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value: chunk, done } = await reader.read();
        if (done) break;
        setAnswer(prev => prev + decoder.decode(chunk, { stream: true }));
      }
    } catch {
      // Silent fallback — the CTA still works.
    } finally {
      setStreaming(false);
    }
  }

  function goToIntent() {
    abortRef.current?.abort();
    if (intent) {
      trackEvent('hero_cta_click', { intent: intent.label });
      router.push(intent.route);
    }
  }

  function reset() {
    abortRef.current?.abort();
    setIntent(null);
    setAnswer('');
    setValue('');
    setStreaming(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  /* ── Answer panel (after submit) ── */
  if (intent) {
    const Icon = intent.icon;
    return (
      <div className="w-full max-w-xl">
        <div className="rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 border border-white/40 overflow-hidden">
          <div className="px-5 pt-4 pb-3 border-b border-gray-100 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
              <Icon className="w-3.5 h-3.5 text-brand-700" />
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{intent.label}</span>
            <button
              onClick={reset}
              className="ml-auto text-xs text-gray-400 hover:text-gray-700 font-medium"
            >
              New question
            </button>
          </div>
          <div className="px-5 py-4 min-h-[80px] text-[15px] leading-relaxed text-gray-800 text-left">
            {answer || (
              <span className="inline-flex items-center gap-2 text-gray-500">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Thinking…
              </span>
            )}
            {streaming && answer && (
              <span className="inline-block w-[2px] h-[1em] bg-brand-600 align-middle ml-0.5 animate-blink" />
            )}
          </div>
          <div className="px-5 pb-4 pt-1 flex justify-end">
            <button
              onClick={goToIntent}
              className="inline-flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              {intent.cta} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <style jsx global>{`
          @keyframes gutsy-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
          .animate-blink { animation: gutsy-blink 0.9s steps(2, end) infinite; }
        `}</style>
      </div>
    );
  }

  /* ── Prompt input (idle) ── */
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
