import { NextResponse } from "next/server";

// In-memory store for the most recent report
// (Replace later with DB or Airtable if needed)
const report = {
  welcomeMessage: "",
  htmlContent: ""
};

// Receive POST from n8n
export async function POST(req: Request) {
  const body = await req.json();

  report.welcomeMessage = body.welcomeMessage || "";
  report.htmlContent = body.htmlContent || "";

  return NextResponse.json({ ok: true });
}

// Allow the page to GET the stored report
export async function GET() {
  return NextResponse.json(report);
}
