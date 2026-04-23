import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/dashboard';

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Railway proxies internally via localhost — use forwarded host or env var
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (() => {
      const proto = req.headers.get('x-forwarded-proto') ?? 'https';
      const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? 'www.mygutsy.co.uk';
      return `${proto}://${host}`;
    })();

  return NextResponse.redirect(`${siteUrl}${next}`);
}
