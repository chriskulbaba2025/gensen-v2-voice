'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@/context/FormContext';
import ProgressBar from '@/components/ProgressBar';

export default function Step8() {
  const router = useRouter();
  const { data } = useForm();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);

    try {
      // ✅ Clean, minimal payload for n8n
      const payload = {
        firstName: data.firstName,
        email: data.email,
        business: data.business,
        url: data.url,
        brandCore: data.brandCore,
        sliderScores: data.sliderScores,
        topic: data.topic,
        writingSample: data.writingSample,
      };

      console.log('OUTGOING DATA:', payload); // optional: see payload in console

      const res = await fetch('/api/brand-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Network response was not ok');
      router.push('/thank-you');
    } catch (err) {
      console.error(err);
      alert('Oops—something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col px-4 pt-12">
      <ProgressBar step={5} total={5} />

      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-8 rounded-lg shadow w-full max-w-xl mx-auto space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">
          Step 5: Review & Submit Your Brand Voice
        </h1>

        <div className="space-y-4">
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
        </div>
{/* Consent checkbox */}
<label className="flex items-start space-x-2 mt-6">
  <input
    type="checkbox"
    checked={agreed}
    onChange={(e) => setAgreed(e.target.checked)}
    className="form-checkbox h-5 w-5 text-[#076aff] mt-1"
    required
  />
  <span className="text-sm text-gray-700 leading-snug">
    I consent to receive emails and agree that my submitted information will be used to
    generate my brand voice according to Omnipressence’s privacy policy.
  </span>
</label>

{/* Submit button */}
<button
  type="submit"
  disabled={!agreed || loading}
  className={`mt-4 w-full py-3 rounded text-white font-medium ${
    agreed
      ? 'bg-[#f66630] hover:bg-[#e6551a]'
      : 'bg-gray-300 cursor-not-allowed'
  } transition-colors duration-200`}
>
  {loading ? 'Generating…' : 'Create My Brand Voice'}
  </button>
</form>
</main>
);
}
