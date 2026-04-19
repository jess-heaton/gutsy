import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const supa = createClient();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return Response.json({ error: 'Not signed in' }, { status: 401 });

  const { data, error } = await supa
    .from('recipes')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();
  if (error) return Response.json({ error: error.message }, { status: 404 });
  return Response.json({ recipe: data });
}
