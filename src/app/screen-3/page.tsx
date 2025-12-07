'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@/context/FormContext';
import ProgressBar from '@/components/ProgressBar';

export default function Step3() {
  const router = useRouter();
  const { data, setData } = useForm();

  const [contentFocus, setContentFocus] = useState(data.topic || '');
  const [writingSample, setWritingSample] = useState(data.writingSample || '');
  const [loading, setLoading] = useState(true);

  // ───────────────────────────────────────────────
  // 1. AUTO-LOAD Topic from Airtable using CleanEmail
  // ───────────────────────────────────────────────
  useEffect(() => {
    async function loadTopic() {
      try {
        const res = await fetch('/api/get-brand-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email }),
        });

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const json = await res.json();

        if (json.topic) {
          setContentFocus(json.topic);
          setData({ topic: json.topic });
        }
      } catch (err) {
        console.error('Topic fetch failed:', err);
      } finally {
        setLoading(false);
      }
    }

    loadTopic();
  }, [data.email, setData]);

  // ───────────────────────────────────────────────
  // 2. NEXT
  // ───────────────────────────────────────────────
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    setData({
      topic: contentFocus,
      writingSample: writingSample,
    });

    router.push('/screen-4');
  };

  const handleBack = () => router.back();

  // ───────────────────────────────────────────────
  // 3. LOADING STATE
  // ───────────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your Topic…
      </main>
    );
  }

  // ───────────────────────────────────────────────
  // 4. UI
  // ───────────────────────────────────────────────
  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-12 mb-20">
      <ProgressBar step={3} total={4} />

      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 3: Define Your Focus and Share a Sample
      </h1>

      <p className="text-gray-600 text-center max-w-2xl mb-10 leading-relaxed">
        GENSEN reads how you write and what your brand prioritizes.
        We’ve auto-filled your Topic based on your onboarding data.
      </p>

      <section className="bg-gray-50 border rounded-lg p-6 shadow-sm w-full max-w-3xl mb-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Content Focus <span className="text-red-500">*</span>
        </h2>
        <textarea
          rows={2}
          value={contentFocus}
          onChange={(e) => setContentFocus(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#076aff]"
          required
        />
      </section>

      <section className="bg-gray-50 border rounded-lg p-6 shadow-sm w-full max-w-3xl mb-10">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Writing Sample (optional)
        </h2>
        <textarea
          rows={6}
          value={writingSample}
          onChange={(e) => setWritingSample(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#076aff]"
        />
      </section>

      <div className="flex justify-between w-full max-w-3xl">
        <button
          type="button"
          onClick={handleBack}
          className="px-6 py-2 rounded border border-[#076aff] text-[#076aff] hover:bg-[#076aff] hover:text-white transition-colors"
        >
          ← Back
        </button>

        <button
          type="submit"
          onClick={handleNext}
          className="px-6 py-2 rounded border border-[#076aff] text-[#076aff] hover:bg-[#076aff] hover:text-white transition-colors"
        >
          Next →
        </button>
      </div>
    </main>
  );
}
