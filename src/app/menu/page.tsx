'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Upload, ClipboardList, X, AlertCircle, CheckCircle, AlertTriangle, Ban, ExternalLink, Share2, Copy, Check } from 'lucide-react';
import { trackEvent } from '@/lib/gtag';
import clsx from 'clsx';
import RestaurantLogo from '@/components/RestaurantLogo';
import AIDisclaimer from '@/components/AIDisclaimer';

type InputMode = 'search' | 'pdf' | 'text';
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
  hero_image_url?: string | null;
  sources?: Source[];
}

interface PublicScan {
  slug: string;
  restaurant: string | null;
  image_url: string | null;   // hero photo (og:image) or Clearbit logo
  analysis: { summary: string; items: MenuItem[] };
  created_at: string;
}

const STATUS_CONFIG = {
  safe:   { label: 'Safe',   icon: CheckCircle,   bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
  modify: { label: 'Modify', icon: AlertTriangle,  bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   badge: 'bg-amber-100 text-amber-700'   },
  avoid:  { label: 'Avoid',  icon: Ban,            bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-700',     badge: 'bg-red-100 text-red-700'       },
};

function safeHost(url: string): string {
  try { return new URL(url).host; } catch { return ''; }
}
function safePath(url: string): string {
  try { const u = new URL(url); return `${u.host}${u.pathname}`; } catch { return url; }
}

function Spinner() {
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700">Scanning menu…</p>
        <p className="text-xs text-gray-400 mt-1">This can take 20–40 s while Gutsy searches for the menu</p>
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

function ScanCard({ scan }: { scan: PublicScan }) {
  const safe   = scan.analysis.items.filter(i => i.status === 'safe').length;
  const modify = scan.analysis.items.filter(i => i.status === 'modify').length;
  const avoid  = scan.analysis.items.filter(i => i.status === 'avoid').length;
  const name   = scan.restaurant ?? 'Restaurant';
  return (
    <a
      href={`/s/${scan.slug}`}
      className="block rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-lg transition-all group"
    >
      {/* Hero photo */}
      <div className="relative h-36 bg-gray-100 overflow-hidden">
        {scan.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={scan.image_url}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = 'none';
              (el.parentElement as HTMLElement).style.background = '#f0fdf4';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-50 text-4xl">🍽️</div>
        )}
        {/* Status pill overlay */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          <span className="text-2xs font-bold px-1.5 py-0.5 rounded-full bg-emerald-500 text-white">{safe} safe</span>
          {modify > 0 && <span className="text-2xs font-bold px-1.5 py-0.5 rounded-full bg-amber-400 text-white">{modify} modify</span>}
          {avoid > 0  && <span className="text-2xs font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white">{avoid} avoid</span>}
        </div>
      </div>
      {/* Info */}
      <div className="px-3 py-2.5">
        <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-brand-700 transition-colors">{name}</p>
        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{scan.analysis.summary}</p>
      </div>
    </a>
  );
}

export default function MenuPage() {
  return <Suspense fallback={null}><MenuInner /></Suspense>;
}

function MenuInner() {
  const params = useSearchParams();
  const [mode, setMode]     = useState<InputMode>('search');
  const [searchQ, setSearchQ] = useState('');
  const [text, setText]     = useState('');
  const [pdfName, setPdfName] = useState('');
  const [pdfB64, setPdfB64]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [result, setResult]   = useState<ScanResult | null>(null);
  const [shareSlug, setShareSlug] = useState<string | null>(null);
  const [sharing, setSharing]     = useState(false);
  const [copied, setCopied]       = useState(false);
  const [publicScans, setPublicScans] = useState<PublicScan[]>([]);
  const [search, setSearch]           = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const autoScanRef = useRef(false);

  useEffect(() => {
    const q = params.get('q');
    const auto = params.get('auto') === '1';
    if (!q) return;
    if (/^https?:\/\//i.test(q)) { setMode('search'); setSearchQ(q); }
    else { setMode('search'); setSearchQ(q); }
    if (auto) autoScanRef.current = true;
  }, [params]);

  // Trigger auto-scan after state has settled from the param effect
  useEffect(() => {
    if (!autoScanRef.current) return;
    const t = setTimeout(() => {
      autoScanRef.current = false;
      scan();
    }, 80);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, searchQ, text]);

  useEffect(() => {
    fetch('/api/public-scans')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setPublicScans(d); })
      .catch(() => {});
  }, [shareSlug]); // refetch when user saves a new scan

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('PDF must be under 5 MB'); return; }
    setPdfName(file.name);
    const reader = new FileReader();
    reader.onload = ev => setPdfB64((ev.target?.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  };

  async function share() {
    if (!result || sharing) return;
    setSharing(true);
    try {
      const res = await fetch('/api/save-menu-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to save');
      setShareSlug(data.slug);
      trackEvent('menu_scan_shared', { restaurant: result.restaurant ?? 'unknown' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save scan');
    } finally {
      setSharing(false);
    }
  }

  async function copyLink(slug: string) {
    await navigator.clipboard.writeText(`${window.location.origin}/s/${slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function scan() {
    setError(''); setResult(null); setLoading(true); setShareSlug(null);
    trackEvent('menu_scan_start', { mode });
    try {
      const body: Record<string, string> = {};
      if (mode === 'search') body.text    = searchQ;
      if (mode === 'text')   body.text    = text;
      if (mode === 'pdf')    body.pdfBase64 = pdfB64;
      const res  = await fetch('/api/scan-menu', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? 'Scan failed');
      setResult(data);
      trackEvent('menu_scan_complete', {
        restaurant: data.restaurant ?? 'unknown',
        item_count: data.items?.length ?? 0,
        safe_count: data.items?.filter((i: { status: string }) => i.status === 'safe').length ?? 0,
        mode,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg);
      trackEvent('menu_scan_error', { mode, error: msg.slice(0, 100) });
    } finally {
      setLoading(false);
    }
  }

  const canScan = (mode === 'search' && searchQ.trim()) || (mode === 'text' && text.trim()) || (mode === 'pdf' && pdfB64);
  const safe   = result?.items.filter(i => i.status === 'safe')   ?? [];
  const modify = result?.items.filter(i => i.status === 'modify') ?? [];
  const avoid  = result?.items.filter(i => i.status === 'avoid')  ?? [];

  const filteredScans = publicScans.filter(s =>
    !search.trim() || (s.restaurant ?? '').toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 lg:py-12 pb-20 lg:pb-12 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Menu scanner</h1>
        <p className="text-sm text-gray-500 mt-1">
          Type a restaurant name, paste a URL, upload a PDF, or paste the menu — get a dish-by-dish FODMAP breakdown in seconds.
        </p>
      </div>

      <AIDisclaimer tool="Menu scanner" />

      {/* Input mode tabs */}
      <div className="flex border-b border-gray-200">
        {([
          { id: 'search', icon: Search,       label: 'Search'     },
          { id: 'pdf',    icon: Upload,        label: 'PDF'        },
          { id: 'text',   icon: ClipboardList, label: 'Paste text' },
        ] as { id: InputMode; icon: React.ElementType; label: string }[]).map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => { setMode(id); setError(''); setResult(null); }}
            className={clsx(
              'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors',
              mode === id ? 'text-brand-700 border-brand-700' : 'text-gray-500 border-transparent hover:text-gray-700',
            )}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="space-y-3">
        {mode === 'search' && (
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Restaurant name or URL</label>
            <input
              type="text"
              placeholder="e.g. Nando's, or The Boathouse Instow, or https://restaurantname.com"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') scan(); }}
              className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <p className="text-xs text-gray-400 mt-1.5">Type any restaurant name — Gutsy searches for the real menu itself. For chains just use the name; for local restaurants add the town.</p>
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
                  <button onClick={e => { e.stopPropagation(); setPdfName(''); setPdfB64(''); }} className="text-gray-400 hover:text-red-400"><X className="w-4 h-4" /></button>
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
            canScan && !loading ? 'bg-brand-700 text-white hover:bg-brand-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed',
          )}
        >
          {loading ? 'Scanning…' : 'Scan menu'}
        </button>
      </div>

      {loading && <Spinner />}

      {/* ── Scan result ── */}
      {result && (
        <div className="space-y-6 animate-slide-up">
          <div className="bg-brand-900 rounded-xl p-5">
            {result.hero_image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.hero_image_url}
                alt=""
                className="w-full h-32 object-cover rounded-lg mb-3 opacity-80"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
            <div className="flex items-center gap-3 mb-3">
              <RestaurantLogo
                domain={safeHost(result.menu_source_url ?? '')}
                name={result.restaurant}
                className="w-9 h-9 flex-shrink-0"
              />
              <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest">
                {result.restaurant ?? 'Menu'} — overall assessment
              </p>
            </div>

            <p className="text-sm text-brand-100 leading-relaxed">{result.summary}</p>

            {result.sources && result.sources.length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-2xs font-semibold text-brand-400 uppercase tracking-widest mb-1.5">Sources</p>
                <ul className="space-y-1">
                  {result.sources.slice(0, 5).map((s, i) => (
                    <li key={i}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-brand-200 hover:text-white underline-offset-2 hover:underline break-all">
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        {s.title ? `${s.title} — ` : ''}{safePath(s.url)}
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

            <div className="mt-4 pt-3 border-t border-white/10">
              {shareSlug ? (
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={`${typeof window !== 'undefined' ? window.location.origin : ''}/s/${shareSlug}`}
                    className="flex-1 text-xs bg-white/10 text-brand-100 rounded-lg px-3 py-1.5 outline-none truncate"
                  />
                  <button
                    onClick={() => copyLink(shareSlug)}
                    className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-white bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied!' : 'Copy link'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={share}
                  disabled={sharing}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-200 hover:text-white transition-colors disabled:opacity-50"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {sharing ? 'Saving…' : 'Save & share this scan'}
                </button>
              )}
            </div>
          </div>

          {[
            { items: safe,   title: 'Safe to order'      },
            { items: modify, title: 'Order with changes' },
            { items: avoid,  title: 'Avoid'              },
          ].map(({ items, title }) => items.length > 0 && (
            <div key={title}>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{title}</h2>
              <div className="space-y-2">
                {items.map((item, i) => <MenuCard key={i} item={item} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Public scan portfolio ── */}
      {!loading && !result && publicScans.length > 0 && (
        <div className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Previously scanned restaurants</h2>
            {publicScans.length > 6 && (
              <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500 w-36"
              />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredScans.map(scan => <ScanCard key={scan.slug} scan={scan} />)}
          </div>
          {filteredScans.length === 0 && search && (
            <p className="text-sm text-gray-400 text-center py-6">No results for "{search}"</p>
          )}
        </div>
      )}
    </div>
  );
}
