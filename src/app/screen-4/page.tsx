"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FormContext";
import ProgressBar from "@/components/ProgressBar";

export default function Step4() {
  const router = useRouter();
  const { data } = useForm();

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const navigateWithFade = (path?: string, isBack?: boolean) => {
    setIsExiting(true);
    setTimeout(() => {
      if (isBack) {
        router.back();
      } else if (path) {
        router.push(path);
      }
    }, 500);
  };

  const handleBack = () => {
    navigateWithFade(undefined, true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit button clicked");

    if (!agreed) return;

    if (loading) {
      console.log("Submission already in progress");
      return;
    }

    setLoading(true);
    console.log("Submission started");

    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        business: data.business,
        url: data.url,
        facebook: data.facebook ?? "",
        instagram: data.instagram ?? "",
        linkedin: data.linkedin ?? "",
        youtube: data.youtube ?? "",
        icp: data.icp,
        audience: data.audience,
        brandStatement: data.brandStatement,
        brandCore: data.brandCore,
        sliderScores: data.sliderScores,
        topic: data.topic,
        writingSample: data.writingSample,
      };

      console.log("Payload to send:", payload);

      const res = await fetch("/api/brand-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Fetch response:", res);

      if (!res.ok) {
        console.log("Webhook failed with status:", res.status);
        throw new Error("Webhook failed");
      }

      const result = await res.json();
      console.log("Response from webhook:", result);

      if (result.reportUrl) {
        localStorage.setItem("reportUrl", result.reportUrl);
        console.log("Navigating to report:", result.reportUrl);
        navigateWithFade(`/report?url=${encodeURIComponent(result.reportUrl)}`);
      } else {
        console.log("No report URL, navigating to default report page");
        navigateWithFade("/report");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Submission failed. Try again.");
    } finally {
      console.log("Submission complete");
      setLoading(false);
    }
  };

  const renderToneSummary = () => {
    const s = data.sliderScores || {};
    return (
      <div className="bg-white p-4 rounded shadow-sm">
        <p className="font-medium mb-2 text-[#076aff]">
          Tone Calibration Summary
        </p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>Warmth ↔ Authority: <b>{s.warmthAuthority}</b></li>
          <li>Authority ↔ Energy: <b>{s.authorityEnergy}</b></li>
          <li>Warmth ↔ Energy: <b>{s.warmthEnergy}</b></li>
          <li>Clarity ↔ Creativity: <b>{s.clarityCreativity}</b></li>
          <li>Creativity ↔ Empathy: <b>{s.creativityEmpathy}</b></li>
          <li>Clarity ↔ Empathy: <b>{s.clarityEmpathy}</b></li>
          <li>Overall Tone Balance: <b>{s.overall}</b></li>
        </ul>
      </div>
    );
  };

  return (
    <main
      className={`min-h-screen flex flex-col px-4 pt-12 transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <ProgressBar step={4} total={4} />

      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-8 rounded-lg shadow w-full max-w-xl mx-auto space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">
          Step 4: Review & Consent
        </h1>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="font-medium">Full Name</p>
            <p className="mt-1 text-gray-700">
              {`${data.firstName || ""} ${data.lastName || ""}`.trim()}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <p className="font-medium">Email</p>
            <p className="mt-1 text-gray-700">{data.email}</p>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <p className="font-medium">Business</p>
            <p className="mt-1 text-gray-700">{data.business}</p>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <p className="font-medium">Website</p>
            <p className="mt-1 text-gray-700">{data.url}</p>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <p className="font-medium">Focus Topic</p>
            <p className="mt-1 text-gray-700">{data.topic}</p>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <p className="font-medium">Writing Sample</p>
            <p className="mt-1 text-gray-700 whitespace-pre-wrap">
              {data.writingSample || "(none provided)"}
            </p>
          </div>

          {renderToneSummary()}
        </div>

        <label className="flex items-start space-x-2 mt-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="form-checkbox h-5 w-5 text-[#076aff] mt-1"
            required
          />
          <span className="text-sm text-gray-700 leading-snug">
            I consent to receive emails and agree that my submitted information
            will be used to generate my brand voice according to
            Omnipressence’s privacy policy.
          </span>
        </label>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 rounded border border-[#076aff] bg-transparent text-[#076aff] hover:bg-[#076aff] hover:text-white transition-colors duration-300"
          >
            ← Back
          </button>

          <button
            type="submit"
            disabled={!agreed || loading}
            className={`px-6 py-2 rounded text-white font-medium transition-colors duration-300 ${
              !agreed || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#f66630] hover:bg-[#e6551a]"
            }`}
          >
            {loading ? "Generating…" : "Submit →"}
          </button>
        </div>
      </form>
    </main>
  );
}
