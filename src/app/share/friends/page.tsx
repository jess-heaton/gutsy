'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, QrCode, Copy, Check, ExternalLink, Heart, ChefHat, Utensils } from 'lucide-react';

const GUEST_PATH = '/g';

export default function ShareFriendsPage() {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${GUEST_PATH}`
    : `https://www.mygutsy.co.uk${GUEST_PATH}`;

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(shareUrl)}&bgcolor=ffffff&color=113d24&qzone=2&format=png`;

  const copy = async () => {
    await navigator.clipboard.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-12 pb-20 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      {/* Header */}
      <div>
        <div className="w-12 h-12 bg-brand-700 rounded-2xl flex items-center justify-center mb-5">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Share with friends &amp; family</h1>
        <p className="text-gray-500 mt-2 max-w-lg text-sm leading-relaxed">
          Going to someone for dinner? Send them this link or show them the QR code — they'll get a clear, friendly guide on exactly what to cook for you, with safe foods, foods to avoid, and easy swaps.
        </p>
      </div>

      {/* QR + link card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-md shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">Your guest guide</p>

        {/* QR Code */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrSrc}
              alt="QR code for your IBS guest guide"
              width={220}
              height={220}
              className="rounded-lg"
            />
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mb-5">Scan to open on any phone — no app needed</p>

        {/* Link + copy */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-600 truncate font-mono text-xs">
            {shareUrl}
          </div>
          <button
            onClick={copy}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold transition-colors flex-shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <Link
          href={GUEST_PATH}
          target="_blank"
          className="mt-3 flex items-center justify-center gap-1.5 text-xs text-brand-700 hover:text-brand-900 font-medium"
        >
          Preview the guest guide <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* What they'll see */}
      <div className="max-w-md">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">What your friend will see</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Utensils, title: 'Safe foods list', desc: 'What to cook with freely — proteins, veg, grains, dairy alternatives.' },
            { icon: QrCode, title: 'Foods to avoid', desc: 'Clear list with explanations — no guesswork for your host.' },
            { icon: ChefHat, title: 'Easy swaps', desc: 'Garlic → infused oil, milk → lactose-free, and more.' },
            { icon: Heart, title: 'Practical tips', desc: '5 tips for cooking a great IBS-friendly meal without stress.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
              <Icon className="w-4 h-4 text-brand-600 mb-2" />
              <p className="text-sm font-semibold text-gray-900 mb-1">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="max-w-md bg-brand-50 border border-brand-200 rounded-2xl px-5 py-4">
        <p className="text-sm text-brand-800 leading-relaxed">
          <strong>Tip:</strong> Send the link in a message before the dinner — then your host can shop with it and you don't have to explain IBS from scratch every time.
        </p>
      </div>
    </div>
  );
}
