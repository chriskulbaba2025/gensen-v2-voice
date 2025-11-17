'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from '@/context/FormContext';

export default function NewUserPage() {
  const { data, setData } = useForm();
  const [seconds, setSeconds] = useState(240);
  const [stage, setStage] = useState<'loading' | 'complete'>('loading');

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  // -------------------------------------------------------
  // Countdown Timer
  // -------------------------------------------------------
  useEffect(() => {
    if (stage !== 'loading' || seconds <= 0) return;
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds, stage]);

  // -------------------------------------------------------
  // Poll n8n for HTML report
  // -------------------------------------------------------
  useEffect(() => {
    if (!data?.email) return;

    let poll: NodeJS.Timeout;

    const startPolling = setTimeout(() => {
      poll = setInterval(async () => {
        try {
          const res = await fetch(
            `/api/report-latest?email=${encodeURIComponent(data.email)}&meta=1`,
            { cache: 'no-store' }
          );

          if (!res.ok) return;

          const record = await res.json();

          if (record.htmlContent) {
            setWelcomeMessage(record.welcomeMessage || '');
            setHtmlContent(record.htmlContent || '');

            setData({
              ...data,
              welcomeMessage: record.welcomeMessage || '',
              htmlContent: record.htmlContent || '',
            });

            setStage('complete');
            clearInterval(poll);
          }
        } catch {
          // ignore
        }
      }, 10000);
    }, 120000);

    return () => {
      clearInterval(poll);
      clearTimeout(startPolling);
    };
  }, [data, setData]); // eslint satisfied

  // -------------------------------------------------------
  // Countdown display
  // -------------------------------------------------------
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gray-50 transition-all duration-700 relative overflow-hidden">

      {/* LOADING STAGE */}
      <div
        className={`transition-opacity duration-[1500ms] ease-in-out ${
          stage === 'complete' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } flex flex-col items-center`}
      >
        <Image
          src="https://omnipressence.com/wp-content/uploads/2025/09/Gensen-Logo-Final-version-lower-case-logo-and-spaces1-356x295-1.webp"
          alt="GENSEN logo"
          width={220}
          height={180}
          className="rounded-[20px] mb-8"
          priority
        />

        <div className="flex flex-col items-center max-w-xl transition-opacity duration-1000">
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
            storytelling. Give us a few minutes while we analyze your current digital presence.
          </p>

          <p className="text-gray-400 text-xs mt-1">
            Estimated completion ≈ 4 minutes · Page updates automatically
          </p>
        </div>
      </div>

      {/* COMPLETE STAGE */}
      <div
        className={`flex flex-col items-center justify-start text-center px-[40px] py-[80px] transition-opacity duration-[1500ms] ease-in-out ${
          stage === 'complete' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >

        <Image
          src="https://omnipressence.com/wp-content/uploads/2025/09/Gensen-Logo-Final-version-lower-case-logo-and-spaces1-356x295-1.webp"
          alt="GENSEN logo"
          width={220}
          height={180}
          className="w-[180px] mb-[20px] rounded-[20px]"
        />

        {welcomeMessage && (
          <p className="text-gray-700 mb-6 max-w-[700px] whitespace-pre-line leading-relaxed text-left">
            {welcomeMessage}
          </p>
        )}

        {htmlContent && (
          <div
            className="bg-white border border-[#e0e6f5] rounded-[12px] shadow-soft p-[24px] mb-[40px] max-w-[760px] text-left"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}

        <Link
          href="/screen-2"
          className="mt-6 inline-block px-8 py-3 rounded-[10px] border border-[#076aff] text-[#076aff] bg-transparent hover:bg-[#076aff] hover:text-white transition-colors duration-300"
        >
          Continue to Step 2 →
        </Link>
      </div>

      <footer className="my-[50px] text-gray-500 italic text-sm text-center">
        Consistency builds credibility — and credibility builds connection.
      </footer>

      <style jsx global>{`
        @keyframes spinReverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-spin-reverse-slower {
          animation: spinReverse 5s linear infinite;
        }
      `}</style>
    </main>
  );
}
