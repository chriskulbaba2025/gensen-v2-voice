// src/app/screen-8/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@/context/FormContext';
import ProgressBar from '@/components/ProgressBar';

function ReviewItem({
  label,
  value,
  editLink,
}: {
  label: string;
  value: React.ReactNode;
  editLink: string;
}) {
  return (
    <div className="flex justify-between items-start bg-white p-4 rounded shadow-sm">
      <div className="max-w-[75%]">
        <p className="font-medium">{label}</p>
        <p className="mt-1 text-gray-700 whitespace-pre-wrap">{value}</p>
      </div>
      <a href={editLink} className="text-sm text-[#076aff] hover:underline">
        Edit
      </a>
    </div>
  );
}

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
      const res = await fetch('/api/voice-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
      <ProgressBar step={8} total={8} />

      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-8 rounded-lg shadow w-full max-w-xl mx-auto space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">
          Step 8: Review & Submit Your Brand Voice
        </h1>

        <div className="space-y-4">
          <ReviewItem label="Full Name" value={data.name} editLink="/" />
          <ReviewItem label="Email Address" value={data.email} editLink="/" />
          <ReviewItem
            label="Brand One-Liner"
            value={data.message}
            editLink="/screen-2"
          />
          <ReviewItem
            label="Target Audience"
            value={
              <>
                {data.persona}
                {data.customAudience && (
                  <>
                    <br />
                    “{data.customAudience}”
                  </>
                )}
              </>
            }
            editLink="/screen-3"
          />
          <ReviewItem
            label="Brand Values"
            value={Object.entries(data.brandValues)
              .map(([k, v]) => `${k}: ${v}`)
              .join(' · ')}
            editLink="/screen-4"
          />
          <ReviewItem
            label="Tagline"
            value={data.tagline}
            editLink="/screen-5"
          />
          <ReviewItem
            label="Voice Tone"
            value={data.voiceTone}
            editLink="/screen-6"
          />
          <ReviewItem
            label="Content Focus"
            value={data.topic}
            editLink="/screen-7"
          />
          <ReviewItem
            label="Writing Sample"
            value={
              data.writingSample.trim()
                ? data.writingSample
                : <em>(none provided)</em>
            }
            editLink="/screen-7"
          />
        </div>

        <label className="flex items-start space-x-2 mt-6">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="form-checkbox h-5 w-5 text-[#076aff]"
          />
          <span className="text-sm text-gray-700">
            I agree to receive emails and understand my data will be used to generate my brand voice.
          </span>
        </label>

        <button
          type="submit"
          disabled={!agreed || loading}
          className={`
            mt-4 w-full py-3 rounded text-white font-medium
            ${agreed ? 'bg-[#f66630] hover:bg-[#e6551a]' : 'bg-gray-300 cursor-not-allowed'}
            transition-colors duration-200
          `}
        >
          {loading ? 'Generating…' : 'Create My Brand Voice'}
        </button>
      </form>
    </main>
  );
}
