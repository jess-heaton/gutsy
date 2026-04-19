import { ExternalLink } from 'lucide-react';
import type { Reference } from '@/data/articles';

export default function References({ items }: { items: Reference[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section aria-labelledby="references-heading" className="mt-12 pt-8 border-t border-gray-100 font-sans">
      <h2 id="references-heading" className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
        References
      </h2>
      <ol className="space-y-3 list-none">
        {items.map((r, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed">
            <span className="text-gray-400 tabular-nums flex-shrink-0 font-semibold">{i + 1}.</span>
            <div className="flex-1 min-w-0">
              {r.authors && <span className="text-gray-700">{r.authors}. </span>}
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-brand-900 font-medium underline underline-offset-2 decoration-brand-200 hover:decoration-brand-700"
              >
                {r.label}
                <ExternalLink className="inline w-3 h-3 ml-0.5 -translate-y-0.5" />
              </a>
              {(r.journal || r.year) && (
                <span className="text-gray-500">
                  {' '}— {r.journal}{r.year ? `, ${r.year}` : ''}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
