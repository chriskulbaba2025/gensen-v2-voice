// src/app/api/brand-voice/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("BODY RECEIVED:", body);

    if (!body || !body.email) {
      return NextResponse.json(
        { success: false, error: "Missing email" },
        { status: 400 }
      );
    }

    const webhook = process.env.N8N_BRAND_VOICE_WEBHOOK;

    if (!webhook) {
      return NextResponse.json(
        { success: false, error: "Webhook not configured" },
        { status: 500 }
      );
    }

    const webhookRes = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await webhookRes.text();

    if (!webhookRes.ok) {
      console.error("n8n error:", text);
      return NextResponse.json(
        { success: false, error: "Webhook failed", details: text },
        { status: 500 }
      );
    }

    let parsed: any = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {};
    }

    return NextResponse.json(
      {
        success: true,
        reportUrl: parsed.reportUrl ?? null,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
