// src/app/screen-4/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@/context/FormContext';
import ProgressBar from '@/components/ProgressBar';

export default function Step4() {
  const router = useRouter();
  const { data } = useForm();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBack = () => router.back();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);

    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        business: data.business,
        url: data.url,
        brandCore: data.brandCore,
        sliderScores: data.sliderScores, // ✅ includes tone data
        topic: data.topic,
        writingSample: data.writingSample,
      };

      console.log('OUTGOING DATA (screen-4):', payload);

      const res = await fetch('/api/brand-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Webhook failed');
      router.push('/report');
    } catch (err) {
      console.error(err);
      alert('Submission failed. Try again.');
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────
  // Helper: Tone summary display
  // ─────────────────────────────────────────────
  const renderToneSummary = () => {
    const s = data.sliderScores || {};
    return (
      <div className="bg-white p-4 rounded shadow-sm">
        <p className="font-medium mb-2 text-[#076aff]">Tone Calibration Summary</p>
        <ul className="space-y-1 text-gray-700 text-sm">
          <li>Warmth ↔ Authority: <b>{s.warmthAuthority ?? '-'}</b></li>
          <li>Authority ↔ Energy: <b>{s.authorityEnergy ?? '-'}</b></li>
          <li>Warmth ↔ Energy: <b>{s.warmthEnergy ?? '-'}</b></li>
          <li>Clarity ↔ Creativity: <b>{s.clarityCreativity ?? '-'}</b></li>
          <li>Creativity ↔ Empathy: <b>{s.creativityEmpathy ?? '-'}</b></li>
          <li>Clarity ↔ Empathy: <b>{s.clarityEmpathy ?? '-'}</b></li>
          <li>Overall Tone Balance: <b>{s.overall ?? '-'}</b></li>
        </ul>
      </div>
    );
  };

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <main className="min-h-screen flex flex-col px-4 pt-12">
      <ProgressBar step={4} total={4} />

      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-8 rounded-lg shadow w-full max-w-xl mx-auto space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">
          Step 4: Review & Consent
        </h1>

        <div className="space-y-4">
          {/* Personal and business info */}
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="font-medium">Full Name</p>
            <p className="mt-1 text-gray-700">
              {`${data.firstName || ''} ${data.lastName || ''}`.trim()}
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
              {data.writingSample || '(none provided)'}
            </p>
          </div>

          {/* ✅ Tone summary section */}
          {renderToneSummary()}
        </div>

        {/* Consent checkbox (required) */}
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
            will be used to generate my brand voice according to Omnipressence’s
            privacy policy.
          </span>
        </label>

        {/* Actions */}
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 rounded border border-gray-300 bg-white text-black hover:bg-[#076aff] hover:text-white transition-colors duration-200"
          >
            ← Back
          </button>

          <button
            type="submit"
            disabled={!agreed || loading}
            className={`px-6 py-2 rounded text-white font-medium ${
              !agreed || loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#f66630] hover:bg-[#e6551a]'
            } transition-colors duration-200`}
          >
            {loading ? 'Generating…' : 'Submit →'}
          </button>
        </div>
      </form>
    </main>
  );
}
