import { NextResponse } from "next/server";

interface N8NReportResponse {
  welcomeMessage?: string;
  htmlContent?: string;
}

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
      console.error("❌ Missing N8N_REPORT_FETCH_WEBHOOK");
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
      console.error("[report-latest] n8n error:", raw);
      return NextResponse.json({ status: "processing" }, { status: 202 });
    }

    let result: N8NReportResponse;
    try {
      result = JSON.parse(raw) as N8NReportResponse;
    } catch {
      console.error("[report-latest] invalid JSON:", raw);
      return NextResponse.json({ status: "processing" }, { status: 202 });
    }

    const welcomeMessage = result.welcomeMessage ?? "";
    const htmlContent = result.htmlContent ?? "";

    if (!htmlContent || htmlContent.length < 20) {
      return NextResponse.json({ status: "processing" }, { status: 202 });
    }

    if (meta === "1") {
      return NextResponse.json({ welcomeMessage, htmlContent });
    }

    return new NextResponse(htmlContent, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (err) {
    console.error("[report-latest] Error:", err);
    return NextResponse.json({ status: "processing" }, { status: 202 });
  }
}
