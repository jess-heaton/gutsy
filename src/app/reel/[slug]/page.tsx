import { notFound } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { ArrowLeft, Clock, Users, AlertTriangle, ArrowRight } from 'lucide-react';
import { reelRecipes, getReelRecipe } from '@/data/reel-recipes';

export function generateStaticParams() {
  return reelRecipes.map(r => ({ slug: r.slug }));
}

const ACCENTS: Record<string, { bg: string; border: string; chip: string }> = {
  amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   chip: 'bg-amber-100 text-amber-800' },
  rose:    { bg: 'bg-rose-50',    border: 'border-rose-200',    chip: 'bg-rose-100 text-rose-800' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', chip: 'bg-emerald-100 text-emerald-800' },
  sky:     { bg: 'bg-sky-50',     border: 'border-sky-200',     chip: 'bg-sky-100 text-sky-800' },
  violet:  { bg: 'bg-violet-50',  border: 'border-violet-200',  chip: 'bg-violet-100 text-violet-800' },
  orange:  { bg: 'bg-orange-50',  border: 'border-orange-200',  chip: 'bg-orange-100 text-orange-800' },
  lime:    { bg: 'bg-lime-50',    border: 'border-lime-200',    chip: 'bg-lime-100 text-lime-800' },
  teal:    { bg: 'bg-teal-50',    border: 'border-teal-200',    chip: 'bg-teal-100 text-teal-800' },
};

const GRADIENTS: Record<string, string> = {
  amber: 'from-amber-200 to-orange-300', rose: 'from-rose-200 to-pink-300',
  emerald: 'from-emerald-200 to-teal-300', sky: 'from-sky-200 to-indigo-300',
  violet: 'from-violet-200 to-fuchsia-300', orange: 'from-orange-200 to-red-300',
  lime: 'from-lime-200 to-green-300', teal: 'from-teal-200 to-cyan-300',
};

export default function ReelRecipePage({ params }: { params: { slug: string } }) {
  const recipe = getReelRecipe(params.slug);
  if (!recipe) notFound();

  const a = ACCENTS[recipe.accent] ?? ACCENTS.amber;
  const grad = GRADIENTS[recipe.accent] ?? GRADIENTS.amber;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={recipe.heroImage}
          alt={recipe.title}
          className="h-full w-full object-cover"
        />
        <div className={clsx('absolute inset-0 bg-gradient-to-br opacity-0', grad)} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <Link
          href="/"
          className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-700 shadow backdrop-blur-sm hover:bg-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-2xl font-bold text-white drop-shadow sm:text-3xl">{recipe.title}</h1>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-gray-400" />{recipe.totalTime}</span>
          <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-gray-400" />serves {recipe.servings}</span>
        </div>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map(tag => (
              <span key={tag} className={clsx('rounded-full px-3 py-0.5 text-xs font-medium', a.chip)}>{tag}</span>
            ))}
          </div>
        )}

        {/* Swaps */}
        {recipe.swaps.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">Low-FODMAP swaps</h2>
            <div className="space-y-2.5">
              {recipe.swaps.map((swap, i) => (
                <div key={i} className={clsx('rounded-xl border p-4', a.bg, a.border)}>
                  <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                    <span className="line-through text-red-600">{swap.original}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                    <span className="font-semibold text-emerald-700">{swap.swap}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">{swap.why}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recipe */}
        <section>
          <h2 className="mb-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">Recipe</h2>
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-800">{recipe.recipe}</pre>
          </div>
        </section>

        {/* Notes */}
        {recipe.notes.length > 0 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <p className="text-xs font-semibold text-amber-800 uppercase tracking-widest">FODMAP watch-outs</p>
            </div>
            <ul className="space-y-1.5">
              {recipe.notes.map((note, i) => (
                <li key={i} className="flex gap-2 text-sm text-amber-900 leading-relaxed">
                  <span className="mt-1 shrink-0 text-amber-500">•</span>{note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Fix your own */}
        <div className="rounded-2xl bg-brand-50 border border-brand-200 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-brand-900">Have a similar recipe?</p>
            <p className="text-xs text-brand-700 mt-0.5">Paste it and get your own FODMAP-safe version instantly.</p>
          </div>
          <Link href="/recipe" className="flex-shrink-0 inline-flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
            Fix a recipe <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
