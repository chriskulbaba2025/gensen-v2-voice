import { NextResponse } from 'next/server';

// Pull latest uploaded report from S3
export async function GET() {
  try {
    const res = await fetch(
      'https://8144-6256-0475-omni-reports.s3.amazonaws.com/clients/chris@omnipressence.com/voice/2025-10-30T03-14-06-672Z/index.html'
    );
    if (!res.ok) throw new Error('Not ready');
    const html = await res.text();
    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
  } catch {
    return new NextResponse('Report not ready', { status: 202 });
  }
}
