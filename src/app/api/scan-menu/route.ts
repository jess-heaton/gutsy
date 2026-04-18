import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are an expert in the Low FODMAP diet based on Monash University research. You help people with IBS navigate restaurant menus.

Analyse every dish/item on the menu and classify each as:
- safe: low FODMAP as described, fine to order
- modify: can be made safe with specific changes to request
- avoid: too high FODMAP, not worth ordering even modified

Output ONLY valid JSON in this exact shape:
{
  "restaurant": "name if identifiable, else null",
  "summary": "1–2 plain sentences on how IBS-friendly this menu is overall",
  "items": [
    {
      "name": "Dish name",
      "status": "safe" | "modify" | "avoid",
      "reason": "single sentence — what makes it safe/problematic",
      "modifications": "exactly what to ask the waiter, or null if not applicable"
    }
  ]
}

Be practical. Common safe modifications: ask for no onion/garlic, use garlic-infused oil, GF pasta or bread, lactose-free or skip dairy, dressing on the side, plain rice instead of pilaf. Do not include every item if the menu is large — focus on the most useful 15–25 dishes. Skip items that are obviously just drinks or sides with no FODMAP relevance.`;

async function fetchMenuText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Gutsy/1.0)' },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Could not fetch that URL (${res.status})`);
  const html = await res.text();
  // Strip tags, collapse whitespace, truncate
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 12000);
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your-api-key-here') {
    return Response.json({ error: 'API key not configured. Add ANTHROPIC_API_KEY to .env.local.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { url, text, pdfBase64 } = body as {
      url?: string; text?: string; pdfBase64?: string;
    };

    let userContent: Anthropic.MessageParam['content'];

    if (pdfBase64) {
      userContent = [
        {
          type: 'document',
          source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 },
        } as Anthropic.DocumentBlockParam,
        { type: 'text', text: 'Analyse this restaurant menu for FODMAP safety.' },
      ];
    } else {
      const menuText = url ? await fetchMenuText(url) : (text ?? '');
      if (!menuText.trim()) {
        return Response.json({ error: 'No menu content provided.' }, { status: 400 });
      }
      userContent = `Analyse this menu for FODMAP safety:\n\n${menuText}`;
    }

    const msg = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 3000,
      system: SYSTEM,
      messages: [{ role: 'user', content: userContent }],
    });

    const raw = msg.content[0].type === 'text' ? msg.content[0].text : '';
    // Extract JSON even if Claude wraps in code fences
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return Response.json({ error: 'Unexpected response format.' }, { status: 500 });

    const parsed = JSON.parse(jsonMatch[0]);
    return Response.json(parsed);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Something went wrong';
    return Response.json({ error: msg }, { status: 500 });
  }
}
