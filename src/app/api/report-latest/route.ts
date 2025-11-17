import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const meta = searchParams.get("meta");

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const webhookURL = process.env.N8N_REPORT_FETCH_WEBHOOK;
    if (!webhookURL) {
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });

    const raw = await response.text();

    if (!response.ok) {
      return NextResponse.json({ status: "processing" }, { status: 202 });
    }

    // NEW FIX — handle array response
    const parsed = JSON.parse(raw);
    const record = Array.isArray(parsed) ? parsed[0] : parsed;

    const welcomeMessage = record.welcomeMessage ?? "";
    const htmlContent = record.htmlContent ?? "";

    if (!htmlContent || htmlContent.length < 20) {
      return NextResponse.json({ status: "processing" }, { status: 202 });
    }

    if (meta === "1") {
      return NextResponse.json({ welcomeMessage, htmlContent });
    }

    return new NextResponse(htmlContent, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch {
    return NextResponse.json({ status: "processing" }, { status: 202 });
  }
}
