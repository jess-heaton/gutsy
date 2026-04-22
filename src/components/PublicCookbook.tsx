'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Users } from 'lucide-react';

interface PublicRecipe {
  id: string;
  title: string;
  emoji: string | null;
  accent: string | null;
  tags: string[] | null;
  total_time: string | null;
  servings: string | null;
  image_url: string | null;
  display_name: string | null;
}

const ACCENTS: Record<string, { from: string; to: string }> = {
  amber:   { from: 'from-amber-200',   to: 'to-orange-300' },
  rose:    { from: 'from-rose-200',    to: 'to-pink-300' },
  emerald: { from: 'from-emerald-200', to: 'to-teal-300' },
  sky:     { from: 'from-sky-200',     to: 'to-indigo-300' },
  violet:  { from: 'from-violet-200',  to: 'to-fuchsia-300' },
  orange:  { from: 'from-orange-200',  to: 'to-red-300' },
  lime:    { from: 'from-lime-200',    to: 'to-green-300' },
  teal:    { from: 'from-teal-200',    to: 'to-cyan-300' },
};

function RecipeTile({ r }: { r: PublicRecipe }) {
  const [imgFailed, setImgFailed] = useState(false);
  const a = ACCENTS[r.accent ?? 'amber'] ?? ACCENTS.amber;
  const who = r.display_name
    ? r.display_name.includes('@') ? r.display_name.split('@')[0] : r.display_name
    : 'community';

  return (
    <Link
      href={`/recipe/${r.id}`}
      className="group block rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-brand-200 hover:shadow-lifted transition-all hover:-translate-y-0.5"
    >
      <div className="h-44 relative overflow-hidden">
        {r.image_url && !imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={r.image_url}
            alt={r.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${a.from} ${a.to}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
        <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-bold leading-snug drop-shadow">
          {r.title}
        </p>
      </div>
      <div className="px-3 py-2.5">
        <div className="flex items-center gap-2 text-2xs text-gray-400">
          {r.total_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{r.total_time}</span>}
          {r.servings && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{r.servings}</span>}
        </div>
        <p className="text-2xs text-gray-400 mt-1">by {who}</p>
      </div>
    </Link>
  );
}

export default function PublicCookbook() {
  const [recipes, setRecipes] = useState<PublicRecipe[]>([]);

  useEffect(() => {
    fetch('/api/public-recipes')
      .then(r => r.json())
      .then(d => setRecipes(d.recipes ?? []))
      .catch(() => {});
  }, []);

  if (recipes.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {recipes.map(r => <RecipeTile key={r.id} r={r} />)}
    </div>
  );
}
