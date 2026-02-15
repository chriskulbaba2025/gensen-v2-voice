'use client';

import { useEffect, useState } from 'react';

export default function ReportPage() {
  const [finalHtml, setFinalHtml] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const MAX_TIME = 5 * 60 * 1000; // 5 minutes
  const POLL_INTERVAL = 5000; // 5 seconds

  // TIMER (visual only)
  const totalSeconds = 4 * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  // TIMER EFFECT — runs once (safe)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // POLLING EFFECT — runs once (safe intentional behavior)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let cancelled = false;
    let elapsed = 0;

    async function poll() {
      if (cancelled) return;

      try {
        const res = await fetch('/api/report-complete', { cache: 'no-store' });
        if (!res.ok) return;

        const json = await res.json();

        if (json?.htmlContent && json.htmlContent.length > 20) {
          setFinalHtml(json.htmlContent);
          clearInterval(interval);
        }
      } catch {}

      elapsed += POLL_INTERVAL;

      if (elapsed >= MAX_TIME && !finalHtml) {
        setError(true);
        clearInterval(interval);
      }
    }

    const interval = setInterval(poll, POLL_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // FINAL REPORT READY
  if (finalHtml) {
    return (
      <div className="min-h-screen bg-[#f5f8ff] p-10 flex justify-center">
        <iframe
          title="GENSEN Report"
          srcDoc={finalHtml}
          className="w-full h-[90vh] max-w-[1100px] bg-white rounded-xl shadow-soft border border-[#e0e6f5]"
        />
      </div>
    );
  }

  // ERROR AFTER 5 MINUTES
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[#0b1320] px-6">
        <h2 className="text-[28px] font-semibold mb-4 text-[#002c71]">
          Your GENSEN Report Hit a Technical Delay
        </h2>

        <p className="text-[17px] text-center max-w-[600px] mb-4 text-gray-700">
          It looks like your report is taking longer than expected to generate, which
          means we’ve likely hit a technical issue on our side.
        </p>

        <p className="text-[17px] text-center max-w-[600px] mb-6 text-gray-700">
          Please connect with Brad Grant, Chief Client Officer, at{' '}
          <a href="mailto:brad@omnipressence.com" className="text-[#076aff] underline">
            brad@omnipressence.com
          </a>{' '}
          so we can investigate the issue and get you a fresh link quickly.
        </p>
      </div>
    );
  }

  // ORIGINAL FULL LOADING UI
  return (
    <div className="relative min-h-screen bg-[#f5f8ff] text-[#0a0a0a] font-raleway flex flex-col items-center px-10 py-[60px] overflow-hidden fade-in">

      {/* TIMER */}
      <div className="relative w-40 h-40 flex items-center justify-center mb-10 mt-10">
        <div className="absolute inset-0 rounded-full border-8 border-[#076aff] border-t-transparent animate-spin-slow"></div>
        <div className="absolute inset-3 rounded-full border-8 border-[#c7d8ff] border-b-transparent animate-spin-reverse-slower"></div>
        <div className="absolute text-center text-[#002c71] font-semibold text-[28px]">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>

      {/* LOADING MESSAGE */}
      <div className="bg-white shadow-soft rounded-[15px] px-8 py-10 border border-[#e0e6f5] leading-relaxed text-[17px] text-[#0b1320] max-w-[750px]">
        <h1 className="text-[32px] font-semibold text-[#002c71] mb-5 text-center">
          Your GENSEN Brand Intelligence Report Is Now in Development
        </h1>

        <p className="mb-4">
          Every brand has a voice long before it’s defined. GENSEN is mapping how your
          communication patterns form trust, tone, and perception.
        </p>

        <p className="mb-4">
          We analyze your website and social presence to extract language, positioning,
          and emotional cues.
        </p>

        <p className="mb-4">
          Your full Brand Intelligence Report will appear here automatically.
        </p>

        <p className="text-center italic text-gray-600">
          Please remain on this page while the system completes your analysis.
        </p>
      </div>

      <style jsx global>{`
        .fade-in { animation: fadeIn 0.8s ease-in forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spinReverse { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        .animate-spin-reverse-slower { animation: spinReverse 5s linear infinite; }
      `}</style>
    </div>
  );
}
