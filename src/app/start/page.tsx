"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FormContext";

export default function StartPage() {
  const router = useRouter();
  const { setData } = useForm();

  const [firstName, setFirstName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

  const [linkedinPersonal, setLinkedinPersonal] = useState("");
  const [linkedinBusiness, setLinkedinBusiness] = useState("");

  const [youtube, setYoutube] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;

    setError("");
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      // CHECK USER
      const checkRes = await fetch("/api/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const checkData: { exists: boolean } = await checkRes.json();

      if (checkData.exists === true) {
        setData({
          firstName,
          email: cleanEmail,
        });

        router.push(`/existing-user?name=${encodeURIComponent(firstName)}`);
        return;
      }

      // NEW USER → store all fields
      setData({
        firstName,
        email: cleanEmail,
        business,
        url: website,
        facebook,
        instagram,
        linkedinPersonal,
        linkedinBusiness,
        youtube,
      });

      const payload = {
        firstName,
        email: cleanEmail,
        business,
        url: website,
        facebook,
        instagram,
        linkedinPersonal,
        linkedinBusiness,
        youtube,
      };

      const submitRes = await fetch(
        "https://primary-production-77e7.up.railway.app/webhook/submit-brand",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!submitRes.ok) {
        setError("Unable to submit your information. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/new-user");
    } catch (err) {
      console.error(err);
      setError("Submission failed. Please try again.");
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

        {/* Row 1: First Name + Business Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <span className="font-medium">First Name</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div>
            <span className="font-medium">Business Name</span>
            <input
              type="text"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Row 2: Email + Website */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <span className="font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div>
            <span className="font-medium">Website</span>
            <input
              type="url"
              value={website}
              placeholder="https://website.com"
              onChange={(e) => setWebsite(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Row 3: Facebook + Instagram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <span className="font-medium">Facebook</span>
            <input
              type="url"
              value={facebook}
              placeholder="https://facebook.com/profile"
              onChange={(e) => setFacebook(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div>
            <span className="font-medium">Instagram</span>
            <input
              type="url"
              value={instagram}
              placeholder="https://instagram.com/handle"
              onChange={(e) => setInstagram(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* NEW Row 4: LinkedIn Personal + LinkedIn Business */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <span className="font-medium">LinkedIn Personal</span>
            <input
              type="url"
              value={linkedinPersonal}
              placeholder="https://linkedin.com/in/username"
              onChange={(e) => setLinkedinPersonal(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div>
            <span className="font-medium">LinkedIn Business Page</span>
            <input
              type="url"
              value={linkedinBusiness}
              placeholder="https://linkedin.com/company/company-name"
              onChange={(e) => setLinkedinBusiness(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Row 5: YouTube (keeps layout aligned) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <span className="font-medium">YouTube</span>
            <input
              type="url"
              value={youtube}
              placeholder="https://youtube.com/@handle"
              onChange={(e) => setYoutube(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          {/* EMPTY COLUMN for alignment */}
          <div></div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 rounded bg-[#076aff] text-white hover:bg-[#002c71] transition"
        >
          {loading ? "Submitting…" : "Continue"}
        </button>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </form>
    </main>
  );
}
