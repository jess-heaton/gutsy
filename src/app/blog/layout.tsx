import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Gutsy blog — IBS, FODMAPs, enzymes and the research',
  description:
    'Plain-English articles on the low-FODMAP diet, digestive enzymes like FODzyme and Milkaid, and the research behind IBS treatment.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'The Gutsy blog',
    description: 'IBS, FODMAPs and the research — written plainly.',
    url: '/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
