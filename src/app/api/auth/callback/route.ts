import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("https://voice.omnipressence.com/login");
  }

  const tokenUrl = "https://us-east-1_h3GTXtQg3.auth.us-east-1.amazoncognito.com/oauth2/token";

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", process.env.COGNITO_CLIENT_ID!);
  params.append(
    "redirect_uri",
    "https://voice.omnipressence.com/api/auth/callback"
  );
  params.append("code", code);

  // PKCE verifier
  const codeVerifier = req.headers.get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("pkce_verifier="))
    ?.split("=")[1];

  if (codeVerifier) {
    params.append("code_verifier", codeVerifier);
  }

  const tokenRes = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    console.error("TOKEN ERROR:", errorText);
    return new Response(errorText, { status: 500 });
  }

  const data = await tokenRes.json();
  const idToken = data.id_token;

  if (!idToken) {
    return new Response("No ID token returned", { status: 500 });
  }

  const response = NextResponse.redirect(
    "https://voice.omnipressence.com/start"
  );

  response.cookies.set("gensen_session", idToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    domain: ".omnipressence.com",
    path: "/",
  });

  return response;
}
