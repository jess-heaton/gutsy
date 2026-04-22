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
    const tagLine = tags?.length ? `, a ${tags.join(' and ')} dish` : '';
    const prompt =
      `A real, photographic image of "${title}"${tagLine} for a professional recipe book. ` +
      `This must look exactly like a real photograph taken by a food photographer — not AI-generated, not illustrated. ` +
      `The dish is freshly cooked and beautifully plated on a ceramic plate or bowl on a clean surface. ` +
      `Overhead or 45-degree angle. Soft natural window light. Every ingredient is visible and recognisable. ` +
      `Garnished with fresh herbs or a light drizzle of olive oil. Shallow depth of field, bokeh background. ` +
      `Shot on a full-frame DSLR. The food fills most of the frame. ` +
      `Absolutely no text, no watermarks, no people, no hands, no borders, no illustrations.`;

    const genRes = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt,
        n: 1,
        size: '1024x1024',
        quality: 'high',
      }),
    });

    if (!genRes.ok) {
      const err = await genRes.json();
      throw new Error(err.error?.message ?? 'Image generation failed');
    }

    const genData = await genRes.json();

    // gpt-image-1 returns base64 by default
    const b64: string | undefined = genData.data?.[0]?.b64_json;
    const tempUrl: string | undefined = genData.data?.[0]?.url;

    let buffer: ArrayBuffer;
    if (b64) {
      const bin = Buffer.from(b64, 'base64');
      buffer = bin.buffer.slice(bin.byteOffset, bin.byteOffset + bin.byteLength);
    } else if (tempUrl) {
      buffer = await fetch(tempUrl).then(r => r.arrayBuffer());
    } else {
      throw new Error('No image data in response');
    }

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
