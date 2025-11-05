import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, business, url } = body || {};

    // basic validation
    if (!email || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // check-user webhook
    const webhookURL = process.env.N8N_CHECK_WEBHOOK;
    if (!webhookURL) {
      console.error('❌ Missing N8N_CHECK_WEBHOOK in environment');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // send to n8n check-user
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, business, url }),
    });

    const raw = await response.text();
    if (!response.ok) {
      console.error('[n8n Error Response]', raw);
      return NextResponse.json({ error: 'n8n lookup failed' }, { status: 502 });
    }

    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      console.error('[n8n Invalid JSON]', raw);
      return NextResponse.json({ error: 'Invalid JSON returned from n8n' }, { status: 502 });
    }

    console.log('[CHECK USER RESULT]', result);

    // main logic
    if (result.exists === false) {
      console.log('[NEW USER] Sending to submit-brand webhook');
      await fetch('https://primary-production-77e7.up.railway.app/webhook/submit-brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, business, url }),
      });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('check-user route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
