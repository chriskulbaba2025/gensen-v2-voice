import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('[RECEIVED FROM FRONTEND]', body);

    const webhookURL = process.env.N8N_SUBMIT_WEBHOOK;
    if (!webhookURL) {
      console.error('❌ Missing N8N_BRAND_VOICE_WEBHOOK in environment variables.');
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    console.log('[FORWARDING TO]', webhookURL);

    const n8nRes = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const rawText = await n8nRes.text();
    console.log('[N8N RESPONSE RAW]', rawText);

    if (!n8nRes.ok) {
      console.error('[n8n SUBMIT ERROR]', rawText);
      return NextResponse.json({ error: 'n8n request failed', details: rawText }, { status: 502 });
    }

    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      console.warn('[WARN] n8n response was not valid JSON, returning raw text.');
      result = { raw: rawText };
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('❌ Submit Proxy Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
