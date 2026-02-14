"use client";

function base64UrlEncode(bytes: Uint8Array) {
  let str = "";
  bytes.forEach((b) => (str += String.fromCharCode(b)));
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function sha256(input: string) {
  const enc = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return new Uint8Array(digest);
}

function randomString(length = 64) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

export default function Login() {
  const cognitoDomain = "https://gensen.omnipressence.com";
  const clientId = "32qheda7uvt0fmsrdqtuff0ocq";
  const redirectUri = "https://voice.omnipressence.com/api/auth/callback";
  const scope = "openid email profile";

  const onLogin = async () => {
    // PKCE
    const codeVerifier = randomString(96);
    const challengeBytes = await sha256(codeVerifier);
    const codeChallenge = base64UrlEncode(challengeBytes);

    // store verifier for callback exchange
    sessionStorage.setItem("pkce_code_verifier", codeVerifier);

    const url =
      `${cognitoDomain}/oauth2/authorize` +
      `?client_id=${encodeURIComponent(clientId)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(scope)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&code_challenge=${encodeURIComponent(codeChallenge)}` +
      `&code_challenge_method=S256`;

    window.location.href = url;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}>
      <button
        onClick={onLogin}
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
