"use client";

export default function Login() {
  const cognitoDomain = "https://gensen.omnipressence.com";
  const clientId = "32qheda7uvt0fmsrdqtuff0ocq";
  const redirectUri = "https://voice.omnipressence.com/api/auth/callback";
  const scope = "openid email profile";

  const loginUrl =
    `${cognitoDomain}/oauth2/authorize` +
    `?client_id=${clientId}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scope)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "80px",
      }}
    >
      <button
        onClick={() => (window.location.href = loginUrl)}
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
