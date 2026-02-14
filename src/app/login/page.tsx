"use client";

import { useEffect, useState } from "react";

export default function Login() {
  const [loginUrl, setLoginUrl] = useState<string | null>(null);

  useEffect(() => {
    const clientId = "32qheda7uvt0fmsrdqtuff0ocq";
    const cognitoDomain = "https://gensen.omnipressence.com";
    const redirectUri =
      "https://voice.omnipressence.com/api/auth/callback";

    const url =
      `${cognitoDomain}/oauth2/authorize` +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent("openid email profile")}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}`;

    setLoginUrl(url);
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
