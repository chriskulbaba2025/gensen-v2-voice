// src/app/api/check-user/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(process.env.N8N_CHECK_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('[n8n ERROR]', errorText);
      return NextResponse.json({ error: 'n8n lookup failed' }, { status: 502 });
    }

    const result = await res.json();

    if (!result?.welcomeMessage) {
      return NextResponse.json({ error: 'No welcomeMessage returned from n8n' }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: 'Server error calling n8n' }, { status: 500 });
  }
}
