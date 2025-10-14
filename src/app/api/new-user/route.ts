import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    let body = {};
    try {
      body = await req.json();
    } catch {
      console.warn('[NEW USER] Empty request body detected');
    }

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 });
    }

    console.log('[NEW USER DATA]', body);

    const webhookURL = process.env.N8N_SUBMIT_WEBHOOK;
    if (!webhookURL) {
      console.error('❌ Missing N8N_SUBMIT_WEBHOOK in env');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const n8nResponse = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const rawText = await n8nResponse.text();
    let result = {};

  try {
  result = rawText ? JSON.parse(rawText) : {};
} catch (err: unknown) {
  console.error('[NEW USER] Failed to parse n8n JSON response:', err);
  console.warn('[NEW USER] Raw response body:', rawText);
  result = {};
}


    console.log('[NEW USER RESULT]', result);

    return NextResponse.json({
      status: 'ok',
      message: 'Brand Voice generation started',
      n8nStatus: n8nResponse.status,
      result,
    });
  } catch (err) {
    console.error('[NEW USER ROUTE ERROR]', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
