import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, QrCode, Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Share with friends',
  description: 'Share your food sensitivities and favourite recipes with friends who are cooking for you.',
};

export default function ShareFriendsPage() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-12 pb-20 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div>
        <div className="w-12 h-12 bg-brand-700 rounded-2xl flex items-center justify-center mb-5">
          <QrCode className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Share with friends</h1>
        <p className="text-gray-500 mt-2 max-w-lg">
          Going to a friend's for dinner, or staying with family? Share a simple page with everything they need to cook safely for you — your sensitivities, safe foods, favourite recipes, and any questions to ask.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
        {[
          { emoji: '🥗', title: 'Your safe foods list', desc: 'A clear list of what you can eat, what to avoid, and what\'s OK in small amounts.' },
          { emoji: '📖', title: 'Your favourite recipes', desc: 'Share the FODMAP-safe recipes from your cookbook so your host can cook something you love.' },
          { emoji: '💬', title: 'A note from you', desc: 'A warm, personal message explaining your situation so your friend feels empowered, not overwhelmed.' },
          { emoji: '🛒', title: 'A shopping list', desc: 'Auto-generated ingredients list for one of your saved recipes — ready to forward.' },
        ].map(({ emoji, title, desc }) => (
          <div key={title} className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
            <span className="text-2xl mb-3 block">{emoji}</span>
            <p className="text-sm font-semibold text-gray-900 mb-1">{title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 max-w-lg">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-brand-600" />
          <p className="text-sm font-semibold text-brand-800">Coming soon</p>
        </div>
        <p className="text-sm text-brand-700 leading-relaxed">
          We're building a one-tap shareable page you can send as a link or QR code — so anyone cooking for you has everything they need, without you having to explain IBS from scratch every time.
        </p>
        <p className="text-sm text-brand-600 mt-3">Save some recipes to your cookbook in the meantime.</p>
        <Link href="/recipe" className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-700 hover:text-brand-900">
          Fix a recipe <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
