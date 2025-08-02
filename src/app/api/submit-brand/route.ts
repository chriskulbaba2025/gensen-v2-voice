// src/app/api/submit-brand/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const webhookURL = process.env.N8N_SUBMIT_WEBHOOK;
    if (!webhookURL) {
      console.error('Missing N8N_SUBMIT_WEBHOOK in environment variables.');
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    const n8nRes = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!n8nRes.ok) {
      const errText = await n8nRes.text();
      console.error('[n8n SUBMIT ERROR]', errText);
      return NextResponse.json({ error: 'n8n request failed' }, { status: 502 });
    }

    const result = await n8nRes.json();
    return NextResponse.json(result);
  } catch (err) {
    console.error('Submit Proxy Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
