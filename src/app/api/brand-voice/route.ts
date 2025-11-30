// src/app/api/brand-voice/route.ts
import { NextResponse, NextRequest } from "next/server";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface BrandVoicePayload {
  firstName: string;
  lastName: string;
  email: string;
  business?: string;
  url?: string;

  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;

  brandCore?: Record<string, string>;
  icp?: string;
  audience?: string;
  brandStatement?: string;

  topic?: string;
  writingSample?: string;
  sliderScores?: Record<string, number>;
}

// ─────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────
function isValidPayload(x: unknown): x is BrandVoicePayload {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o.email === "string" && o.email.includes("@");
}

// ─────────────────────────────────────────────
// POST Handler
// ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const bodyUnknown = await req.json().catch(() => null);

    if (!isValidPayload(bodyUnknown)) {
      return NextResponse.json(
        { success: false, error: "Invalid brand voice payload" },
        { status: 400 }
      );
    }

    const body = bodyUnknown as BrandVoicePayload;

    const brandCore = {
      "Brand Statement":
        body.brandStatement ||
        (body.brandCore && body.brandCore["Brand Statement"]) ||
        "",
      Audience:
        body.audience ||
        (body.brandCore && body.brandCore["Audience"]) ||
        "",
      ICP:
        body.icp || (body.brandCore && body.brandCore["ICP"]) || "",
    };

    const s = body.sliderScores || {};
    const sliderScores = {
      warmthAuthority: Number(s.warmthAuthority || 5),
      authorityEnergy: Number(s.authorityEnergy || 5),
      warmthEnergy: Number(s.warmthEnergy || 5),
      clarityCreativity: Number(s.clarityCreativity || 5),
      creativityEmpathy: Number(s.creativityEmpathy || 5),
      clarityEmpathy: Number(s.clarityEmpathy || 5),
      overall: Number(s.overall || 5),
    };

    const payload = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      business: body.business || "",
      url: body.url || "",
      facebook: body.facebook || "",
      instagram: body.instagram || "",
      linkedin: body.linkedin || "",
      youtube: body.youtube || "",
      icp: body.icp || "",
      audience: body.audience || "",
      brandStatement: body.brandStatement || "",
      brandCore,
      topic: body.topic || "",
      writingSample: body.writingSample || "",
      sliderScores,
    };

    const webhook =
      process.env.N8N_BRAND_VOICE_WEBHOOK ||
      "https://primary-production-77e7.up.railway.app/webhook/brand-voice";

    const webhookRes = await fetch(webhook, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!webhookRes.ok) {
      console.error("❌ n8n webhook failed:", await webhookRes.text());
      return NextResponse.json(
        { success: false, error: "Webhook failed" },
        { status: 500 }
      );
    }

    // FIXED LINT ERROR
    let n8nJson: Record<string, unknown> = {};
    try {
      n8nJson = await webhookRes.json();
    } catch {
      n8nJson = {};
    }

    return NextResponse.json(
      {
        success: true,
        reportUrl: n8nJson.reportUrl || null,
        message: "Brand voice generated",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error in /api/brand-voice:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
