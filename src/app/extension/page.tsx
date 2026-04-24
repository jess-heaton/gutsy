import Link from 'next/link';
import { Chrome, Zap, Shield, Cloud } from 'lucide-react';

export const metadata = { title: 'Browser extension' };

// Replace this once the Web Store listing is approved.
const CHROME_STORE_URL: string | null = null;

export default function ExtensionPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-700 bg-brand-50 px-3 py-1 rounded-full mb-4">
          <Chrome className="w-3.5 h-3.5" /> Browser extension
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Log from any tab.
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          A tiny floating pill sits quietly in the corner of every page. Tap it to log a meal,
          bowel movement or symptom in seconds — no tab switching.
        </p>
      </div>

      {/* Install card */}
      <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-3xl p-8 mb-10 text-center">
        {CHROME_STORE_URL ? (
          <>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 bg-brand-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-800 transition-colors"
            >
              <Chrome className="w-5 h-5" /> Add to Chrome
            </a>
            <p className="text-sm text-gray-500 mt-3">Free — one-click install</p>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-semibold">
              <Chrome className="w-5 h-5" /> Coming soon to the Chrome Web Store
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Under review — check back in a few days, or{' '}
              <Link href="#manual" className="text-brand-700 font-medium">install manually</Link>.
            </p>
          </>
        )}
      </div>

      {/* Features */}
      <div className="grid sm:grid-cols-3 gap-6 mb-14">
        {[
          { Icon: Zap,    title: 'Instant',    body: 'Two clicks from any tab to a logged entry. No context switch.' },
          { Icon: Cloud,  title: 'Synced',     body: 'Writes straight to your Gutsy account. Visible across devices.' },
          { Icon: Shield, title: 'Private',    body: 'Your data stays in your Gutsy account. The pill only stores your session locally.' },
        ].map(({ Icon, title, body }) => (
          <div key={title} className="p-5 rounded-2xl border border-gray-100">
            <Icon className="w-5 h-5 text-brand-700 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* Manual install (fallback) */}
      <div id="manual" className="border border-gray-100 rounded-2xl p-6 bg-gray-50/50">
        <h2 className="font-semibold text-gray-900 mb-3">Manual install (while we wait for Web Store approval)</h2>
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1.5">
          <li>Download the extension ZIP from the Gutsy GitHub repo.</li>
          <li>Unzip it.</li>
          <li>Visit <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200">chrome://extensions</code></li>
          <li>Toggle on <b>Developer mode</b> (top-right).</li>
          <li>Click <b>Load unpacked</b> and pick the unzipped folder.</li>
          <li>Sign in once at <Link href="/login" className="text-brand-700 font-medium">www.mygutsy.co.uk</Link> — the pill now works everywhere.</li>
        </ol>
        <p className="text-xs text-gray-500 mt-4">
          This path requires Developer mode and is intended for early users. Normal install will be one click once approved.
        </p>
      </div>
    </div>
  );
}
