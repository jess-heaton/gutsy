import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

function generateSlug(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function logoUrl(sourceUrl: string | null | undefined): string | null {
  if (!sourceUrl) return null;
  try {
    return `https://logo.clearbit.com/${new URL(sourceUrl).host}`;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return Response.json({ error: 'Please sign in to save menu scans.' }, { status: 401 });
    }

    const body = await req.json();
    const { restaurant, summary, items, sources, menu_source_url, hero_image_url } = body;
    if (!items || !summary) {
      return Response.json({ error: 'Invalid scan data.' }, { status: 400 });
    }

    const slug = generateSlug();
    // Prefer the restaurant's own og:image hero photo; fall back to Clearbit logo
    const image_url = hero_image_url ?? logoUrl(menu_source_url ?? sources?.[0]?.url ?? null);

    const { error: insertError } = await supabase.from('menu_scans').insert({
      user_id: user.id,
      slug,
      restaurant: restaurant ?? null,
      image_url,
      analysis: { summary, items, sources: sources ?? [] },
      is_public: true,
    });

    if (insertError) {
      console.error('menu_scans insert error:', insertError);
      return Response.json({ error: insertError.message }, { status: 500 });
    }

    return Response.json({ slug });
  } catch (err) {
    console.error('save-menu-scan unexpected error:', err);
    return Response.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
