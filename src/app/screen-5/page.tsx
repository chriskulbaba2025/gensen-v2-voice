// src/app/screen-5/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '@/context/FormContext';
import ProgressBar from '@/components/ProgressBar';
import { useState, useEffect } from 'react';

const PRESETS = [
  'Friendly & Approachable',
  'Bold & Confident',
  'Warm & Empathetic',
  'Professional & Direct',
];

export default function Step5() {
  const router = useRouter();
  const { data, setData } = useForm();
  const [selection, setSelection] = useState(
    PRESETS.includes(data.tagline) ? data.tagline : 'custom'
  );
  const [customTagline, setCustomTagline] = useState(
    PRESETS.includes(data.tagline) ? '' : data.tagline
  );

  // preload if returning
  useEffect(() => {
    if (PRESETS.includes(data.tagline)) {
      setSelection(data.tagline);
      setCustomTagline('');
    } else {
      setSelection('custom');
      setCustomTagline(data.tagline);
    }
  }, [data]);

  const handleBack = () => router.back();
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTagline =
      selection === 'custom' ? customTagline.trim() : selection;
    if (!finalTagline) {
      alert('Please choose or write a tagline.');
      return;
    }
    setData({ tagline: finalTagline });
    router.push('/screen-6');
  };

  return (
    <main className="min-h-screen flex flex-col px-4 pt-12">
      <ProgressBar step={5} total={8} />

      <form
        onSubmit={handleNext}
        className="bg-gray-50 p-8 rounded-lg shadow w-full max-w-md mx-auto space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">
          Step 5: Pick or Write Your Tone Tagline
        </h1>

        <fieldset className="space-y-4">
          {PRESETS.map(preset => (
            <label key={preset} className="flex items-center space-x-2">
              <input
                type="radio"
                name="tagline"
                value={preset}
                checked={selection === preset}
                onChange={() => setSelection(preset)}
                className="form-radio h-5 w-5 text-primary"
              />
              <span>{preset}</span>
            </label>
          ))}

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="tagline"
              value="custom"
              checked={selection === 'custom'}
              onChange={() => setSelection('custom')}
              className="form-radio h-5 w-5 text-primary"
            />
            <span>Custom tagline</span>
          </label>
        </fieldset>

        {selection === 'custom' && (
          <textarea
            rows={2}
            maxLength={60}
            value={customTagline}
            onChange={e => setCustomTagline(e.target.value)}
            placeholder="Enter your custom tagline…"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        )}

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
