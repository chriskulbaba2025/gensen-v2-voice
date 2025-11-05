'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '../../context/FormContext';
import { useState } from 'react';
import ProgressBar from '@/components/ProgressBar';

export default function Step3() {
  const router = useRouter();
  const { data, setData } = useForm();

  const [contentFocus, setContentFocus] = useState(data.topic || '');
  const [writingSample, setWritingSample] = useState(data.writingSample || '');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    setData({
      ...data,
      topic: contentFocus,
      writingSample,
    });

    router.push('/screen-4');
  };

  const handleBack = () => router.back();

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-12 mb-20">
      <ProgressBar step={3} total={4} />

      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 3: Define Your Focus and Share a Sample
      </h1>

      <p className="text-gray-600 text-center max-w-2xl mb-10 leading-relaxed">
        Your brand voice is now mapped by tone and clarity.
        This step helps the system understand how your message reads in real context.
        You can provide a short paragraph, a blog excerpt, or an email that captures your natural tone.
      </p>

      {/* Content Focus */}
      <section className="bg-gray-50 border rounded-lg p-6 shadow-sm w-full max-w-3xl mb-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Content Focus <span className="text-red-500">*</span>
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          What subject or goal should your voice emphasize? Keep it short and focused.
        </p>
        <textarea
          rows={2}
          value={contentFocus}
          onChange={(e) => setContentFocus(e.target.value)}
          placeholder="E.g. Helping local teams grow through clear communication."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#076aff]"
          required
        />
      </section>

      {/* Writing Sample */}
      <section className="bg-gray-50 border rounded-lg p-6 shadow-sm w-full max-w-3xl mb-10">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Writing Sample (optional)</h2>
        <p className="text-sm text-gray-600 mb-3">
          Provide a short excerpt, email, or note that represents your typical writing style.
        </p>
        <textarea
          rows={6}
          value={writingSample}
          onChange={(e) => setWritingSample(e.target.value)}
          placeholder="Paste your writing sample here..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#076aff]"
        />
      </section>

      <div className="flex justify-between w-full max-w-3xl">
  <button
    onClick={handleBack}
    className="px-6 py-2 rounded border border-[#076aff] bg-transparent text-[#076aff] hover:bg-[#076aff] hover:text-[#ffffff] transition-colors duration-300"
  >
    ← Back
  </button>
  <button
    type="submit"
    onClick={handleNext}
    className="px-6 py-2 rounded border border-[#076aff] bg-transparent text-[#076aff] hover:bg-[#076aff] hover:text-[#ffffff] transition-colors duration-300"
  >
    Next →
  </button>
</div>

    </main>
  );
}
