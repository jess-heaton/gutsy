'use client';

import Link from 'next/link';
import { ScanLine, ChefHat, Activity, Search, Share2, QrCode } from 'lucide-react';

const TOOLS = [
  {
    icon: ScanLine,
    title: 'Scan a menu',
    desc: 'Paste any restaurant URL. Gutsy finds the real menu and rates every dish safe, modify, or avoid — with exact words to use when ordering.',
    badge: 'Free · no account',
    href: '/menu',
  },
  {
    icon: ChefHat,
    title: 'Fix a recipe',
    desc: 'Paste any recipe and get a fully rewritten FODMAP-safe version with practical swaps, not just a list of things to remove.',
    badge: 'Free · no account',
    href: '/recipe',
  },
  {
    icon: Activity,
    title: 'Track your gut',
    desc: 'Log meals, symptoms, and bowel movements. Charts show your FODMAP intake and symptom patterns so you find your real triggers.',
    badge: 'Free tracker',
    href: '/dashboard',
  },
  {
    icon: Search,
    title: 'Search foods',
    desc: 'Instant low / moderate / high FODMAP lookup for 200+ foods with serving sizes and category breakdowns — based on Monash research.',
    badge: 'Free · no account',
    href: '/foods',
  },
  {
    icon: Share2,
    title: 'Share with your dietitian',
    desc: 'Generate a clean summary of your logs, flares, and patterns to bring to your next gastro or dietitian appointment.',
    badge: 'Coming soon',
    href: '/share/dietitian',
  },
  {
    icon: QrCode,
    title: 'Share with friends',
    desc: "Going to a friend's for dinner? Share a QR code with your sensitivities, safe foods, and favourite recipes so they can cook for you with confidence.",
    badge: 'Coming soon',
    href: '/share/friends',
  },
];

// Duplicate for seamless infinite loop
const ITEMS = [...TOOLS, ...TOOLS];

export default function ToolsCarousel() {
  return (
    <div className="overflow-hidden">
      <div className="flex gap-4 animate-tools-scroll">
        {ITEMS.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <Link
              key={i}
              href={tool.href}
              className="group flex-shrink-0 w-64 bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/14 hover:border-white/20 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-600/30 border border-brand-500/30 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-brand-300" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{tool.title}</h3>
              <p className="text-xs text-brand-300 leading-relaxed mb-4">{tool.desc}</p>
              <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/60">{tool.badge}</span>
            </Link>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes tools-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-tools-scroll {
          animation: tools-scroll 32s linear infinite;
          width: max-content;
        }
        .animate-tools-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
