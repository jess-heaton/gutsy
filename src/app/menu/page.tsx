'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link2, Upload, ClipboardList, X, AlertCircle, CheckCircle, AlertTriangle, Ban, ExternalLink } from 'lucide-react';
import clsx from 'clsx';

type InputMode = 'url' | 'pdf' | 'text';
type Status    = 'safe' | 'modify' | 'avoid';

interface MenuItem {
  name: string;
  status: Status;
  reason: string;
  modifications: string | null;
}

interface Source { url: string; title?: string }

interface ScanResult {
  restaurant: string | null;
  summary: string;
  items: MenuItem[];
  menu_source_url?: string | null;
  sources?: Source[];
}

const STATUS_CONFIG = {
  safe:   { label: 'Safe',     icon: CheckCircle,    bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
  modify: { label: 'Modify',   icon: AlertTriangle,  bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   badge: 'bg-amber-100 text-amber-700'   },
  avoid:  { label: 'Avoid',    icon: Ban,            bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-700',     badge: 'bg-red-100 text-red-700'       },
};

function Spinner() {
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700">Scanning menu…</p>
        <p className="text-xs text-gray-400 mt-1">Checking each dish against the FODMAP database</p>
      </div>
    </div>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const cfg = STATUS_CONFIG[item.status];
  const Icon = cfg.icon;
  return (
    <div className={clsx('border rounded-xl p-4', cfg.bg, cfg.border)}>
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
}

export default function MenuPage() {
  return <Suspense fallback={null}><MenuInner /></Suspense>;
}

function MenuInner() {
  const params = useSearchParams();
  const [mode, setMode]         = useState<InputMode>('url');
  const [url, setUrl]           = useState('');
  const [text, setText]         = useState('');

  // Prefill from ?q= (intent routing from the homepage hero).
  useEffect(() => {
    const q = params.get('q');
    if (!q) return;
    if (/^https?:\/\//i.test(q)) { setMode('url'); setUrl(q); }
    else { setMode('text'); setText(q); }
  }, [params]);
  const [pdfName, setPdfName]   = useState('');
  const [pdfB64, setPdfB64]     = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [result, setResult]     = useState<ScanResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('PDF must be under 5 MB'); return; }
    setPdfName(file.name);
    const reader = new FileReader();
    reader.onload = ev => {
      const b64 = (ev.target?.result as string).split(',')[1];
      setPdfB64(b64);
    };
    reader.readAsDataURL(file);
  };

  const scan = async () => {
    setError(''); setResult(null); setLoading(true);
    try {
      const body: Record<string, string> = {};
      if (mode === 'url')  body.url     = url;
      if (mode === 'text') body.text    = text;
      if (mode === 'pdf')  body.pdfBase64 = pdfB64;

      const res  = await fetch('/api/scan-menu', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? 'Scan failed');
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const canScan = (mode === 'url' && url.trim()) || (mode === 'text' && text.trim()) || (mode === 'pdf' && pdfB64);

  const safe   = result?.items.filter(i => i.status === 'safe')   ?? [];
  const modify = result?.items.filter(i => i.status === 'modify') ?? [];
  const avoid  = result?.items.filter(i => i.status === 'avoid')  ?? [];

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 lg:py-12 pb-20 lg:pb-12 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Menu scanner</h1>
        <p className="text-sm text-gray-500 mt-1">
          Paste a restaurant URL, upload a PDF menu, or paste the menu text — and get a dish-by-dish breakdown of what's safe.
        </p>
      </div>

      {/* Input mode tabs */}
      <div className="flex border-b border-gray-200">
        {([
          { id: 'url',  icon: Link2,         label: 'URL'       },
          { id: 'pdf',  icon: Upload,         label: 'PDF'       },
          { id: 'text', icon: ClipboardList,  label: 'Paste text' },
        ] as { id: InputMode; icon: React.ElementType; label: string }[]).map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => { setMode(id); setError(''); setResult(null); }}
            className={clsx(
              'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors',
              mode === id ? 'text-brand-700 border-brand-700' : 'text-gray-500 border-transparent hover:text-gray-700',
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="space-y-3">
        {mode === 'url' && (
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Restaurant or menu URL</label>
            <input
              type="url"
              placeholder="https://restaurantname.com/menu"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <p className="text-xs text-gray-400 mt-1.5">You can paste the homepage or a specific menu page — Gutsy will find the menu on the site, or search the web if needed. For PDF-only menus, download and upload under the PDF tab.</p>
          </div>
        )}

        {mode === 'pdf' && (
          <div>
            <input ref={fileRef} type="file" accept="application/pdf" onChange={handleFile} className="hidden" />
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-brand-400 hover:bg-brand-50 transition-colors"
            >
              <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              {pdfName ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-medium text-gray-700">{pdfName}</span>
                  <button onClick={e => { e.stopPropagation(); setPdfName(''); setPdfB64(''); }} className="text-gray-400 hover:text-red-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-600">Click to upload a PDF menu</p>
                  <p className="text-xs text-gray-400 mt-1">Up to 5 MB</p>
                </>
              )}
            </button>
          </div>
        )}

        {mode === 'text' && (
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Paste the menu</label>
            <textarea
              placeholder="Paste the menu text here — dish names and descriptions are enough…"
              value={text}
              onChange={e => setText(e.target.value)}
              rows={10}
              className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          onClick={scan}
          disabled={!canScan || loading}
          className={clsx(
            'w-full py-3 rounded-xl font-semibold text-sm transition-all',
            canScan && !loading
              ? 'bg-brand-700 text-white hover:bg-brand-800 active:scale-98'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed',
          )}
        >
          {loading ? 'Scanning…' : 'Scan menu'}
        </button>
      </div>

      {/* Results */}
      {loading && <Spinner />}

      {result && (
        <div className="space-y-6 animate-slide-up">
          {/* Summary */}
          <div className="bg-brand-900 rounded-xl p-5">
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-1">
              {result.restaurant ?? 'Menu'} — overall assessment
            </p>
            <p className="text-sm text-brand-100 leading-relaxed">{result.summary}</p>

            {result.sources && result.sources.length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-2xs font-semibold text-brand-400 uppercase tracking-widest mb-1.5">Sources</p>
                <ul className="space-y-1">
                  {result.sources.slice(0, 5).map((s, i) => (
                    <li key={i}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-brand-200 hover:text-white underline-offset-2 hover:underline break-all"
                      >
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        {s.title ? `${s.title} — ` : ''}{new URL(s.url).host}{new URL(s.url).pathname}
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

          {/* Items by group */}
          {[
            { items: safe,   title: 'Safe to order',        cfg: STATUS_CONFIG.safe   },
            { items: modify, title: 'Order with changes',   cfg: STATUS_CONFIG.modify },
            { items: avoid,  title: 'Avoid',                cfg: STATUS_CONFIG.avoid  },
          ].map(({ items, title, cfg }) => items.length > 0 && (
            <div key={title}>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{title}</h2>
              <div className="space-y-2">
                {items.map((item, i) => <MenuCard key={i} item={item} />)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
