import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

function generateSlug(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function logoUrl(sourceUrl: string | null | undefined): string | null {
  if (!sourceUrl) return null;
  try {
    const host = new URL(sourceUrl).host;
    return `https://logo.clearbit.com/${host}`;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Not signed in' }, { status: 401 });

  const body = await req.json();
  const { restaurant, summary, items, sources, menu_source_url } = body;
  if (!items || !summary) return Response.json({ error: 'Invalid scan data' }, { status: 400 });

  const slug = generateSlug();
  const image_url = logoUrl(menu_source_url ?? sources?.[0]?.url);

  const { error } = await supabase.from('menu_scans').insert({
    user_id: user.id,
    slug,
    restaurant: restaurant ?? null,
    image_url,
    analysis: { summary, items, sources: sources ?? [] },
    is_public: true,
  });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ slug });
}
