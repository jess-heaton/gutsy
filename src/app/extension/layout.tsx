import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gutsy browser extension — quick-log from any tab',
  description:
    'A floating quick-log pill for Chrome. Log meals, bowel movements and symptoms for your low-FODMAP / IBS diary without switching tabs. Syncs to your Gutsy account.',
  alternates: { canonical: '/extension' },
  openGraph: {
    title: 'Gutsy browser extension',
    description: 'Log your IBS diary from any tab. Free Chrome extension.',
    url: '/extension',
  },
};

export default function ExtensionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
