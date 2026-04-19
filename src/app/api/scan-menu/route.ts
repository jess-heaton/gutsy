import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are an expert in the Low FODMAP diet based on Monash University research. You help people with IBS navigate restaurant menus.

You have access to a web_search tool. Use it whenever:
- The user gives you a URL that fetches no useful menu content.
- The user names a restaurant without a URL (e.g. "Nando's", "Wagamama").
- The fetched page doesn't actually contain the menu (e.g. it's a homepage or reservation page).

Try queries like "<restaurant name> menu", "<name> menu pdf", or "<name> <location> menu". You may run multiple searches to find the real menu. When you find a menu (or a trustworthy summary of the menu), analyse it.

Analyse every dish/item on the menu and classify each as:
- safe: low FODMAP as described, fine to order
- modify: can be made safe with specific changes to request
- avoid: too high FODMAP, not worth ordering even modified

After your research, respond with ONLY valid JSON in this exact shape (no preamble, no code fences):
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

Be practical. Common safe modifications: ask for no onion/garlic, use garlic-infused oil, GF pasta or bread, lactose-free or skip dairy, dressing on the side, plain rice instead of pilaf. Focus on the most useful 15–25 dishes if the menu is large. Skip pure drinks/sides with no FODMAP relevance.`;

async function fetchMenuText(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Gutsy/1.0)' },
      signal: AbortSignal.timeout(8000),
      redirect: 'follow',
    });
    if (!res.ok) return '';
    const html = await res.text();
    return html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 12000);
  } catch {
    return '';
  }
}

/* Heuristic: does the fetched text look like an actual menu? */
function looksLikeMenu(t: string): boolean {
  if (t.length < 600) return false;
  const lower = t.toLowerCase();
  const priceHits = (t.match(/[£$€]\s?\d/g) ?? []).length;
  const foodHits  = ['menu','starter','main','dessert','appetizer','entrée','entree','pizza','burger','salad','pasta','rice','chicken','beef']
    .filter(w => lower.includes(w)).length;
  return priceHits >= 3 || foodHits >= 4;
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your-api-key-here') {
    return Response.json({ error: 'API key not configured.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { url, text, pdfBase64 } = body as { url?: string; text?: string; pdfBase64?: string; };

    let userContent: Anthropic.MessageParam['content'];
    let useWebSearch = false;

    if (pdfBase64) {
      userContent = [
        { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 } } as Anthropic.DocumentBlockParam,
        { type: 'text', text: 'Analyse this restaurant menu for FODMAP safety.' },
      ];
    } else if (url) {
      const fetched = await fetchMenuText(url);
      if (fetched && looksLikeMenu(fetched)) {
        userContent = `The user pasted this URL: ${url}\n\nThe fetched page content:\n\n${fetched}\n\nAnalyse the menu for FODMAP safety.`;
      } else {
        useWebSearch = true;
        userContent = `The user gave this URL: ${url}\n\nI was not able to extract a useful menu from the page (fetched ${fetched.length} chars, did not look like a menu). Use web_search to find the actual menu for this restaurant, then analyse it.`;
      }
    } else if (text?.trim()) {
      // If it contains a URL, try it; otherwise treat as a restaurant name or partial text.
      const urlMatch = text.match(/https?:\/\/\S+/);
      if (urlMatch) {
        const fetched = await fetchMenuText(urlMatch[0]);
        if (fetched && looksLikeMenu(fetched)) {
          userContent = `The user pasted this URL: ${urlMatch[0]}\n\nFetched content:\n\n${fetched}\n\nAnalyse the menu for FODMAP safety.`;
        } else {
          useWebSearch = true;
          userContent = `The user gave this URL: ${urlMatch[0]} (could not extract menu from the page). Use web_search to find the actual menu and analyse it.`;
        }
      } else if (text.trim().length < 200) {
        // Short input — probably a restaurant name like "Nando's Shoreditch"
        useWebSearch = true;
        userContent = `The user asked about: "${text.trim()}". Use web_search to find this restaurant's actual menu, then analyse it for FODMAP safety.`;
      } else {
        userContent = `Analyse this menu for FODMAP safety:\n\n${text}`;
      }
    } else {
      return Response.json({ error: 'No menu content provided.' }, { status: 400 });
    }

    const msg = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      system: SYSTEM,
      tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: useWebSearch ? 4 : 2 }],
      messages: [{ role: 'user', content: userContent }],
    });

    // Concatenate all text blocks (there may be several if the model searched).
    const raw = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map(b => b.text)
      .join('\n');

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: 'Could not find a menu for that. Try pasting the menu text directly.' }, { status: 502 });
    }
    const parsed = JSON.parse(jsonMatch[0]);
    return Response.json(parsed);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Something went wrong';
    return Response.json({ error: msg }, { status: 500 });
  }
}
