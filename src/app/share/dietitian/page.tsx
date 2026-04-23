import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ClipboardList, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Share with your dietitian',
  description: 'Generate a summary of your gut diary to share with your gastroenterologist or dietitian.',
};

export default function ShareDietitianPage() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-12 pb-20 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div>
        <div className="w-12 h-12 bg-brand-700 rounded-2xl flex items-center justify-center mb-5">
          <ClipboardList className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Share with your dietitian</h1>
        <p className="text-gray-500 mt-2 max-w-lg">
          Generate a clean, readable summary of your food diary, symptom patterns, and FODMAP intake to bring to your next gastroenterology or dietitian appointment.
        </p>
      </div>

      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 max-w-lg">
        <p className="text-sm font-semibold text-brand-800 mb-1">Coming soon</p>
        <p className="text-sm text-brand-700 leading-relaxed">
          We're building a one-tap export that generates a printable PDF and shareable link with your symptom timeline, FODMAP trigger patterns, and diary entries — formatted for a clinical appointment.
        </p>
        <p className="text-sm text-brand-600 mt-3">In the meantime, start your food diary to build up your data.</p>
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-700 hover:text-brand-900">
          Open the tracker <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
