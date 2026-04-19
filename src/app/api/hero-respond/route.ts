import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SYSTEM = `You are Gutsy, a concise assistant for people with IBS following the low-FODMAP diet (Monash University protocol).

Rules:
- Reply in 1–2 short sentences. No greetings, no preamble, no sign-off.
- Be directly useful. If the user named a food, a restaurant, or a recipe, say something specific about it (high-FODMAP culprits, a safe swap, or what to look for).
- Never diagnose. Never promise medical outcomes.
- Do not tell the user to click a button or visit another page — the UI already handles that.
- Write in a warm but efficient tone. Plain English.
`;

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (typeof text !== 'string' || !text.trim()) {
      return new Response('bad request', { status: 400 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

    const stream = await client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 160,
      system: SYSTEM,
      messages: [{ role: 'user', content: text }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    return new Response(err instanceof Error ? err.message : 'error', { status: 500 });
  }
}
