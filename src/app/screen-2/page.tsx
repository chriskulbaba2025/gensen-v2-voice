// src/app/screen-2/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '../../context/FormContext';
import ProgressBar from '../../components/ProgressBar';
import { useState, useEffect } from 'react';

export default function Step2() {
  const router = useRouter();
  const { data, setData } = useForm();
  const [message, setMessage] = useState(data.message);

  // initialize from context if returning
  useEffect(() => {
    setMessage(data.message);
  }, [data]);

  const handleBack = () => router.back();
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('Please enter your tight marketing message.');
      return;
    }
    setData({ message });
    router.push('/screen-3');
  };

  return (
    <main className="min-h-screen flex flex-col px-4 pt-12">
      <ProgressBar step={2} total={8} />

      <form
        onSubmit={handleNext}
        className="bg-gray-50 p-8 rounded-lg shadow w-full max-w-md mx-auto"
      >

        <h1 className="text-2xl font-bold mb-6 text-center">
          Step 2: Describe Your Brand in a Single Sentence
        </h1>

        <p className="mb-4">
          For <strong>{data.name}</strong> ({data.email})
        </p>

        <label className="block mb-6">
          <span className="font-medium">Message (max 280 chars)</span>
          <textarea
            rows={4}
            maxLength={280}
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-gray-500 mt-1">
            {message.length}/280 characters
          </p>
        </label>

        <div className="flex justify-between">
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
