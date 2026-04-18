import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are an expert Low FODMAP chef and dietitian, applying Monash University research. A user wants to make their recipe FODMAP-safe for the elimination phase.

Given a recipe, do the following:
1. Identify every high or moderate FODMAP ingredient
2. Provide a direct, practical swap for each
3. Rewrite the full recipe using the safe swaps

Output ONLY valid JSON in this exact shape:
{
  "title": "FODMAP-Friendly [original dish name]",
  "swaps": [
    {
      "original": "exact ingredient as written",
      "swap": "FODMAP-safe replacement",
      "why": "one brief sentence on why and the serving-size rule if relevant"
    }
  ],
  "recipe": "The full rewritten recipe as a single string, preserving the original formatting style (ingredients list then method). Use the swapped ingredients throughout.",
  "notes": ["Any important serving size warnings, e.g. 'Keep avocado to ⅛ fruit per serve'"],
  "lowFodmapConfidence": "high" | "medium" | "low"
}

Common swaps to apply:
- Onion → green spring onion tops only, or omit
- Garlic → garlic-infused oil (FODMAPs don't leach into oil)
- Regular wheat flour → gluten-free plain flour or rice flour
- Wheat pasta → rice or corn GF pasta
- Regular milk → lactose-free milk or unsweetened almond milk
- Yogurt → lactose-free yogurt
- Cream cheese / ricotta → lactose-free versions or firm tofu blended
- Honey → pure maple syrup or rice malt syrup
- Cashews → macadamia nuts or walnuts (10 halves max)
- Chickpeas/lentils (large) → canned chickpeas rinsed, max ¼ cup per serve
- Apple / pear → firm banana, grapes, or orange
- Regular soy sauce → tamari or GF soy sauce
- Stock / broth → homemade or certified low FODMAP stock (no onion/garlic)`;

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your-api-key-here') {
    return Response.json({ error: 'API key not configured. Add ANTHROPIC_API_KEY to .env.local.' }, { status: 500 });
  }

  try {
    const { recipe } = await req.json() as { recipe: string };
    if (!recipe?.trim()) {
      return Response.json({ error: 'No recipe provided.' }, { status: 400 });
    }

    const msg = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      system: SYSTEM,
      messages: [{ role: 'user', content: `Make this recipe FODMAP-safe:\n\n${recipe}` }],
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
