import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supa = createClient();
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return Response.json({ error: 'Not signed in' }, { status: 401 });

  const { slug, restaurant } = await req.json() as { slug: string; restaurant?: string };
  if (!slug) return Response.json({ error: 'Missing slug' }, { status: 400 });
  if (!process.env.OPENAI_API_KEY) return Response.json({ error: 'OPENAI_API_KEY not set' }, { status: 500 });

  try {
    const name = restaurant ?? 'a restaurant';
    const prompt =
      `A warm, inviting restaurant card image for "${name}". ` +
      `Photorealistic overhead shot of a beautifully set table with a signature dish from this type of cuisine, ` +
      `soft candlelight ambiance, linen napkins, elegant crockery. ` +
      `Shallow depth of field, editorial food photography style. ` +
      `No text, no logos, no watermarks, no people.`;

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

    const imgRes = await fetch(tempUrl);
    const buffer = await imgRes.arrayBuffer();

    const path = `scans/${slug}.png`;
    const { error: uploadErr } = await supa.storage
      .from('recipe-images')
      .upload(path, buffer, { contentType: 'image/png', upsert: true });
    if (uploadErr) throw new Error(`Storage: ${uploadErr.message}`);

    const { data: { publicUrl } } = supa.storage.from('recipe-images').getPublicUrl(path);

    await supa.from('menu_scans').update({ image_url: publicUrl }).eq('slug', slug).eq('user_id', user.id);

    return Response.json({ imageUrl: publicUrl });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed';
    console.error('[scan-image]', msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
