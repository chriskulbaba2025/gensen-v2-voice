// src/app/api/brand-voice/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // ✅ Parse request from frontend
    const body = await req.json();
    console.log('==============================');
    console.log('[📦 RECEIVED FROM FRONTEND]');
    console.log(JSON.stringify(body, null, 2));
    console.log('==============================');

    // ✅ Validate webhook URL
    const webhookURL = process.env.N8N_BRAND_VOICE_WEBHOOK;
    if (!webhookURL) {
      console.error('❌ Missing N8N_BRAND_VOICE_WEBHOOK in environment variables');
      return NextResponse.json({ error: 'Server misconfiguration: missing webhook URL' }, { status: 500 });
    }

    console.log('[➡️ FORWARDING TO N8N WEBHOOK]', webhookURL);

    // ✅ Forward request to n8n
    const n8nRes = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    // ✅ Capture n8n response
    const rawText = await n8nRes.text();
    console.log('==============================');
    console.log('[📨 RAW RESPONSE FROM N8N]');
    console.log(rawText);
    console.log('==============================');

    // ✅ Handle error response
    if (!n8nRes.ok) {
      console.error('[❌ N8N WEBHOOK ERROR]', rawText);
      return NextResponse.json(
        { error: 'n8n webhook failed', details: rawText },
        { status: 502 }
      );
    }

    // ✅ Attempt to parse JSON safely
    let parsedResponse: any;
    try {
      parsedResponse = JSON.parse(rawText);
    } catch {
      parsedResponse = { raw: rawText };
    }

    console.log('[✅ PARSED N8N RESPONSE]', parsedResponse);

    // ✅ Return response to frontend
    return NextResponse.json({ ok: true, n8n: parsedResponse }, { status: 200 });

  } catch (err: any) {
    console.error('❌ brand-voice route error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}
