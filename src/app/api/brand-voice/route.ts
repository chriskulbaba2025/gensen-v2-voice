// src/app/api/brand-voice/route.ts
import { NextResponse, NextRequest } from 'next/server';

type Length = 'standard' | 'pillar';
type Intent = 'informational' | 'transactional';

interface BrandVoicePayload {
  email?: string;
  keywords?: string;
  audience?: string;
  length?: Length;
  intent?: Intent;
  internalLinks?: string[];
}

function isBrandVoicePayload(x: unknown): x is BrandVoicePayload {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  if ('length' in o && o.length !== undefined && o.length !== 'standard' && o.length !== 'pillar') return false;
  if ('intent' in o && o.intent !== undefined && o.intent !== 'informational' && o.intent !== 'transactional') return false;
  if ('internalLinks' in o && o.internalLinks !== undefined && !Array.isArray(o.internalLinks)) return false;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const bodyUnknown = (await req.json()) as unknown;

    if (!isBrandVoicePayload(bodyUnknown)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const payload: BrandVoicePayload = bodyUnknown;

    const webhook = process.env.NEXT_PUBLIC_N8N_WEBHOOK;
    if (!webhook) {
      // No webhook configured: echo payload for visibility
      return NextResponse.json({ ok: true, received: payload }, { status: 200 });
    }

    const resp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await resp.text();
    return new NextResponse(text, { status: resp.status });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}