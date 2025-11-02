'use client';

import { useEffect, useState } from 'react';

export default function ReportPage() {
  // 4-minute countdown
  const totalSeconds = 4 * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [html, setHtml] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    // countdown timer
    const timer = setInterval(() => setTimeLeft(t => (t > 0 ? t - 1 : 0)), 1000);

    async function checkReport() {
      try {
        const res = await fetch('/api/report-latest');
        if (res.ok) {
          const text = await res.text();
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

    // wait 2 minutes before starting to poll
    let poll: NodeJS.Timeout;
    const startPolling = setTimeout(() => {
      poll = setInterval(checkReport, 10000); // poll every 10 s
    }, 120000); // 2 minutes

    return () => {
      clearInterval(timer);
      clearInterval(poll);
      clearTimeout(startPolling);
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
            Your GENSEN Brand Voice Is Now Being Blended
          </h1>

          <p className="mb-[16px]">
            Gensen is synthesizing everything it knows about your brand - the data gathered from your social channels,
            your submitted inputs, and your writing tone - to produce a unified voice framework. This isn’t a new voice;
            it’s the clarified version of the one your audience already recognizes.
          </p>

          <p className="mb-[16px]">
            While you wait, Gensen is aligning your existing communication patterns with its Brand Voice model -
            blending tone markers, phrasing preferences, and audience cues into a single adaptive system. It measures
            how authority, warmth, and clarity balance across your current posts, then refines that pattern to strengthen
            consistency in every message, caption, and campaign.
          </p>

          <p className="mb-[16px] text-[#002c71] font-medium text-center">
            Every adjustment helps your future content sound instantly on-brand - confident, human, and unmistakably you.
          </p>

          <p className="mb-[16px]">
            All processing happens securely within Gensen’s private environment. Your material is used only to model tone
            and rhythm - no external storage, no public indexing.
          </p>

          <p className="mb-[16px]">
            This step usually takes a few minutes. During that time, Gensen constructs your personalized Brand Voice
            guidelines - complete with tone anchors, linguistic filters, and practical examples that show how your brand
            should sound everywhere it speaks.
          </p>

          <p>
            When the process finishes, your <strong>GENSEN Brand Voice Report</strong> will appear here, ready to guide
            your next message with precision and confidence. When you want to review your report, it is always accessible on your dashboard.
          </p>
        </div>
      </div>

      {/* ───────── RESULT SECTION ───────── */}
      {status === 'done' && html && (
        <div
          className="opacity-0 animate-fade-in absolute top-0 left-0 right-0 bottom-0 bg-[#f5f8ff] text-[#0a0a0a] px-[20px] py-[60px] font-raleway flex flex-col items-center min-h-screen z-50 overflow-y-auto"
          style={{ animation: 'fadeIn 1s forwards' }}
        >
          <div className="bg-white rounded-[15px] shadow-md p-[20px] max-w-[950px] w-full border border-[#e0e6f5] mt-[20px] overflow-y-auto">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      )}
    </div>
  );
}
