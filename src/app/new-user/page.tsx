'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from '@/context/FormContext';

export default function NewUserPage() {
  const router = useRouter();
  const { data } = useForm();

  const [seconds, setSeconds] = useState(240);
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState<'in' | 'out'>('in');
  const [statsFade, setStatsFade] = useState<'in' | 'out'>('in');
  const [showStats, setShowStats] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (!loading || seconds <= 0) return;
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds, loading]);

  // Webhook trigger + redirect
  useEffect(() => {
    const startFlow = async () => {
      try {
        const res = await fetch('/api/new-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            business: data.business,
            url: data.url,
          }),
        });

        const result = await res.json();
        console.log('[NEW USER RESULT]', result);

        // ✅ If webhook completed successfully, redirect to portal dashboard
        if (result.status === 'exists') {
          alert('You already have a brand voice.');
          return;
        }
        
        if (result.status === 'created') {
          router.push('https://voice.omnipressence.com/generate/screen-2');
          return;
        }
        

        // Otherwise, show generic error and stop timer
        setLoading(false);
        console.error('Webhook did not return expected success format:', result);
      } catch (err) {
        console.error('Error running flow:', err);
        setLoading(false);
      }
    };

    startFlow();
  }, [data, router]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowStats(true), 600);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // ──────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gray-50 transition-all duration-700">
      <Image
        src="https://omnipressence.com/wp-content/uploads/2025/09/Gensen-Logo-Final-version-lower-case-logo-and-spaces1-356x295-1.webp"
        alt="GENSEN logo"
        width={220}
        height={180}
        className="rounded-[20px] mb-8"
      />

      {loading && (
        <div
          className={`flex flex-col items-center max-w-xl transition-opacity duration-1000 ${
            fading === 'out' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-4 border-gray-300 border-t-[#076aff] rounded-full animate-spin-slow"></div>
            <div className="absolute inset-1 border-4 border-gray-200 border-b-[#40a9ff] rounded-full animate-spin-reverse-slower"></div>
            <div className="absolute inset-0 flex items-center justify-center font-mono text-[#076aff] text-lg font-semibold">
              {minutes}:{remainingSeconds.toString().padStart(2, '0')}
            </div>
          </div>

          <h1 className="text-2xl font-semibold mb-3">
            Mapping Your Voice Before Amplifying It…
          </h1>

          <p className="text-gray-600 max-w-lg mb-4 leading-relaxed">
            You can’t microwave maturity — and you can’t rush meaningful
            storytelling. Give us a few minutes while we analyze how your brand
            already speaks across your digital footprint.
          </p>

          <p className="text-gray-400 text-xs mt-1">
            Estimated completion ≈ 4 minutes · Page updates automatically
          </p>

          {showStats && (
            <div
              className={`transition-opacity duration-700 ${
                statsFade === 'out' ? 'opacity-0' : 'opacity-100'
              } mt-8`}
            >
              <div className="bg-white shadow-lg rounded-2xl border border-[#076aff] p-8 text-left w-[120%] max-w-2xl relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#076aff]/15 before:to-transparent">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Why consistency matters in 2025 and beyond
                </h2>
                <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                  <li>
                    • Brands publishing content <b>weekly</b> see <b>2.5× more
                    organic traffic</b> than monthly posters. <em>(HubSpot 2025)</em>
                  </li>
                  <li>
                    • Consistent brand voice increases revenue by up to <b>33%</b>{' '}
                    across channels. <em>(Lucidpress 2024)</em>
                  </li>
                  <li>
                    • Steady publishing cadence makes brands <b>3× more trusted and
                    memorable</b>. <em>(CMI 2025)</em>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && (
        <div className="text-center mt-8 text-gray-600">
          Something went wrong. Please try again later.
        </div>
      )}

      <footer className="mt-12 text-gray-500 italic text-sm text-center">
        Consistency builds credibility — and credibility builds connection.
      </footer>
    </main>
  );
}

/* Tailwind custom animations */
<style jsx global>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-spin-slow {
    animation: spin 3s linear infinite;
  }
  .animate-spin-reverse-slower {
    animation: spinReverse 5s linear infinite;
  }
  @keyframes spinReverse {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
`}</style>
