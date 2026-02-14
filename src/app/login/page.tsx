"use client";

export default function Login() {
  const loginUrl =
    "https://gensen.omnipressence.com/oauth2/authorize" +
    "?client_id=68etr6fo3tjs4r9q7a6k8dk9m8" +
    "&response_type=code" +
    "&scope=openid+email+profile" +
    "&redirect_uri=https://voice.omnipressence.com/api/auth/callback";

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
