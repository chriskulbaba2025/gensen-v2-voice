// src/app/api/brand-voice/route.ts
import { NextResponse, NextRequest } from 'next/server';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
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

interface N8nResponse {
  success?: boolean;
  reportUrl?: string;
  [key: string]: unknown;
}

// ─────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────
function isValidPayload(x: unknown): x is BrandVoicePayload {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o.email === 'string' && o.email.includes('@');
}

// ─────────────────────────────────────────────
// POST Handler
// ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const bodyUnknown = await req.json().catch(() => null);

    if (!isValidPayload(bodyUnknown)) {
      return NextResponse.json(
        { success: false, error: 'Invalid brand voice payload' },
        { status: 400 }
      );
    }

    const payload = bodyUnknown;
    const webhook =
      process.env.N8N_BRAND_VOICE_WEBHOOK ||
      process.env.NEXT_PUBLIC_N8N_BRAND_VOICE_WEBHOOK ||
      'https://primary-production-77e7.up.railway.app/webhook/brand-voice';

    if (process.env.NODE_ENV !== 'production') {
      console.log('📤 Sending payload to n8n:', JSON.stringify(payload, null, 2));
      console.log('🔗 Webhook URL:', webhook);
    }

    const resp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await resp.text();
    let n8nData: N8nResponse = {};

    try {
      n8nData = JSON.parse(text);
    } catch {
      n8nData = { raw: text };
    }

    const reportUrl =
      typeof n8nData.reportUrl === 'string' ? n8nData.reportUrl : null;

    if (process.env.NODE_ENV !== 'production') {
      console.log('📥 n8n response status:', resp.status);
      console.log('📥 n8n response data:', n8nData);
    }

    return NextResponse.json(
      {
        success: resp.ok,
        status: resp.status,
        reportUrl,
        n8nResponse: n8nData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('❌ Error in /api/brand-voice:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
