// src/app/api/report-latest/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    if (!email) return new NextResponse('Missing email', { status: 400 });

    const airtableUrl =
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}` +
      `?filterByFormula={Clean Email}='${email.toLowerCase()}'`;

    const atRes = await fetch(airtableUrl, {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` },
      cache: 'no-store',
    });
    if (!atRes.ok) return new NextResponse('Airtable fetch failed', { status: 500 });

    const data = await atRes.json();
    const record = Array.isArray(data.records) && data.records[0];
    if (!record) return new NextResponse('Not found', { status: 404 });

    const reportUrl: string | undefined = record.fields?.['Cognito Report URL'];
    if (!reportUrl) return new NextResponse('Report not ready', { status: 202 });

    const htmlRes = await fetch(reportUrl, { cache: 'no-store' });
    if (!htmlRes.ok) return new NextResponse('Report not ready', { status: 202 });

    const html = await htmlRes.text();
    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
  } catch (err) {
    console.error('report-latest error:', err);
    return new NextResponse('Report not ready', { status: 202 });
  }
}
