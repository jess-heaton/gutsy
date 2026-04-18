'use client';

import { useState } from 'react';
import { ChefHat, AlertCircle, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

interface Swap {
  original: string;
  swap: string;
  why: string;
}

interface RecipeResult {
  title: string;
  swaps: Swap[];
  recipe: string;
  notes: string[];
  lowFodmapConfidence: 'high' | 'medium' | 'low';
}

const CONFIDENCE_CONFIG = {
  high:   { label: 'High confidence', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  medium: { label: 'Medium confidence', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  low:    { label: 'Low confidence — verify with Monash app', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
};

function Spinner() {
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700">Analysing recipe…</p>
        <p className="text-xs text-gray-400 mt-1">Finding swaps and rewriting for FODMAP safety</p>
      </div>
    </div>
  );
}

export default function RecipePage() {
  const [recipe, setRecipe]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [result, setResult]   = useState<RecipeResult | null>(null);

  const analyse = async () => {
    setError(''); setResult(null); setLoading(true);
    try {
      const res  = await fetch('/api/recipe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ recipe }) });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? 'Analysis failed');
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const cfg = result ? CONFIDENCE_CONFIG[result.lowFodmapConfidence] ?? CONFIDENCE_CONFIG.medium : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recipe analyser</h1>
        <p className="text-sm text-gray-500 mt-1">
          Paste any recipe and get a FODMAP-safe rewrite — every high-FODMAP ingredient swapped out, full method included.
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Paste your recipe</label>
        <textarea
          placeholder={"Ingredients:\n1 cup chickpeas\n2 cloves garlic\n1 onion\n...\n\nMethod:\n1. ..."}
          value={recipe}
          onChange={e => setRecipe(e.target.value)}
          rows={12}
          className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
        />

        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          onClick={analyse}
          disabled={!recipe.trim() || loading}
          className={clsx(
            'w-full py-3 rounded-xl font-semibold text-sm transition-all',
            recipe.trim() && !loading
              ? 'bg-brand-700 text-white hover:bg-brand-800 active:scale-98'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed',
          )}
        >
          {loading ? 'Analysing…' : 'Make it FODMAP-safe'}
        </button>
      </div>

      {loading && <Spinner />}

      {result && (
        <div className="space-y-6 animate-slide-up">
          {/* Title + confidence */}
          <div className="bg-brand-900 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <ChefHat className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-1">FODMAP-safe version</p>
                <p className="text-base font-bold text-white">{result.title}</p>
              </div>
            </div>
            {cfg && (
              <div className={clsx('mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border', cfg.bg, cfg.color, cfg.border)}>
                {result.lowFodmapConfidence === 'high' ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                {cfg.label}
              </div>
            )}
          </div>

          {/* Swaps table */}
          {result.swaps.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Ingredient swaps</h2>
              <div className="space-y-2">
                {result.swaps.map((swap, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-red-600 line-through">{swap.original}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="text-sm font-semibold text-emerald-700">{swap.swap}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{swap.why}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rewritten recipe */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Rewritten recipe</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{result.recipe}</pre>
            </div>
          </div>

          {/* Notes */}
          {result.notes.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Serving notes</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-1.5">
                {result.notes.map((note, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
