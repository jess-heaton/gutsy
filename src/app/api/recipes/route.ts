import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supa = createClient();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return Response.json({ recipes: [] });

  const { data, error } = await supa
    .from('recipes')
    .select('id,title,emoji,accent,tags,total_time,servings,confidence,source_url,image_url,created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(60);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ recipes: data ?? [] });
}

export async function POST(req: NextRequest) {
  const supa = createClient();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return Response.json({ error: 'Not signed in' }, { status: 401 });

  const body = await req.json();
  const {
    title, emoji, accent, tags, totalTime, servings,
    recipe, swaps, notes, confidence, sourceUrl, originalText,
    isPublic, displayName,
  } = body;

  if (!title || !recipe) return Response.json({ error: 'Missing recipe' }, { status: 400 });

  const { data, error } = await supa.from('recipes').insert({
    user_id: user.id,
    title,
    emoji: emoji ?? null,
    accent: accent ?? 'amber',
    tags: tags ?? [],
    total_time: totalTime ?? null,
    servings: servings ?? null,
    fixed_text: recipe,
    original_text: originalText ?? null,
    swaps: swaps ?? [],
    notes: notes ?? [],
    confidence: confidence ?? null,
    source_url: sourceUrl ?? null,
    is_public: isPublic ?? false,
    display_name: isPublic ? (displayName ?? user.email ?? 'Anonymous') : null,
  }).select('id').single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ id: data.id });
}

export async function DELETE(req: NextRequest) {
  const supa = createClient();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return Response.json({ error: 'Not signed in' }, { status: 401 });

  const { id } = await req.json();
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 });

  const { error } = await supa.from('recipes').delete().eq('id', id).eq('user_id', user.id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
