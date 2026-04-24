import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import TopNav from '@/components/TopNav';
import BottomNav from '@/components/BottomNav';
import QuickLogWidget from '@/components/QuickLogWidget';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mygutsy.co.uk'),
  title: {
    default: 'Gutsy — IBS diary and low-FODMAP tracker',
    template: '%s — Gutsy',
  },
  description:
    'Free IBS tracker built around the Monash low-FODMAP diet. Log meals and symptoms, scan restaurant menus, and fix any recipe to make it low-FODMAP.',
  keywords: [
    'IBS tracker', 'low FODMAP app', 'low FODMAP diet', 'FODMAP tracker',
    'IBS diary', 'Monash FODMAP', 'IBS food diary', 'FODMAP menu scanner',
    'low FODMAP recipes', 'FODMAP elimination diet',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Gutsy',
    title: 'Gutsy — IBS diary and low-FODMAP tracker',
    description:
      'Free IBS tracker built around the Monash low-FODMAP diet. Log meals and symptoms, scan restaurant menus, and fix any recipe.',
    url: '/',
    locale: 'en_GB',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Gutsy — IBS diary' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gutsy — IBS diary and low-FODMAP tracker',
    description:
      'Free IBS tracker built around the Monash low-FODMAP diet. Menu scanner, recipe fixer, and daily diary.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Gutsy' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="gutsy-sync-target" content="gutfeeling_entries" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white antialiased">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
            `}</Script>
          </>
        )}
        <TopNav />
        <main>{children}</main>
        <BottomNav />
        <QuickLogWidget />
      </body>
    </html>
  );
}
