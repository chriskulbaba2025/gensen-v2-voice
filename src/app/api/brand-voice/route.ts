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
  brandCore?: Record<string, string>;
  icp?: string;
  audience?: string;
  brandStatement?: string;
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

    const body = bodyUnknown as BrandVoicePayload;

    // ─────────────────────────────────────────────
    // Normalize brandCore fields (merge with ICP/Audience/Statement)
    // ─────────────────────────────────────────────
    const brandCore = {
      'Brand Statement':
        body.brandStatement ||
        (body.brandCore && body.brandCore['Brand Statement']) ||
        '',
      Audience:
        body.audience ||
        (body.brandCore && body.brandCore['Audience']) ||
        '',
      ICP:
        body.icp ||
        (body.brandCore && body.brandCore['ICP']) ||
        '',
    };

    // ─────────────────────────────────────────────
    // Normalize slider scores
    // ─────────────────────────────────────────────
    const s = body.sliderScores || {};
    const sliderScores = {
      warmthAuthority: Number(s.warmthAuthority || 5),
      authorityEnergy: Number(s.authorityEnergy || 5),
      warmthEnergy: Number(s.warmthEnergy || 5),
      clarityCreativity: Number(s.clarityCreativity || 5),
      creativityEmpathy: Number(s.creativityEmpathy || 5),
      clarityEmpathy: Number(s.clarityEmpathy || 5),
      overall: Number(s.overall || 5),
    };

    // ─────────────────────────────────────────────
    // Construct final payload for n8n webhook
    // ─────────────────────────────────────────────
    const payload = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      business: body.business || '',
      url: body.url || '',
      brandCore,
      topic: body.topic || '',
      writingSample: body.writingSample || '',
      sliderScores,
    };

    // ─────────────────────────────────────────────
    // Send to n8n webhook (fire-and-forget)
    // ─────────────────────────────────────────────
    const webhook =
      process.env.N8N_BRAND_VOICE_WEBHOOK ||
      process.env.NEXT_PUBLIC_N8N_BRAND_VOICE_WEBHOOK ||
      'https://primary-production-77e7.up.railway.app/webhook/brand-voice';

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

    // Respond instantly so frontend can navigate immediately
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
