import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our mission',
  description: 'Why we built Gutsy — and what living with IBS is actually like.',
};

export default function MissionPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-950 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">Our mission</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-6">
            We built Gutsy because<br />
            <span className="text-brand-400">we've been there.</span>
          </h1>
          <p className="text-brand-200 text-xl leading-relaxed">
            Living with IBS isn't just a health issue — it's a social one. It changes how you travel, how you eat with friends, how you feel walking into a restaurant without knowing what's safe.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 space-y-10 text-gray-700 text-lg leading-relaxed">
          <p>
            IBS affects around <strong className="text-gray-900">1 in 7 people</strong> — more than diabetes and asthma combined. Most of them have never heard of the low-FODMAP diet. And of those who have, most find it impossibly hard to apply in the real world.
          </p>
          <p>
            The Monash University FODMAP protocol works — 75% of people see meaningful improvement. But knowing that chickpeas are high in GOS doesn't help you when you're standing in a Wagamama trying to figure out if the ramen is safe, or when your friend has spent two hours cooking you a curry and you're not sure if the onion is in the sauce.
          </p>
          <p>
            The information exists. The tools don't. That's the gap Gutsy fills.
          </p>

          <div className="border-l-4 border-brand-500 pl-6 py-2">
            <p className="text-gray-900 font-medium italic text-xl">
              "We don't want to manage IBS quietly in the background. We want it to stop being a thing you manage at all."
            </p>
          </div>

          <p>
            Gutsy is designed around the moments that are hardest: the restaurant you want to go to, the recipe you want to eat, the appointment you need to prepare for, the friends who want to cook for you. We start there and work backwards.
          </p>

          <p>
            We're a small team who have been through the elimination phase, the reintroduction anxiety, the awkward meal out where you just ordered plain rice because nothing else felt safe. We're building the tools we wished we had.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">What we believe</h2>
          <div className="space-y-8">
            {[
              {
                title: 'Science first, noise second.',
                body: 'Everything in Gutsy is grounded in Monash University FODMAP research. We don't guess, and we don't sell the idea that everyone needs to avoid everything.',
              },
              {
                title: 'Practical beats perfect.',
                body: 'A FODMAP-safe recipe that actually tastes good and uses ingredients you can buy is worth more than a technically correct one you won't make. We optimise for what you'll actually do.',
              },
              {
                title: 'IBS shouldn't shrink your world.',
                body: 'The goal of the low-FODMAP diet is to do the elimination, find your triggers, and then eat as widely as possible within those limits. It's a route to more freedom, not less.',
              },
              {
                title: 'Free where it matters.',
                body: 'The menu scanner, recipe fixer, and food guide are completely free with no account required. We believe access to clear information about what you can eat should not be behind a paywall.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-500 mt-3 flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">{title}</p>
                  <p className="text-gray-600 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to eat freely?</h2>
          <p className="text-brand-300 mb-8">Start with the menu scanner — no account needed.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/menu" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Scan a restaurant <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/signup" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Create a free account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
