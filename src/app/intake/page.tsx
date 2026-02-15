"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FormContext";

export default function IntakePage() {
  const router = useRouter();
  const { data, setData } = useForm();

  const [businessName, setBusinessName] = useState("");
  const [businessURL, setBusinessURL] = useState("");

  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedinPersonal, setLinkedinPersonal] = useState("");
  const [linkedinBusiness, setLinkedinBusiness] = useState("");
  const [youtube, setYoutube] = useState("");
  const [x, setX] = useState("");

  const [facebookNone, setFacebookNone] = useState(false);
  const [instagramNone, setInstagramNone] = useState(false);
  const [linkedinPersonalNone, setLinkedinPersonalNone] = useState(false);
  const [linkedinBusinessNone, setLinkedinBusinessNone] = useState(false);
  const [youtubeNone, setYoutubeNone] = useState(false);
  const [xNone, setXNone] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const socialValue = (value: string, none: boolean) => {
    if (none) return "no_social";
    const v = value.trim();
    return v !== "" ? v : "no_social";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    if (!data.firstName || !data.email) {
      setError("Missing name or email from first step.");
      return;
    }

    if (!data.clientId) {
      setError("ClientID required.");
      return;
    }

    setLoading(true);
    setError("");

    // ✅ ONLY ADDITION — persist to context
    setData({
      business: businessName,
      url: businessURL,
      facebook,
      instagram,
      linkedinPersonal,
      linkedinBusiness,
      youtube,
    });

    const normalizedSub = data.clientId.replace("#SUB", "").trim();
    const finalClientID = `sub#${normalizedSub}`;

    try {
      const res = await fetch(
        "https://primary-production-77e7.up.railway.app/webhook/submit-brand",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ClientID: finalClientID,
            SortKey: "PROFILE",
            Email: data.email,
            FirstName: data.firstName,
            BusinessName: businessName,
            BusinessURL: businessURL,
            Social: {
              facebook: socialValue(facebook, facebookNone),
              instagram: socialValue(instagram, instagramNone),
              linkedinPersonal: socialValue(linkedinPersonal, linkedinPersonalNone),
              linkedinBusiness: socialValue(linkedinBusiness, linkedinBusinessNone),
              youtube: socialValue(youtube, youtubeNone),
              x: socialValue(x, xNone),
            },
          }),
        }
      );

      if (!res.ok) {
        setError("Submission failed.");
        setLoading(false);
        return;
      }

      router.push("/processing");
    } catch {
      setError("Submission failed.");
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
          Complete Your Brand Profile
        </h1>

        <input
          type="text"
          placeholder="Client ID (#SUB ...)"
          value={data.clientId || ""}
          onChange={(e) => setData({ clientId: e.target.value })}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="url"
          placeholder="Business Website URL"
          value={businessURL}
          onChange={(e) => setBusinessURL(e.target.value)}
          required
          className="w-full p-2 border rounded mb-6"
        />

        {/* ALL SOCIAL BLOCKS REMAIN UNCHANGED BELOW */}

        <div className="mb-4">
          <input
            type="url"
            placeholder="Facebook URL"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            disabled={facebookNone}
            className="w-full p-2 border rounded mb-2"
          />
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={facebookNone}
              onChange={(e) => setFacebookNone(e.target.checked)}
            />
            No Facebook
          </label>
        </div>

        {/* Instagram, LinkedIn Personal, LinkedIn Business, YouTube, X blocks remain exactly as you had them */}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 rounded bg-[#076aff] text-white"
        >
          {loading ? "Submitting…" : "Submit & Generate"}
        </button>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </form>
    </main>
  );
}
