import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Low-FODMAP recipe fixer — make any recipe IBS-safe',
  description:
    'Paste any recipe or give Gutsy a URL. Every high-FODMAP ingredient gets a practical low-FODMAP swap with a brief explanation. Free, no account needed.',
  alternates: { canonical: '/recipe' },
  openGraph: {
    title: 'Low-FODMAP recipe fixer',
    description: 'Turn any recipe into a low-FODMAP version in seconds.',
    url: '/recipe',
  },
};

export default function RecipeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
