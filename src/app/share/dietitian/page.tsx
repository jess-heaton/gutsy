'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ClipboardList, Copy, Check, Printer, FileText } from 'lucide-react';

const DATE = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const SUMMARY_TEMPLATE = `LOW-FODMAP DIET SUMMARY — Patient using Gutsy IBS Tracker
Generated: ${DATE}

DIET PROTOCOL
This patient is following the Monash University three-phase low-FODMAP elimination diet for IBS management.

CURRENT PHASE (check with patient):
[ ] Phase 1 — Elimination (2–6 weeks, strict low-FODMAP)
[ ] Phase 2 — Reintroduction (testing one FODMAP group at a time)
[ ] Phase 3 — Personalisation (long-term restricted diet)

HIGH-FODMAP CATEGORIES AVOIDED (Phase 1)
- Fructans: wheat, rye, garlic, onion, leek
- GOS (Galacto-oligosaccharides): legumes, beans, lentils
- Lactose: regular milk, soft cheeses, cream, ice cream
- Fructose excess: apple, pear, mango, honey, HFCS
- Sorbitol: apple, pear, stone fruits (peach, nectarine, plum)
- Mannitol: mushrooms, cauliflower, sweet potato (>75g)

TOOLS USED
- Daily food, symptom & bowel movement logging (Gutsy tracker)
- Restaurant menu scanner (dish-by-dish FODMAP analysis)
- Recipe analyser (FODMAP-safe recipe generation)
- Food FODMAP lookup (based on Monash research)

NOTES FOR CLINICIAN
This patient is self-managing with digital tools between appointments. Gutsy uses Monash University FODMAP research as its evidence base. For definitive serving thresholds, the official Monash FODMAP app should be referenced. Gutsy does not replace clinical dietitian guidance, especially during Phase 2 reintroduction.

For questions about this tool: www.mygutsy.co.uk`;

export default function ShareDietitianPage() {
  const [copied, setCopied] = useState(false);
  const [notes, setNotes] = useState('');

  const fullSummary = notes.trim()
    ? `${SUMMARY_TEMPLATE}\n\nPATIENT NOTES\n${notes.trim()}`
    : SUMMARY_TEMPLATE;

  const copy = async () => {
    await navigator.clipboard.writeText(fullSummary).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const print = () => window.print();

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-12 pb-20 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 print:hidden">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      {/* Header */}
      <div className="print:hidden">
        <div className="w-12 h-12 bg-brand-700 rounded-2xl flex items-center justify-center mb-5">
          <ClipboardList className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Share with your dietitian</h1>
        <p className="text-gray-500 mt-2 max-w-lg text-sm leading-relaxed">
          Copy or print this summary to bring to your gastroenterology or dietitian appointment. It explains your diet protocol, the FODMAP categories you're avoiding, and how you're tracking.
        </p>
      </div>

      {/* Notes field */}
      <div className="max-w-2xl print:hidden">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
          Add your own notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="e.g. Main symptoms are bloating and cramping, usually 30–60 min after eating. Worst triggers so far: garlic, onion, apples. Currently in Phase 1 — started 3 weeks ago."
          rows={4}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 print:hidden">
        <button
          onClick={copy}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy summary'}
        </button>
        <button
          onClick={print}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>

      {/* Summary preview */}
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 mb-3 print:hidden">
          <FileText className="w-4 h-4 text-gray-400" />
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Summary preview</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <pre className="text-xs sm:text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">{fullSummary}</pre>
        </div>
      </div>

      {/* How to use */}
      <div className="max-w-2xl bg-brand-50 border border-brand-200 rounded-2xl p-5 print:hidden">
        <p className="text-sm font-semibold text-brand-900 mb-2">How to use this at your appointment</p>
        <ul className="space-y-1.5 text-sm text-brand-800">
          <li>1. Add any notes about your symptoms or triggers above</li>
          <li>2. Hit <strong>Copy summary</strong> and paste it into an email or message to your clinician before the appointment</li>
          <li>3. Or hit <strong>Print</strong> and bring a physical copy</li>
          <li>4. Tick which phase you're in on the printed sheet</li>
        </ul>
      </div>

      <style>{`
        @media print {
          body { background: white; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
