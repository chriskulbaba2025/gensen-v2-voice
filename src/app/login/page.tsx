"use client";

import { useEffect, useState } from "react";

export default function Login() {
  const [loginUrl, setLoginUrl] = useState<string | null>(null);

  useEffect(() => {
    const clientId = "32qheda7uvt0fmsrdqtuff0ocq";
    const cognitoDomain = "https://gensen.omnipressence.com";
    const redirectUri =
      "https://voice.omnipressence.com/api/auth/callback";
    const scope = "openid email profile";

    // --- PKCE generation ---
    const generateRandomString = (length: number) => {
      const charset =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
      let result = "";
      const randomValues = crypto.getRandomValues(
        new Uint8Array(length)
      );
      for (let i = 0; i < length; i++) {
        result += charset[randomValues[i] % charset.length];
      }
      return result;
    };

    const base64UrlEncode = (buffer: ArrayBuffer) => {
      return btoa(
        String.fromCharCode(...new Uint8Array(buffer))
      )
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    };

    const createCodeChallenge = async (verifier: string) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(verifier);
      const digest = await crypto.subtle.digest("SHA-256", data);
      return base64UrlEncode(digest);
    };

    const initAuth = async () => {
      const codeVerifier = generateRandomString(64);
      sessionStorage.setItem("pkce_verifier", codeVerifier);

      const codeChallenge = await createCodeChallenge(codeVerifier);

      const url =
        `${cognitoDomain}/oauth2/authorize` +
        `?client_id=${clientId}` +
        `&response_type=code` +
        `&scope=${encodeURIComponent(scope)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&code_challenge=${codeChallenge}` +
        `&code_challenge_method=S256`;

      setLoginUrl(url);
    };

    initAuth();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
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
