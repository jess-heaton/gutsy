import type { Metadata, Viewport } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: { default: 'Gutsy', template: '%s — Gutsy' },
  description: 'Track your IBS diet, symptoms and FODMAP intake. Based on Monash University research.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Gutsy' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0c2918',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="flex min-h-dvh">
          {/* Desktop sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0 lg:ml-[240px]">
            <main className="flex-1 pb-nav lg:pb-8">
              <div className="max-w-content mx-auto px-4 lg:px-8 py-6 lg:py-10">
                {children}
              </div>
            </main>
          </div>
        </div>

        {/* Mobile bottom nav */}
        <BottomNav />
      </body>
    </html>
  );
}
