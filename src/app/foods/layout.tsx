import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Low-FODMAP food guide — what you can and cannot eat on IBS',
  description:
    'Searchable guide to low-FODMAP and high-FODMAP foods, with serving sizes and FODMAP category breakdowns. Built on Monash University FODMAP research.',
  alternates: { canonical: '/foods' },
  openGraph: {
    title: 'Low-FODMAP food guide',
    description: 'Searchable low-FODMAP food reference with per-serving thresholds.',
    url: '/foods',
  },
};

export default function FoodsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
