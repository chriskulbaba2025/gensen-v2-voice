"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FormContext";

export default function StartPage() {
  const router = useRouter();
  const { setData } = useForm();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    try {
      const res = await fetch("/api/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email: cleanEmail,
        }),
      });

      if (!res.ok) {
        setError("Unable to submit your information.");
        setLoading(false);
        return;
      }

      const result = await res.json();

      const baseData = {
        firstName,
        email: cleanEmail,
      };

      setData(baseData);
      localStorage.setItem("gensen_user", JSON.stringify(baseData));

      if (result.exists === true) {
        router.push("/existing-user");
      } else {
        router.push("/intake");
      }
    } catch {
      setError("Unable to submit your information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-[#f5f8ff]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-full max-w-3xl border border-[#e0e6f5]"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-[#10284a]">
          Start Your Brand Voice
        </h1>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 rounded bg-[#076aff] text-white"
        >
          {loading ? "Submitting…" : "Continue"}
        </button>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </form>
    </main>
  );
}
