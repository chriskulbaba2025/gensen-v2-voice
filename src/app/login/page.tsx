"use client";

export default function Login() {
  const loginUrl =
    "https://gensen.omnipressence.com/login" +
    "?client_id=6760cut29ql2vv5533nah20ihm" +
    "&response_type=code" +
    "&redirect_uri=https://voice.omnipressence.com/api/auth/callback";

  const handleLogin = () => {
    window.location.href = loginUrl;
  };

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button
        onClick={handleLogin}
        style={{
          padding: "14px 22px",
          background: "#076aff",
          color: "#fff",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Sign in to continue
      </button>
    </div>
  );
}
