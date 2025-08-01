// src/app/screen-6/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '@/context/FormContext';
import ProgressBar from '@/components/ProgressBar';
import { useState, useEffect } from 'react';

const TONES = [
  {
    key: 'neutral',
    label: 'Neutral / Conversational',
    example: 'Welcome to GENSEN. Powered by GENSENOLOGY™, we blend precision and creativity to elevate your brand story.'
  },
  {
    key: 'friendly',
    label: 'Friendly & Approachable',
    example: 'Hey there, friend! At GENSEN our GENSENOLOGY™ engine is fired up and ready to help you discover the perfect voice that truly feels like you.'
  },
  {
    key: 'professional',
    label: 'Formal & Professional',
    example: 'Welcome to GENSEN. Leveraging GENSENOLOGY™, we craft sophisticated, results-driven messaging you can trust to move the needle.'
  },
  {
    key: 'authoritative',
    label: 'Bold & Authoritative',
    example: 'Welcome to GENSEN—backed by GENSENOLOGY™—where we set the standard in innovation so you can lead your industry with unshakable confidence.'
  },
  {
    key: 'playful',
    label: 'Playful & Fun',
    example: 'Hello! GENSEN and our GENSENOLOGY™ toolkit make shaping your brand voice as delightful as riffing ideas with your best friend over coffee.'
  },
  {
    key: 'witty',
    label: 'Witty & Humorous',
    example: 'Welcome to GENSEN, powered by the clever minds at GENSENOLOGY™. We mix sharp insights with a dash of humor to ensure your brand leaves a lasting smile.'
  },
  {
    key: 'custom',
    label: 'Custom Tone…',
    example: ''
  },
];

export default function Step6() {
  const router = useRouter();
  const { data, setData } = useForm();
  const [selection, setSelection] = useState<string>(data.voiceTone);
  const [customTone, setCustomTone] = useState<string>('');

  useEffect(() => {
    if (TONES.some(t => t.key === data.voiceTone)) {
      setSelection(data.voiceTone);
      setCustomTone('');
    } else {
      setSelection('custom');
      setCustomTone(data.voiceTone);
    }
  }, [data]);

  const handleBack = () => router.back();
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const tone = selection === 'custom' ? customTone.trim() : selection;
    if (!tone) {
      alert('Please select or enter a tone.');
      return;
    }
    setData({ voiceTone: tone });
    router.push('/screen-7');
  };

  return (
    <main className="min-h-screen flex flex-col px-4 pt-12">
      <ProgressBar step={6} total={8} />

      <form
        onSubmit={handleNext}
        className="bg-gray-50 p-8 rounded-lg shadow w-full max-w-md mx-auto space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">
          Step 6: Choose Your Voice Tone
        </h1>

        <div className="grid gap-4">
          {TONES.map(({ key, label, example }) => (
            <div key={key}>
              <label
                className={`
                  flex items-center p-3 border rounded cursor-pointer
                  ${selection === key
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-300 bg-white'}
                  transition-colors duration-200
                `}
              >
                <input
                  type="radio"
                  name="voiceTone"
                  value={key}
                  checked={selection === key}
                  onChange={() => setSelection(key)}
                  className="form-radio h-5 w-5 text-primary mr-3"
                />
                <span>{label}</span>
              </label>

              {selection === key && key !== 'custom' && (
                <div className="mt-2 p-3 bg-white border-l-4 border-primary rounded shadow-sm text-gray-700">
                  <em>Example:</em> {example}
                </div>
              )}
            </div>
          ))}

          {selection === 'custom' && (
            <input
              type="text"
              placeholder="Describe your custom tone…"
              value={customTone}
              onChange={e => setCustomTone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          )}
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
