"use client";

export default function Login() {
  const loginUrl =
    "https://gensen.omnipressence.com/login" +
    "?client_id=68etr6fo3tjs4r9q7a6k8dk9m8" +
    "&response_type=code" +
    "&redirect_uri=https://voice.omnipressence.com/api/auth/callback";

  return (
    <div style={{ padding: "40px" }}>
      <button
        onClick={() => (window.location.href = loginUrl)}
        style={{
          padding: "14px 22px",
          background: "#076aff",
          color: "#fff",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      >
        Sign in to continue
      </button>
    </div>
  );
}
