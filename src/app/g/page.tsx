import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, XCircle, AlertCircle, ChefHat, Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cooking for someone with IBS? Here\'s what to know',
  description: 'A simple guide for friends and family cooking for someone on the low-FODMAP diet for IBS.',
};

const SAFE: { emoji: string; name: string; note: string }[] = [
  { emoji: '🐔', name: 'Chicken, fish, eggs, beef', note: 'All plain proteins are safe — just avoid marinades with garlic or onion' },
  { emoji: '🍚', name: 'Rice, quinoa, oats (plain)', note: 'All safe at any portion size' },
  { emoji: '🥕', name: 'Carrot, courgette, spinach, capsicum', note: 'Great vegetable choices — safe in generous amounts' },
  { emoji: '🥒', name: 'Cucumber, lettuce, tomato (limit to 3 cherry)', note: 'Fresh salad staples that work well' },
  { emoji: '🧀', name: 'Hard cheese (cheddar, parmesan)', note: 'Aged cheeses are very low in lactose — fine to use' },
  { emoji: '🫒', name: 'Olive oil, butter, most oils', note: 'All fats and oils are safe' },
  { emoji: '🍋', name: 'Lemon and lime juice', note: 'Great for flavour without any FODMAP issues' },
  { emoji: '🌿', name: 'Fresh herbs (basil, chives, coriander, parsley)', note: 'All fresh herbs are low FODMAP' },
  { emoji: '🍓', name: 'Strawberries, blueberries, grapes, oranges', note: 'Safe fruits in moderate amounts' },
  { emoji: '🧡', name: 'Tinned tomatoes (½ cup max)', note: 'Fine in small amounts for sauces' },
];

const AVOID: { emoji: string; name: string; note: string }[] = [
  { emoji: '🧄', name: 'Garlic', note: 'The #1 trigger — avoid in any form including powder. Use garlic-infused oil instead.' },
  { emoji: '🧅', name: 'Onion', note: 'All types including shallots and leeks (white part). Green tops of spring onion are fine.' },
  { emoji: '🫘', name: 'Beans, chickpeas, lentils (large portions)', note: 'OK in small amounts (¼ cup rinsed) — but not a big bowl' },
  { emoji: '🥛', name: 'Regular milk, cream, soft cheese, yogurt', note: 'Use lactose-free versions. Hard cheeses are fine.' },
  { emoji: '🍎', name: 'Apple, pear, mango, watermelon', note: 'High in fructose — swap for berries or oranges' },
  { emoji: '🌾', name: 'Wheat bread, regular pasta', note: 'Swap for GF pasta or sourdough spelt bread' },
  { emoji: '🍯', name: 'Honey, high-fructose corn syrup', note: 'Use maple syrup or regular sugar instead' },
  { emoji: '🥦', name: 'Broccoli, cauliflower, Brussels sprouts', note: 'Gassy vegetables — stick to smaller amounts or swap for courgette/carrot' },
];

const SWAPS: { from: string; to: string }[] = [
  { from: 'Garlic or garlic powder', to: 'Garlic-infused olive oil (fry in it, then remove garlic pieces)' },
  { from: 'Onion', to: 'Green tops of spring onion, chives, or asafoetida (tiny pinch)' },
  { from: 'Regular milk or cream', to: 'Lactose-free milk, oat milk (plain), or coconut cream' },
  { from: 'Wheat pasta or noodles', to: 'Gluten-free pasta or rice noodles' },
  { from: 'Regular bread', to: 'Sourdough spelt or gluten-free bread' },
  { from: 'Honey', to: 'Maple syrup or a little caster sugar' },
  { from: 'Stock cubes (most have onion/garlic)', to: 'Low-FODMAP stock or just salt, herbs + a splash of tamari' },
];

export default function GuestCardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-950 text-white px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-brand-400" />
            <span className="text-sm font-semibold text-brand-300 uppercase tracking-widest">Cooking guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
            Cooking for someone with IBS?
          </h1>
          <p className="text-brand-200 text-lg leading-relaxed">
            Your friend or family member follows the low-FODMAP diet to manage their IBS. This guide gives you everything you need to cook something they can enjoy safely — and feel great after.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* What is IBS */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-brand-600" />
            <h2 className="text-base font-bold text-gray-900">What is IBS?</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Irritable Bowel Syndrome affects 1 in 7 people. Certain carbohydrates called FODMAPs ferment in the gut and trigger cramping, bloating, and urgency. The low-FODMAP diet removes these triggers. It's not a preference or fussiness — symptoms can be severe and unpredictable, and certain foods are genuine triggers.
          </p>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            The good news: with a few simple swaps, almost any dish can be made completely safe. You don't need special ingredients — just avoid the key triggers below.
          </p>
        </div>

        {/* The golden rule */}
        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6">
          <p className="text-sm font-bold text-brand-900 mb-2">The single most important rule</p>
          <p className="text-brand-800 text-sm leading-relaxed">
            <strong>No garlic or onion in any form</strong> — including garlic powder, onion powder, garlic salt, or most pre-made stocks and sauces. These are the #1 trigger for almost everyone with IBS. Use garlic-infused olive oil instead (the flavour transfers; the FODMAPs don't).
          </p>
        </div>

        {/* Safe foods */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-gray-900">Safe to use freely</h2>
          </div>
          <div className="space-y-2">
            {SAFE.map(({ emoji, name, note }) => (
              <div key={name} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3">
                <span className="text-xl flex-shrink-0">{emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Foods to avoid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-red-500" />
            <h2 className="text-base font-bold text-gray-900">Foods to avoid</h2>
          </div>
          <div className="space-y-2">
            {AVOID.map(({ emoji, name, note }) => (
              <div key={name} className="flex items-start gap-3 bg-red-50 rounded-xl border border-red-100 px-4 py-3">
                <span className="text-xl flex-shrink-0">{emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{name}</p>
                  <p className="text-xs text-red-700 mt-0.5">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Easy swaps */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ChefHat className="w-5 h-5 text-brand-600" />
            <h2 className="text-base font-bold text-gray-900">Easy ingredient swaps</h2>
          </div>
          <div className="space-y-2">
            {SWAPS.map(({ from, to }) => (
              <div key={from} className="bg-white rounded-xl border border-gray-100 px-4 py-3">
                <div className="flex items-start gap-2 flex-wrap">
                  <span className="text-xs text-red-600 line-through flex-shrink-0 pt-px font-medium">{from}</span>
                  <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0 mt-1" />
                  <span className="text-xs text-emerald-700 font-semibold">{to}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-4">Practical tips</h2>
          <ul className="space-y-3">
            {[
              "Check sauce and stock labels — most contain garlic or onion powder. Make your own with garlic-infused oil, salt, and herbs.",
              "Lactose-free milk and cream work identically to regular in cooking. Hard cheeses (cheddar, parmesan) are fine.",
              "Fresh or dried herbs are always safe — basil, thyme, rosemary, oregano, coriander, chives.",
              "When in doubt, keep it simple: plain grilled meat or fish, rice or GF pasta, roasted vegetables (carrot, courgette, capsicum, spinach), and a drizzle of olive oil.",
              "If a packet sauce is involved, check the ingredients before using it.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-px">{i + 1}</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer CTA */}
        <div className="text-center pb-6">
          <p className="text-xs text-gray-400 mb-3">Want to find more FODMAP-safe recipes?</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Explore Gutsy <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-gray-400 mt-4">Built on Monash University FODMAP research · gutsy.mygutsy.co.uk</p>
        </div>
      </div>
    </div>
  );
}
