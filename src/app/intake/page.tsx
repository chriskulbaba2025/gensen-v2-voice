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

    // ✅ ONLY CHANGE: persist these into FormContext before navigating away
    setData({
      business: businessName,
      url: businessURL,
      facebook,
      instagram,
      linkedinPersonal,
      linkedinBusiness,
      youtube,
      // x is not part of your FormData type; do not add it here unless you add it to FormData
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
              linkedinPersonal: socialValue(
                linkedinPersonal,
                linkedinPersonalNone
              ),
              linkedinBusiness: socialValue(
                linkedinBusiness,
                linkedinBusinessNone
              ),
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

        <div className="mb-4">
          <input
            type="url"
            placeholder="Instagram URL"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            disabled={instagramNone}
            className="w-full p-2 border rounded mb-2"
          />
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={instagramNone}
              onChange={(e) => setInstagramNone(e.target.checked)}
            />
            No Instagram
          </label>
        </div>

        <div className="mb-4">
          <input
            type="url"
            placeholder="LinkedIn Personal URL"
            value={linkedinPersonal}
            onChange={(e) => setLinkedinPersonal(e.target.value)}
            disabled={linkedinPersonalNone}
            className="w-full p-2 border rounded mb-2"
          />
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={linkedinPersonalNone}
              onChange={(e) => setLinkedinPersonalNone(e.target.checked)}
            />
            No LinkedIn Personal
          </label>
        </div>

        <div className="mb-4">
          <input
            type="url"
            placeholder="LinkedIn Business URL"
            value={linkedinBusiness}
            onChange={(e) => setLinkedinBusiness(e.target.value)}
            disabled={linkedinBusinessNone}
            className="w-full p-2 border rounded mb-2"
          />
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={linkedinBusinessNone}
              onChange={(e) => setLinkedinBusinessNone(e.target.checked)}
            />
            No LinkedIn Business
          </label>
        </div>

        <div className="mb-4">
          <input
            type="url"
            placeholder="YouTube URL"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            disabled={youtubeNone}
            className="w-full p-2 border rounded mb-2"
          />
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={youtubeNone}
              onChange={(e) => setYoutubeNone(e.target.checked)}
            />
            No YouTube
          </label>
        </div>

        <div className="mb-6">
          <input
            type="url"
            placeholder="X (Twitter) URL"
            value={x}
            onChange={(e) => setX(e.target.value)}
            disabled={xNone}
            className="w-full p-2 border rounded mb-2"
          />
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={xNone}
              onChange={(e) => setXNone(e.target.checked)}
            />
            No X
          </label>
        </div>

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
