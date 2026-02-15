"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FormContext";
import Image from "next/image";

export default function IntakePage() {
  const router = useRouter();
  const { data, setData } = useForm();

  const [businessName, setBusinessName] = useState("");
  const [businessURL, setBusinessURL] = useState("");

  const [facebook, setFacebook] = useState("");
  const [facebookNone, setFacebookNone] = useState(false);

  const [instagram, setInstagram] = useState("");
  const [instagramNone, setInstagramNone] = useState(false);

  const [linkedinPersonal, setLinkedinPersonal] = useState("");
  const [linkedinPersonalNone, setLinkedinPersonalNone] = useState(false);

  const [linkedinBusiness, setLinkedinBusiness] = useState("");
  const [linkedinBusinessNone, setLinkedinBusinessNone] = useState(false);

  const [youtube, setYoutube] = useState("");
  const [youtubeNone, setYoutubeNone] = useState(false);

  const [x, setX] = useState("");
  const [xNone, setXNone] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    const normalizedSub = data.clientId.replace("#SUB", "").trim();
    const finalClientID = `sub#${normalizedSub}`;

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
            facebook: facebookNone ? "empty" : facebook || "empty",
            instagram: instagramNone ? "empty" : instagram || "empty",
            linkedinPersonal: linkedinPersonalNone
              ? "empty"
              : linkedinPersonal || "empty",
            linkedinBusiness: linkedinBusinessNone
              ? "empty"
              : linkedinBusiness || "empty",
            youtube: youtubeNone ? "empty" : youtube || "empty",
            x: xNone ? "empty" : x || "empty",
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
  };

  const socialField = (
    label: string,
    value: string,
    setValue: (v: string) => void,
    none: boolean,
    setNone: (v: boolean) => void
  ) => (
    <div className="mb-4">
      <input
        type="url"
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={none}
        className="w-full p-2 border rounded mb-2"
      />
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="radio"
          checked={none}
          onChange={() => setNone(true)}
        />
        No {label.replace(" URL", "")}
      </label>
    </div>
  );

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-[#f5f8ff]">
      <div className="relative w-60 h-20 mb-6">
        <Image
          src="/oplogo.webp"
          alt="Omnipressence Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

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
          className="w-full p-2 border rounded mb-4"
        />

        {socialField("Facebook URL", facebook, setFacebook, facebookNone, setFacebookNone)}
        {socialField("Instagram URL", instagram, setInstagram, instagramNone, setInstagramNone)}
        {socialField("LinkedIn Personal URL", linkedinPersonal, setLinkedinPersonal, linkedinPersonalNone, setLinkedinPersonalNone)}
        {socialField("LinkedIn Business URL", linkedinBusiness, setLinkedinBusiness, linkedinBusinessNone, setLinkedinBusinessNone)}
        {socialField("YouTube URL", youtube, setYoutube, youtubeNone, setYoutubeNone)}
        {socialField("X (Twitter) URL", x, setX, xNone, setXNone)}

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
