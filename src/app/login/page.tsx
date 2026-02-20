"use client";

import { useEffect, useState } from "react";

function base64urlencode(buffer: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest("SHA-256", data);
}

export default function Login() {
  const [loginUrl, setLoginUrl] = useState<string | null>(null);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
    const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
    const redirectUri = "https://voice.omnipressence.com/api/auth/callback";

    async function generatePKCE() {
      const randomBytes = new Uint8Array(32);
      crypto.getRandomValues(randomBytes);
      const codeVerifier = base64urlencode(randomBytes.buffer);

      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64urlencode(hashed);

      document.cookie = `pkce_verifier=${codeVerifier}; path=/; secure; samesite=lax`;

      const url =
        `${cognitoDomain}/oauth2/authorize` +
        `?client_id=${clientId}` +
        `&response_type=code` +
        `&scope=${encodeURIComponent("openid email profile")}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&code_challenge=${codeChallenge}` +
        `&code_challenge_method=S256`;

      setLoginUrl(url);
    }

    generatePKCE();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70px",
      }}
    >
      <button
        disabled={!loginUrl}
        onClick={() => {
          if (loginUrl) window.location.href = loginUrl;
        }}
        style={{
          padding: "14px 28px",
          background: "#076aff",
          color: "#ffffff",
          borderRadius: "8px",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Sign in to continue
      </button>
    </div>
  );
}
