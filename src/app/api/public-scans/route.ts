import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('menu_scans')
      .select('slug, restaurant, image_url, analysis, created_at')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(24);

    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json(data ?? []);
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : 'Error' }, { status: 500 });
  }
}
