import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are an expert in the Low FODMAP diet (Monash University) helping people with IBS navigate real restaurant menus.

You have a web_search tool. Use it aggressively when the source material in front of you does not clearly list named dishes.
- If the user gave a URL whose content looks like a homepage, about page, or reservations page rather than a menu, SEARCH for the real menu.
- Prefer the restaurant's OWN website. Try queries like "<restaurant name> menu", "site:<domain> menu", "<restaurant> <location> menu pdf".
- You may run several searches. Keep going until you find an actual list of named dishes, or you are confident it is not publicly available.

CRITICAL rules — do NOT invent dishes:
- Every item you return MUST appear, by name, in either the fetched page content or a web_search result you pulled.
- Never fill in generic or typical dishes ("Margherita pizza", "Caesar salad") unless that exact dish is on THIS restaurant's menu.
- If, after searching, you still cannot find a real menu with named dishes, return { "items": [], "summary": "I couldn't find this restaurant's menu online — try pasting the menu text or uploading a PDF." } and set menu_source_url to null.

Classify each dish:
- safe: low FODMAP as described, fine to order
- modify: can be made safe with specific changes
- avoid: too high FODMAP, not worth ordering even modified

Respond with ONLY valid JSON (no preamble, no code fences, no commentary):
{
  "restaurant": "name if identifiable, else null",
  "menu_source_url": "the URL where you actually found the menu, or null",
  "summary": "1-2 plain sentences on how IBS-friendly this menu is overall",
  "items": [
    {
      "name": "Dish name exactly as written on the menu",
      "status": "safe" | "modify" | "avoid",
      "reason": "single sentence — what makes it safe/problematic",
      "modifications": "exactly what to ask the waiter, or null"
    }
  ]
}

