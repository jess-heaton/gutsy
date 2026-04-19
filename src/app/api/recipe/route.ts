import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are an expert Low FODMAP chef and dietitian, applying Monash University research. A user with IBS wants a FODMAP-safe recipe.

You will receive one of four input modes:
- "recipe": an existing recipe to convert
- "describe": a free-text description of a meal the user wants to cook
- "fridge": a list of ingredients the user has on hand — invent a sensible dish
- "photo": a photo of a recipe page or handwritten recipe

For all modes, produce a complete, FODMAP-safe recipe the user can actually cook.

Output ONLY valid JSON in this exact shape:
{
  "title": "Short, appetising dish name (no 'FODMAP-Friendly' prefix)",
  "emoji": "one single food emoji best representing the dish",
  "accent": "one of: amber, rose, emerald, sky, violet, orange, lime, teal (pick what matches the dish mood)",
  "tags": ["2–4 short tags, e.g. 'breakfast', 'italian', 'quick', 'vegan', 'one-pan'"],
  "totalTime": "e.g. '25 min'",
  "servings": "e.g. '2'",
  "swaps": [
    { "original": "exact ingredient", "swap": "FODMAP-safe replacement", "why": "one brief sentence" }
  ],
  "recipe": "The full recipe as a single string. Start with an 'Ingredients:' block (one per line with quantity) then a numbered 'Method:' block. Use the swapped ingredients throughout.",
  "notes": ["Important serving-size warnings, e.g. 'Keep avocado to 1/8 fruit per serve'"],
  "lowFodmapConfidence": "high" | "medium" | "low"
}

If mode is "describe" or "fridge", there are no "original" ingredients to swap — return swaps: [] and simply build a safe recipe from scratch using the user's intent.

Common swaps to apply:
- Onion → green spring onion tops only, or omit
- Garlic → garlic-infused oil (FODMAPs don't leach into oil)
- Wheat flour / pasta → gluten-free versions
- Regular milk / yogurt / cream cheese → lactose-free versions
- Honey → pure maple syrup or rice malt syrup
- Cashews → macadamia or walnuts (10 halves max)
- Chickpeas/lentils → canned & rinsed, max 1/4 cup per serve
- Apple / pear → firm banana, grapes, or orange
- Regular soy sauce → tamari
- Stock → homemade or low-FODMAP certified (no onion/garlic)`;

type Mode = 'recipe' | 'url' | 'describe' | 'fridge' | 'photo';

async function fetchPageText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Gutsy/1.0)' },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Could not fetch that URL (${res.status})`);
  const html = await res.text();
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
    const body = await req.json() as {
      mode?: Mode;
      recipe?: string;
      url?: string;
      describe?: string;
      fridge?: string;
      imageBase64?: string;
      imageMediaType?: 'image/jpeg' | 'image/png' | 'image/webp';
    };
    const mode: Mode = body.mode ?? 'recipe';

    let userContent: Anthropic.MessageParam['content'];

    if (mode === 'photo') {
      if (!body.imageBase64) return Response.json({ error: 'No image provided.' }, { status: 400 });
      userContent = [
        {
          type: 'image',
          source: { type: 'base64', media_type: body.imageMediaType ?? 'image/jpeg', data: body.imageBase64 },
        },
        { type: 'text', text: 'Mode: "photo". Read the recipe from this image and produce a FODMAP-safe version.' },
      ];
    } else if (mode === 'url') {
      if (!body.url?.trim()) return Response.json({ error: 'No URL provided.' }, { status: 400 });
      const text = await fetchPageText(body.url);
      userContent = `Mode: "recipe". Source URL: ${body.url}\n\nExtract the recipe from this page content and produce a FODMAP-safe version:\n\n${text}`;
    } else if (mode === 'describe') {
      if (!body.describe?.trim()) return Response.json({ error: 'Describe a meal first.' }, { status: 400 });
      userContent = `Mode: "describe". The user wants to cook: ${body.describe}\n\nInvent a FODMAP-safe recipe matching their description.`;
    } else if (mode === 'fridge') {
      if (!body.fridge?.trim()) return Response.json({ error: 'List some ingredients first.' }, { status: 400 });
      userContent = `Mode: "fridge". The user has these ingredients on hand:\n${body.fridge}\n\nInvent a sensible FODMAP-safe recipe that uses as many of them as possible. You may assume pantry staples (oil, salt, pepper, herbs, stock).`;
    } else {
      if (!body.recipe?.trim()) return Response.json({ error: 'No recipe provided.' }, { status: 400 });
      userContent = `Mode: "recipe".\n\n${body.recipe}`;
    }

    const msg = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      system: SYSTEM,
      messages: [{ role: 'user', content: userContent }],
    });

    const raw = msg.content[0].type === 'text' ? msg.content[0].text : '';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return Response.json({ error: 'Unexpected response format.' }, { status: 500 });

    const parsed = JSON.parse(jsonMatch[0]);
    return Response.json(parsed);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Something went wrong';
    return Response.json({ error: msg }, { status: 500 });
  }
}
