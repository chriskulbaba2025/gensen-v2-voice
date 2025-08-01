'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@/context/FormContext';
import ProgressBar from '@/components/ProgressBar';

export default function Step7() {
  const router = useRouter();
  const { data, setData } = useForm();

  const [topic, setTopic] = useState<string>(data.topic);
  const [writingSample, setWritingSample] = useState<string>(data.writingSample);

  // preload existing values
  useEffect(() => {
    setTopic(data.topic);
    setWritingSample(data.writingSample);
  }, [data]);

  const handleBack = () => router.back();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      alert('Please define your content focus.');
      return;
    }
    setData({ topic, writingSample });
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
          Step 7: Define Your Content Focus & Share a Sample
        </h1>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Content Focus (required)
          </label>
          <p className="text-gray-600 text-sm mb-2">
            What’s the angle or subject you want your brand voice to tackle?
            Keep it under 120 characters.
          </p>
          <textarea
            rows={2}
            maxLength={120}
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="E.g. “Boost small-biz growth with AI-driven email strategies.”"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-gray-500">{topic.length}/120 chars</p>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Writing Sample (optional, up to ~1 000 words)
          </label>
          <p className="text-gray-600 text-sm mb-2">
            Paste up to 1 000 words of your own writing—our GENSENOLOGY™ engine
            will analyze tone & context.
          </p>
          <textarea
            rows={6}
            maxLength={6000}
            value={writingSample}
            onChange={e => setWritingSample(e.target.value)}
            placeholder="Paste a blog excerpt, email, or other writing sample here…"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-gray-500">
            {Math.ceil(writingSample.length / 5)} words (approx)
          </p>
        </div>

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
