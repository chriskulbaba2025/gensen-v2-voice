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

    // ─────────────────────────────────────────────
    // Fire-and-forget call to n8n so this endpoint returns immediately
    // ─────────────────────────────────────────────
    fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch((err) =>
      console.error('❌ n8n webhook error (non-blocking):', err)
    );

    if (process.env.NODE_ENV !== 'production') {
      console.log('📤 Triggered n8n webhook:', webhook);
      console.log('📦 Payload:', JSON.stringify(payload, null, 2));
    }

    // Respond instantly so the frontend can navigate to the report screen
    return NextResponse.json(
      {
        success: true,
        message: 'Brand voice generation started',
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