Be practical. Common safe modifications: no onion/garlic, garlic-infused oil, GF pasta/bread, lactose-free or skip dairy, dressing on the side, plain rice instead of pilaf. Focus on the most useful 15-25 dishes if the menu is large. Skip pure drinks/sides with no FODMAP relevance.`;

const MENU_PATHS = [
  '/menu', '/menus', '/food', '/food-drink', '/food-and-drink',
  '/eat', '/eat-drink', '/dining', '/drinks', '/our-menu',
  '/the-menu', '/sample-menu', '/a-la-carte',
];

async function fetchRaw(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Gutsy/1.0)' },
      signal: AbortSignal.timeout(8000),
      redirect: 'follow',
    });
    if (!res.ok) return '';
    return await res.text();
  } catch {
    return '';
  }
}

function extractOgImage(html: string, baseUrl: string): string | null {
  const m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
    ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (!m) return null;
  try {
    return new URL(m[1], baseUrl).href;
  } catch {
    return null;
  }
}

async function fetchText(url: string): Promise<string> {
  const html = await fetchRaw(url);
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 15000);
}

/* Higher score = more likely to actually be a menu page. */
function menuScore(t: string): number {
  if (t.length < 400) return 0;
  const lower = t.toLowerCase();
  const prices = (t.match(/[£$€]\s?\d/g) ?? []).length;
  const words = [
    'menu','starter','starters','main','mains','dessert','desserts',
    'appetizer','entrée','entree','pizza','burger','salad','pasta',
    'risotto','steak','chicken','beef','fish','lamb','sauce','served with',
  ];
  const wordHits = words.filter(w => lower.includes(w)).length;
  return prices * 2 + wordHits;
}

async function crawlForMenu(inputUrl: string): Promise<{ url: string; text: string; score: number; heroImage: string | null } | null> {
  let origin = '';
  try {
    origin = new URL(inputUrl).origin;
  } catch {
    return null;
  }

  const urls = new Set<string>([inputUrl]);
  for (const p of MENU_PATHS) urls.add(`${origin}${p}`);

  // Fetch homepage HTML separately to grab og:image
  const homepageHtml = await fetchRaw(origin);
  const heroImage = homepageHtml ? extractOgImage(homepageHtml, origin) : null;

  const results = await Promise.all(
    [...urls].map(async u => ({ url: u, text: await fetchText(u) })),
  );
  const scored = results
    .map(r => ({ ...r, score: menuScore(r.text) }))
    .sort((a, b) => b.score - a.score);
  const best = scored[0];
  return best && best.score >= 6 ? { ...best, heroImage } : null;
}

type Source = { url: string; title?: string };

interface WebSearchResultItem { type: string; url?: string; title?: string }
interface WebSearchToolResultBlock { type: 'web_search_tool_result'; content: WebSearchResultItem[] }

function extractWebSources(content: Anthropic.Messages.ContentBlock[]): Source[] {
  const out: Source[] = [];
  for (const b of content as unknown as WebSearchToolResultBlock[]) {
    if (b.type === 'web_search_tool_result' && Array.isArray(b.content)) {
      for (const it of b.content) {
        if (it.type === 'web_search_result' && it.url) {
          out.push({ url: it.url, title: it.title });
        }
      }
    }
  }
  const seen = new Set<string>();
  return out.filter(s => (seen.has(s.url) ? false : (seen.add(s.url), true)));
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your-api-key-here') {
    return Response.json({ error: 'API key not configured.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { url, text, pdfBase64 } = body as { url?: string; text?: string; pdfBase64?: string; };

    let userContent: Anthropic.MessageParam['content'];
    const fetchedSources: Source[] = [];
    let heroImage: string | null = null;

    if (pdfBase64) {
      userContent = [
        { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 } } as Anthropic.DocumentBlockParam,
        { type: 'text', text: 'Analyse this restaurant menu for FODMAP safety. Every dish in your output must appear in the PDF.' },
      ];
    } else if (url || (text && /https?:\/\/\S+/.test(text))) {
      const targetUrl = (url || text!.match(/https?:\/\/\S+/)![0]).trim();
      const found = await crawlForMenu(targetUrl);
      if (found) {
        heroImage = found.heroImage;
        fetchedSources.push({ url: found.url, title: 'Fetched from restaurant website' });
        userContent =
          `The user gave this URL: ${targetUrl}\n` +
          `The best menu-looking page I could fetch from the same domain was: ${found.url}\n\n` +
          `Fetched page content:\n\n${found.text}\n\n` +
          `Analyse this as the menu. BUT: if this content does not actually list named dishes (it's a homepage, about page, booking page, etc), use web_search to find the real menu before analysing. Every item in your JSON must come from real source text. Set "menu_source_url" to the URL where the menu actually lives.`;
      } else {
        userContent =
          `The user gave this URL: ${targetUrl}\n\n` +
          `I tried that page and common menu paths on the same domain (/menu, /food, /food-drink, etc) and could not extract a dish list. Use web_search to find the actual menu for this restaurant. Start with site-specific queries ("site:${safeHost(targetUrl)} menu") and fall back to "<restaurant name> menu". Every item you return MUST come from real source text. Set "menu_source_url" to where you found the menu.`;
      }
    } else if (text?.trim()) {
      if (text.trim().length < 200) {
        userContent = `The user asked about: "${text.trim()}". Use web_search to find this restaurant's actual menu (prefer their own website), then analyse it. Every item you return MUST come from real source text. Set "menu_source_url" to the URL where you found the menu.`;
      } else {
        userContent = `Analyse this pasted menu for FODMAP safety. Every item in your output must appear in this text:\n\n${text}`;
      }
    } else {
      return Response.json({ error: 'No menu content provided.' }, { status: 400 });
    }

    const msg = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 6000,
      system: SYSTEM,
      tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 5 }],
      messages: [{ role: 'user', content: userContent }],
    });

    const raw = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map(b => b.text)
      .join('\n');

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: 'Could not find a menu for that. Try pasting the menu text directly or uploading the PDF.' }, { status: 502 });
    }
    const parsed = JSON.parse(jsonMatch[0]);

    const webSources = extractWebSources(msg.content);
    const combined: Source[] = [];
    const pushUnique = (s: Source) => {
      if (!combined.some(c => c.url === s.url)) combined.push(s);
    };
    if (parsed.menu_source_url) pushUnique({ url: parsed.menu_source_url, title: 'Menu source' });
    fetchedSources.forEach(pushUnique);
    webSources.forEach(pushUnique);

    return Response.json({ ...parsed, sources: combined, hero_image_url: heroImage });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Something went wrong';
    return Response.json({ error: msg }, { status: 500 });
  }
}

function safeHost(u: string): string {
  try { return new URL(u).host; } catch { return ''; }
}
