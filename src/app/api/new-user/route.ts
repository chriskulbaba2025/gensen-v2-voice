// src/app/api/new-user/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();

  // Step 1: check-user
  const check = await fetch(
    'https://primary-production-77e7.up.railway.app/webhook/check-user',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email }),
    }
  );
  const checkResult = await check.json();

  // Step 2: route logic
  if (checkResult.exists) {
    return NextResponse.json({
      status: 'exists',
      redirect: 'https://voice.omnipressence.com/existing-user',
    });
  }

  // Step 3: run secondary flow if not found
  const submit = await fetch(
    'https://primary-production-77e7.up.railway.app/webhook/submit-brand',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );
  const submitResult = await submit.json();

  return NextResponse.json({
    status: 'created',
    result: submitResult,
  });
}
