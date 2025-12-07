import { NextResponse } from "next/server";
import { decodeJwt } from "jose";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("https://voice.omnipressence.com/login");
  }

  const tokenUrl =
    "https://gensen.omnipressence.com/oauth2/token";

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", process.env.COGNITO_CLIENT_ID!);
  params.append(
    "redirect_uri",
    "https://voice.omnipressence.com/api/auth/callback"
  );
  params.append("code", code);

  const tokenRes = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
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

  // Set session cookie
  const response = NextResponse.redirect("https://voice.omnipressence.com/");
  response.cookies.set("gensen_session", idToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    domain: ".omnipressence.com",
    path: "/",
  });

  return response;
}
