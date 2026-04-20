import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supa = createClient();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return Response.json({ error: 'Not signed in' }, { status: 401 });

  const { recipeId, title, tags } = await req.json() as {
    recipeId: string;
    title: string;
    tags?: string[];
  };
  if (!recipeId || !title) return Response.json({ error: 'Missing params' }, { status: 400 });
  if (!process.env.OPENAI_API_KEY) return Response.json({ error: 'OPENAI_API_KEY not set' }, { status: 500 });

  try {
    const tagLine = tags?.length ? ` (${tags.join(', ')})` : '';
    const prompt =
      `Ultra-realistic professional food photography of "${title}"${tagLine}. ` +
      `Beautifully plated on a clean plate or bowl, natural soft window light from the side, ` +
      `appetizing presentation, shot from a 45-degree angle with shallow depth of field, ` +
      `clean minimal background. Photorealistic DSLR quality. No text, no watermarks, no people, no hands.`;

    const genRes = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: 'dall-e-3', prompt, n: 1, size: '1024x1024', quality: 'standard' }),
    });

    if (!genRes.ok) {
      const err = await genRes.json();
      throw new Error(err.error?.message ?? 'Image generation failed');
    }

    const genData = await genRes.json();
    const tempUrl: string | undefined = genData.data?.[0]?.url;
    if (!tempUrl) throw new Error('No image URL in response');

    // Download then upload to Supabase Storage for a permanent URL
    const imgRes = await fetch(tempUrl);
    const buffer = await imgRes.arrayBuffer();

    const path = `${user.id}/${recipeId}.png`;
    const { error: uploadErr } = await supa.storage
      .from('recipe-images')
      .upload(path, buffer, { contentType: 'image/png', upsert: true });
    if (uploadErr) throw new Error(`Storage: ${uploadErr.message}`);

    const { data: { publicUrl } } = supa.storage.from('recipe-images').getPublicUrl(path);

    await supa.from('recipes').update({ image_url: publicUrl }).eq('id', recipeId).eq('user_id', user.id);

    return Response.json({ imageUrl: publicUrl });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed';
    console.error('[recipe-image]', msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
