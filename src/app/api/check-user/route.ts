import { NextResponse } from "next/server";

interface N8NCheckResponse {
  exists?: boolean;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as { email?: string } | null;

    if (!body?.email || typeof body.email !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid email" },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();

    const webhookURL = process.env.N8N_CHECK_WEBHOOK;
    if (!webhookURL) {
      console.error("❌ Missing N8N_CHECK_WEBHOOK");
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const raw = await response.text();

    if (!response.ok) {
      console.error("[n8n Error]", raw);
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    let result: N8NCheckResponse;
    try {
      result = JSON.parse(raw) as N8NCheckResponse;
    } catch {
      console.error("[Invalid n8n JSON]", raw);
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    return NextResponse.json(
      { exists: result.exists === true },
      { status: 200 }
    );

  } catch {
    return NextResponse.json(
      { exists: false },
      { status: 200 }
    );
  }
}
