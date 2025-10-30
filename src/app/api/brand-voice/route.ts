// src/app/api/brand-voice/route.ts
import { NextResponse, NextRequest } from 'next/server';

interface BrandVoicePayload {
  firstName: string;
  lastName: string;
  email: string;
  business?: string;
  url?: string;
  brandCore?: string;
  topic?: string;
  writingSample?: string;
  sliderScores?: Record<string, number>;
}

// Basic validation
function isValidPayload(x: unknown): x is BrandVoicePayload {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o.email === 'string' && o.email.includes('@');
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as unknown;

    if (!isValidPayload(body)) {
      return NextResponse.json({ error: 'Invalid brand voice payload' }, { status: 400 });
    }

    const webhook =
      process.env.N8N_BRAND_VOICE_WEBHOOK ||
      process.env.NEXT_PUBLIC_N8N_BRAND_VOICE_WEBHOOK ||
      'https://primary-production-77e7.up.railway.app/webhook/brand-voice';

    const resp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    let n8nData: any;
    try {
      n8nData = await resp.json();
    } catch {
      n8nData = { raw: await resp.text() };
    }

    // Standardized response for front-end
    return NextResponse.json(
      {
        success: resp.ok,
        status: resp.status,
        reportUrl: n8nData?.reportUrl ?? null,
        n8nResponse: n8nData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error in /api/brand-voice:', err);
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
