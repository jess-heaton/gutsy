import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FODMAP menu scanner — check any restaurant menu for IBS',
  description:
    'Paste a restaurant URL or upload the menu PDF. Gutsy rates each dish as safe, modify or avoid for the low-FODMAP diet, plus what to ask the waiter. Free, no account needed.',
  alternates: { canonical: '/menu' },
  openGraph: {
    title: 'FODMAP menu scanner — check any restaurant menu',
    description:
      'Scan any restaurant menu and find the low-FODMAP options in seconds. Free for IBS sufferers.',
    url: '/menu',
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
