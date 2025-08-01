'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@/context/FormContext';
import ProgressBar from '@/components/ProgressBar';

export default function Step7() {
  const router = useRouter();
  const { data, setData } = useForm();
  const [topic, setTopic] = useState<string>(data.topic);

  // preload existing value if any
  useEffect(() => {
    setTopic(data.topic);
  }, [data]);

  const handleBack = () => {
    router.back();
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      alert('Please define your content focus.');
      return;
    }
    setData({ topic });
    router.push('/screen-8');
  };

  return (
    <main className="min-h-screen flex flex-col px-4 pt-12">
      <ProgressBar step={7} total={8} />

      <form
        onSubmit={handleNext}
        className="bg-gray-50 p-8 rounded-lg shadow w-full max-w-md mx-auto space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">
          Step 7: Define Your Content Focus
        </h1>

        <p className="text-gray-700 text-sm mb-4">
          What’s the specific angle or subject you want your brand voice to tackle?
          Keep it under 120 characters so our GENSENOLOGY™ engine delivers spot-on copy.
        </p>

        <textarea
          rows={3}
          maxLength={120}
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="E.g. “Boost small-biz growth with AI-driven email strategies.”"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-gray-500">{topic.length}/120 characters</p>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handleBack}
            className="
              px-6 py-2 rounded border border-gray-300
              bg-white text-black
              hover:bg-[#076aff] hover:text-white
              transition-colors duration-200
            "
          >
            ← Back
          </button>
          <button
            type="submit"
            className="
              px-6 py-2 rounded border border-gray-300
              bg-white text-black
              hover:bg-[#f66630] hover:text-white
              transition-colors duration-200
            "
          >
            Next →
          </button>
        </div>
      </form>
    </main>
  );
}
