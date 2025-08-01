'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '../../context/FormContext';
import ProgressBar from '../../components/ProgressBar';
import { useState, useEffect } from 'react';

export default function Step3() {
  const router = useRouter();
  const { data, setData } = useForm();
  const [persona, setPersona] = useState(data.persona || '');
  const [customAudience, setCustomAudience] = useState(data.customAudience || '');

  // preload if returning
  useEffect(() => {
    setPersona(data.persona);
    setCustomAudience(data.customAudience);
  }, [data]);

  const handleBack = () => router.back();
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!persona && !customAudience.trim()) {
      alert('Please select or describe your target audience.');
      return;
    }
    setData({ persona, customAudience });
    router.push('/screen-4');
  };

  return (
    <main className="min-h-screen flex flex-col px-4 pt-12">
      <ProgressBar step={3} total={8} />

      <form
        onSubmit={handleNext}
        className="bg-gray-50 p-8 rounded-lg shadow w-full max-w-md mx-auto"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Step 3: Who’s Your Target Audience?
        </h1>

        <label className="block mb-4">
          <span className="font-medium">Choose a Persona</span>
          <select
            value={persona}
            onChange={e => setPersona(e.target.value)}
            className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">— Select one —</option>
            <option value="small-biz">Small-Business Owners</option>
            <option value="tech-startup">Tech Startups</option>
            <option value="e-commerce">E-Commerce Brands</option>
            <option value="enterprise">Enterprise Teams</option>
          </select>
        </label>

        <label className="block mb-6">
          <span className="font-medium">Or Describe Your Audience</span>
          <textarea
            rows={3}
            value={customAudience}
            onChange={e => setCustomAudience(e.target.value)}
            className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="E.g. “Marketing managers in retail with 5+ years’ experience…”"
          />
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
