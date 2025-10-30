'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ReportPage() {
  // 4-minute countdown
  const totalSeconds = 4 * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [html, setHtml] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    // Timer countdown display
    const timer = setInterval(() => setTimeLeft(t => (t > 0 ? t - 1 : 0)), 1000);

    // Poll every 10 seconds until report is ready
    async function checkReport() {
      try {
        const res = await fetch('/api/report-latest');
        if (res.ok) {
          const text = await res.text();
          // Detect finished HTML
          if (text.includes('<!DOCTYPE html>')) {
            setHtml(text);
            setStatus('done');
            clearInterval(timer);
            clearInterval(poll);
          }
        }
      } catch {
        // ignore transient errors
      }
    }

    const poll = setInterval(checkReport, 10000); // 10-second polling interval
    return () => {
      clearInterval(timer);
      clearInterval(poll);
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="relative min-h-screen bg-[#f5f8ff] text-[#0a0a0a] font-raleway flex flex-col items-center px-[40px] py-[60px] overflow-hidden">

      {/* ───────── LOADING SECTION ───────── */}
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          status === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } relative flex flex-col items-center justify-start`}
      >
        {/* TIMER */}
        <div className="relative w-[160px] h-[160px] flex items-center justify-center mb-[40px] mt-[40px]">
          <div className="absolute inset-0 rounded-full border-[8px] border-[#076aff] border-t-transparent animate-spin-slow"></div>
          <div className="absolute inset-[12px] rounded-full border-[8px] border-[#c7d8ff] border-b-transparent animate-spin-reverse-slower"></div>
          <div className="absolute text-center text-[#002c71] font-semibold text-[28px]">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>

        {/* STATIC PLACEHOLDER */}
        <div className="max-w-[750px] bg-white shadow-soft rounded-[15px] px-[32px] py-[40px] border border-[#e0e6f5] leading-relaxed text-[17px] text-[#0b1320]">
          <h1 className="text-[32px] font-semibold text-[#002c71] mb-[20px] text-center">
            Your Brand Voice — Powered by Gensenology
          </h1>
          <p className="mb-[18px] text-center">
            Your Brand Voice is not a manual to memorize. It is momentum in written form.
            You built it once through <strong>Gensen</strong>, and now it drives every message you share.
            Fast. Consistent. Unmistakably yours.
          </p>
          <p className="mt-[40px] text-[18px] text-[#002c71] text-center">
            ⏱ Average creation time: <strong>3 – 4 minutes</strong> to generate your personalized Brand Voice report.
          </p>
        </div>
      </div>

      {/* ───────── RESULT SECTION ───────── */}
      {status === 'done' && html && (
        <div
          className="opacity-0 animate-fade-in absolute top-0 left-0 right-0 bg-[#f5f8ff] text-[#0a0a0a] px-[20px] py-[60px] font-raleway flex flex-col items-center min-h-screen z-50"
          style={{ animation: 'fadeIn 1s forwards' }}
        >
          <Image
            src="https://omnipressence.com/wp-content/uploads/2025/09/Omnipressence_LOGO-Email.webp"
            alt="Gensen Logo"
            width={250}
            height={100}
            className="rounded-[15px] object-contain mb-[30px]"
          />
          <div className="bg-white rounded-[15px] shadow-md p-[20px] max-w-[950px] w-full border border-[#e0e6f5] mt-[20px]">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      )}
    </div>
  );
}
