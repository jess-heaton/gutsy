import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supa = createClient();
  const { data, error } = await supa
    .from('recipes')
    .select('id,title,emoji,accent,tags,total_time,servings,image_url,display_name,created_at')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(24);
  if (error) return Response.json({ recipes: [] });
  return Response.json({ recipes: data ?? [] });
}
