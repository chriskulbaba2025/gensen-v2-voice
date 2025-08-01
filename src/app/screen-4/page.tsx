'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '../../context/FormContext';
import ProgressBar from '../../components/ProgressBar';
import { useState, useEffect } from 'react';

const VALUES = [
  'Innovation',
  'Quality',
  'Trust',
  'Growth',
  'Creativity',
  'Reliability',
  'Expertise',
  'Customer-Focus',
];

export default function Step4() {
  const router = useRouter();
  const { data, setData } = useForm();
  // initialize with context or default 5
  const [brandValues, setBrandValues] = useState<Record<string, number>>(
    () =>
      VALUES.reduce((acc, key) => {
        acc[key] = data.brandValues?.[key] ?? 5;
        return acc;
      }, {} as Record<string, number>)
  );

  useEffect(() => {
    // sync when coming back
    setBrandValues(prev => {
      const copy = { ...prev };
      VALUES.forEach(key => {
        copy[key] = data.brandValues?.[key] ?? copy[key];
      });
      return copy;
    });
  }, [data]);

  const handleBack = () => router.back();
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setData({ brandValues });
    router.push('/screen-5');
  };

  return (
    <main className="min-h-screen flex flex-col px-4 pt-12">
      <ProgressBar step={4} total={8} />

      <form
        onSubmit={handleNext}
        className="bg-gray-50 p-8 rounded-lg shadow w-full max-w-lg mx-auto space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">
          Step 4: Prioritize Your Top Brand Qualities
        </h1>


        {VALUES.map(key => (
          <div key={key} className="flex flex-col">
            <label className="mb-1 font-medium">{key}: {brandValues[key]}</label>
            <input
              type="range"
              min={0}
              max={10}
              value={brandValues[key]}
              onChange={e =>
                setBrandValues(prev => ({
                  ...prev,
                  [key]: Number(e.target.value),
                }))
              }
              className="w-full"
            />
          </div>
        ))}

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
