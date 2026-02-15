// src/app/api/brand-voice/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("BODY RECEIVED:", body);

    // Check for missing email
    if (!body || !body.email) {
      return NextResponse.json(
        { success: false, error: "Missing email" },
        { status: 400 }
      );
    }

    // Get the webhook URL from the environment variable
    const webhook = process.env.N8N_BRAND_VOICE_WEBHOOK;

    // Ensure webhook URL is configured
    if (!webhook) {
      return NextResponse.json(
        { success: false, error: "Webhook not configured" },
        { status: 500 }
      );
    }

    // Call the webhook with the received data
    const webhookRes = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await webhookRes.text();

    // Check if the webhook response is OK
    if (!webhookRes.ok) {
      console.error("n8n error:", text);
      return NextResponse.json(
        { success: false, error: "Webhook failed", details: text },
        { status: 500 }
      );
    }

    // Parse the response from n8n
    let parsed: any = {};
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      console.error("Error parsing response:", error);
      parsed = {};
    }

    // Respond back with the report URL or null if not available
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
