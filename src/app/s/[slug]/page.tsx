import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { CheckCircle, AlertTriangle, Ban, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import clsx from 'clsx';

interface MenuItem { name: string; status: 'safe' | 'modify' | 'avoid'; reason: string; modifications: string | null; }
interface Source { url: string; title?: string }
interface Analysis { summary: string; items: MenuItem[]; sources?: Source[] }

const STATUS = {
  safe:   { label: 'Safe',   Icon: CheckCircle,   bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
  modify: { label: 'Modify', Icon: AlertTriangle,  bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   badge: 'bg-amber-100 text-amber-700'   },
  avoid:  { label: 'Avoid',  Icon: Ban,            bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-700',     badge: 'bg-red-100 text-red-700'       },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase.from('menu_scans').select('restaurant').eq('slug', params.slug).single();
  const name = data?.restaurant ?? 'Menu scan';
  return { title: `${name} — Gutsy FODMAP menu scan` };
}

export default async function SharePage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data } = await supabase
    .from('menu_scans')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_public', true)
    .single();

  if (!data) notFound();

  const analysis = data.analysis as Analysis;
  const safe   = analysis.items.filter(i => i.status === 'safe');
  const modify = analysis.items.filter(i => i.status === 'modify');
  const avoid  = analysis.items.filter(i => i.status === 'avoid');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          {data.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image_url}
              alt=""
              className="w-14 h-14 rounded-xl object-contain bg-white border border-gray-100 p-1 shadow-sm"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          <div>
            <h1 className="text-xl font-bold text-gray-900">{data.restaurant ?? 'Menu scan'}</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Low-FODMAP analysis by{' '}
              <a href="https://gutsy.freedible.co.uk" className="text-brand-600 hover:underline">Gutsy</a>
            </p>
          </div>
        </div>

        {/* Summary banner */}
        <div className="bg-brand-900 rounded-xl p-5">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-1">Overall assessment</p>
          <p className="text-sm text-brand-100 leading-relaxed">{analysis.summary}</p>

          {analysis.sources && analysis.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-2xs font-semibold text-brand-400 uppercase tracking-widest mb-1.5">Sources</p>
              <ul className="space-y-1">
                {analysis.sources.slice(0, 4).map((s, i) => (
                  <li key={i}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand-200 hover:text-white hover:underline underline-offset-2 break-all">
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      {s.title ? `${s.title} — ` : ''}{safePathLabel(s.url)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-4 mt-4">
            {[
              { label: 'Safe',   count: safe.length,   color: 'text-emerald-400' },
              { label: 'Modify', count: modify.length, color: 'text-amber-400'   },
              { label: 'Avoid',  count: avoid.length,  color: 'text-red-400'     },
            ].map(({ label, count, color }) => (
              <div key={label}>
                <p className={clsx('text-xl font-bold tabular-nums', color)}>{count}</p>
                <p className="text-xs text-brand-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dishes */}
        {([
          { items: safe,   title: 'Safe to order'      },
          { items: modify, title: 'Order with changes' },
          { items: avoid,  title: 'Avoid'              },
        ] as const).map(({ items, title }) => items.length > 0 && (
          <div key={title}>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{title}</h2>
            <div className="space-y-2">
              {items.map((item, i) => {
                const cfg = STATUS[item.status];
                const Icon = cfg.Icon;
                return (
                  <div key={i} className={clsx('border rounded-xl p-4', cfg.bg, cfg.border)}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <Icon className={clsx('w-4 h-4 flex-shrink-0 mt-0.5', cfg.text)} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.reason}</p>
                          {item.modifications && (
                            <p className="text-xs font-medium mt-2 text-gray-700">
                              <span className="font-semibold">Ask for:</span> {item.modifications}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className={clsx('text-2xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0', cfg.badge)}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Footer CTA */}
        <div className="text-center pt-4 pb-8">
          <p className="text-sm text-gray-500 mb-3">Scan any menu for free with Gutsy</p>
          <a
            href="https://gutsy.freedible.co.uk/menu"
            className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Try the menu scanner
          </a>
        </div>
      </div>
    </div>
  );
}

function safePathLabel(url: string): string {
  try {
    const u = new URL(url);
    return `${u.host}${u.pathname}`;
  } catch {
    return url;
  }
}
