// src/app/api/report-latest/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const meta = searchParams.get('meta'); // ?meta=1 means JSON mode
    if (!email) return new NextResponse('Missing email', { status: 400 });

    // Airtable query by Clean Email
    const formula = `LOWER({Clean Email})='${email.toLowerCase()}'`;
    const airtableUrl =
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}` +
      `?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`;

    const atRes = await fetch(airtableUrl, {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` },
      cache: 'no-store',
    });
    if (!atRes.ok) {
      console.error('[report-latest] Airtable fetch failed:', atRes.status);
      return new NextResponse('Airtable fetch failed', { status: 500 });
    }

    const data = await atRes.json();
    const record = data.records?.[0];
    if (!record) return new NextResponse('Not found', { status: 404 });

    const fields = record.fields || {};

    // ───────────── META BRANCH ─────────────
    if (meta === '1') {
      return NextResponse.json({
        icp: fields['ICP'] || '',
        audience: fields['Audience'] || '',
        brandStatement: fields['Brand Statement'] || '',
      });
    }

    // ───────────── REPORT BRANCH ─────────────
    const reportUrl: string | undefined = fields['Cognito Report URL'];
    if (!reportUrl) return new NextResponse('Report not ready', { status: 202 });

    const htmlRes = await fetch(reportUrl, { cache: 'no-store' });
    if (!htmlRes.ok) return new NextResponse('Report not ready', { status: 202 });

    const html = await htmlRes.text();
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    console.error('[report-latest] Error:', err);
    return new NextResponse('Report not ready', { status: 202 });
  }
}
