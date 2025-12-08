import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  // If no code → go back to login
  if (!code) {
    return NextResponse.redirect("https://voice.omnipressence.com/login");
  }

  // Token endpoint
  const tokenUrl = "https://gensen.omnipressence.com/oauth2/token";

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", process.env.COGNITO_CLIENT_ID!);
  params.append(
    "redirect_uri",
    "https://voice.omnipressence.com/api/auth/callback"
  );
  params.append("code", code);

  // Exchange code for tokens
  const tokenRes = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect("https://voice.omnipressence.com/login");
  }

  const data = await tokenRes.json();
  const idToken = data.id_token;

  if (!idToken) {
    return NextResponse.redirect("https://voice.omnipressence.com/login");
  }

  // SUCCESS → set cookie + send user to the start page
  const response = NextResponse.redirect("https://voice.omnipressence.com/start");

  response.cookies.set("gensen_session", idToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    domain: ".omnipressence.com", // allows voice.omnipressence.com to read it
    path: "/",
  });

  return response;
}
