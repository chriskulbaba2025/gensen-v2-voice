"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FormContext";

export default function IntakePage() {
  const router = useRouter();
  const { data } = useForm();

  const [businessName, setBusinessName] = useState("");
  const [businessURL, setBusinessURL] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedinPersonal, setLinkedinPersonal] = useState("");
  const [linkedinBusiness, setLinkedinBusiness] = useState("");
  const [youtube, setYoutube] = useState("");
  const [x, setX] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://primary-production-77e7.up.railway.app/webhook/submit-brand",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            firstName: data.firstName,
            businessName,
            businessURL,
            social: {
              facebook,
              instagram,
              linkedinPersonal,
              linkedinBusiness,
              youtube,
              x
            }
          }),
        }
      );

      if (!res.ok) {
        setError("Submission failed.");
        return;
      }

      router.push("/processing");

    } catch {
      setError("Submission failed.");
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
          Complete Your Brand Profile
        </h1>

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

        <input type="url" placeholder="Facebook URL" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="w-full p-2 border rounded mb-4" />
        <input type="url" placeholder="Instagram URL" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full p-2 border rounded mb-4" />
        <input type="url" placeholder="LinkedIn Personal URL" value={linkedinPersonal} onChange={(e) => setLinkedinPersonal(e.target.value)} className="w-full p-2 border rounded mb-4" />
        <input type="url" placeholder="LinkedIn Business URL" value={linkedinBusiness} onChange={(e) => setLinkedinBusiness(e.target.value)} className="w-full p-2 border rounded mb-4" />
        <input type="url" placeholder="YouTube URL" value={youtube} onChange={(e) => setYoutube(e.target.value)} className="w-full p-2 border rounded mb-4" />
        <input type="url" placeholder="X (Twitter) URL" value={x} onChange={(e) => setX(e.target.value)} className="w-full p-2 border rounded mb-4" />

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
