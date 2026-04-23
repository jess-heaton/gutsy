'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, AlertTriangle, ArrowRight, Trash2, Link2, Clock, Users,
} from 'lucide-react';
import clsx from 'clsx';

interface Swap { original: string; swap: string; why: string; }
interface Recipe {
  id: string;
  title: string;
  emoji: string | null;
  accent: string | null;
  tags: string[] | null;
  total_time: string | null;
  servings: string | null;
  confidence: string | null;
  image_url: string | null;
  fixed_text: string;
  swaps: Swap[];
  notes: string[];
  source_url: string | null;
}

const ACCENTS: Record<string, { from: string; to: string; chip: string }> = {
  amber:   { from: 'from-amber-200',   to: 'to-orange-300',  chip: 'bg-amber-100 text-amber-800' },
  rose:    { from: 'from-rose-200',    to: 'to-pink-300',    chip: 'bg-rose-100 text-rose-800' },
  emerald: { from: 'from-emerald-200', to: 'to-teal-300',    chip: 'bg-emerald-100 text-emerald-800' },
  sky:     { from: 'from-sky-200',     to: 'to-indigo-300',  chip: 'bg-sky-100 text-sky-800' },
  violet:  { from: 'from-violet-200',  to: 'to-fuchsia-300', chip: 'bg-violet-100 text-violet-800' },
  orange:  { from: 'from-orange-200',  to: 'to-red-300',     chip: 'bg-orange-100 text-orange-800' },
  lime:    { from: 'from-lime-200',    to: 'to-green-300',   chip: 'bg-lime-100 text-lime-800' },
  teal:    { from: 'from-teal-200',    to: 'to-cyan-300',    chip: 'bg-teal-100 text-teal-800' },
};
const accent = (key?: string | null) => ACCENTS[key ?? 'amber'] ?? ACCENTS.amber;

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [r, setR] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/recipes/${params.id}`)
      .then(res => res.json())
      .then(d => { setR(d.recipe ?? null); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.id]);

  const del = async () => {
    if (!confirm('Delete this recipe?')) return;
    await fetch('/api/recipes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: params.id }),
    });
    router.push('/recipe');
  };

  const a = accent(r?.accent);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading recipe…</p>
        </div>
      </div>
    );
  }

  if (!r) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-center px-4">
        <div>
          <p className="text-gray-900 font-semibold mb-2">Recipe not found</p>
          <button onClick={() => router.push('/recipe')} className="text-sm text-brand-700 hover:text-brand-900 font-medium">
            Back to cookbook
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact gradient header */}
      <div className={clsx('h-40 relative flex items-center justify-center bg-gradient-to-br', a.from, a.to)}>
        <span className="text-7xl drop-shadow" aria-hidden>{r.emoji ?? '🍽️'}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-black/50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="absolute bottom-4 left-5 right-5">
          <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-sm">{r.title}</h1>
          <div className="flex items-center gap-3 mt-1 text-sm text-white/80">
            {r.total_time && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{r.total_time}</span>}
            {r.servings && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{r.servings}</span>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Tags */}
        {r.tags && r.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {r.tags.map((t, i) => (
              <span key={i} className={clsx('text-xs font-medium px-2.5 py-1 rounded-full', a.chip)}>{t}</span>
            ))}
          </div>
        )}

        {/* Swaps */}
        {r.swaps && r.swaps.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Swaps made</h2>
            <div className="space-y-2">
              {r.swaps.map((s, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 px-4 py-3 text-sm shadow-sm">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-red-600 line-through">{s.original}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="font-semibold text-emerald-700">{s.swap}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{s.why}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recipe */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Recipe</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{r.fixed_text}</pre>
          </div>
        </div>

        {/* Notes */}
        {r.notes && r.notes.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
            {r.notes.map((n, i) => (
              <div key={i} className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">{n}</p>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={del}
            className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-800 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete recipe
          </button>
          {r.source_url && (
            <a
              href={r.source_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Link2 className="w-4 h-4" /> Original source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
