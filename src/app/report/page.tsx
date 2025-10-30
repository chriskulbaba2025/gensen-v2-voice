'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ReportPage() {
  const totalSeconds = 20 * 60; // 20 minutes total
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [html, setHtml] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(t => (t > 0 ? t - 1 : 0)), 1000);

    // Simulated completion after 20 seconds
    const delay = setTimeout(() => {
      setHtml('<h1 style="color:#10284a;">Test Report</h1><p>Static preview working.</p>');
      setStatus('done');
      clearInterval(timer);
    }, 20000);

    return () => {
      clearInterval(timer);
      clearTimeout(delay);
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

        {/* BRAND VOICE CONTENT */}
        <div className="max-w-[750px] bg-white shadow-soft rounded-[15px] px-[32px] py-[40px] border border-[#e0e6f5] leading-relaxed text-[17px] text-[#0b1320]">
          <h1 className="text-[32px] font-semibold text-[#002c71] mb-[20px] text-center">
            Your Brand Voice — Powered by Gensenology
          </h1>

          <p className="mb-[18px]">
            Your Brand Voice isn’t a manual to memorize. It’s momentum in written form.
            You built it once through <strong>Gensen</strong>, and now it drives every message you share—fast,
            consistent, unmistakably yours.
          </p>

          <h2 className="text-[22px] font-semibold text-[#002c71] mt-[30px] mb-[10px]">Built Once → Used Everywhere</h2>
          <p className="mb-[16px]">
            Every blog, post, caption, or newsletter you create inside the <strong>Omnipressence ecosystem</strong> draws from the same calibrated tone.
            No re-training. No rewrites. Gensen remembers how you sound—confident but kind, expert but easy to read—and applies it automatically.
          </p>

          <h2 className="text-[22px] font-semibold text-[#002c71] mt-[30px] mb-[10px]">How It Works</h2>
          <p className="mb-[16px]">
            <strong>Gensenology</strong> blends human creativity with data precision. It studies your best language patterns and builds a living model that fuels all content:
          </p>
          <ul className="list-disc pl-[24px] mb-[16px]">
            <li>Short social posts that feel natural</li>
            <li>Articles that sound informed, not formal</li>
            <li>Emails and newsletters that connect</li>
            <li>UGC scripts that sound like real people</li>
          </ul>

          <h2 className="text-[22px] font-semibold text-[#002c71] mt-[30px] mb-[10px]">Why It Matters</h2>
          <p className="mb-[16px]">
            Consistency builds recognition. Recognition builds trust. Trust builds growth.
            When tone stays stable, people relax into your message instead of testing it. That’s how brands earn attention without buying it.
          </p>

          <h2 className="text-[22px] font-semibold text-[#002c71] mt-[30px] mb-[10px]">Where It Lives</h2>
          <p className="mb-[16px]">
            Inside the GENSEN platform: <strong>Voice Builder</strong> defines how you sound, <strong>Topical Map</strong> finds what to say,
            and <strong>Content Generator</strong> turns both into publish-ready assets. One login. One dataset. Endless aligned output.
          </p>

          <h2 className="text-[22px] font-semibold text-[#002c71] mt-[30px] mb-[10px]">Keep Using It</h2>
          <p className="mb-[16px]">
            You don’t need to adjust or update anything. Just create. Each campaign or post you launch keeps your voice steady, distinct, and alive.
          </p>

          <h2 className="text-[22px] font-semibold text-[#002c71] mt-[30px] mb-[10px]">Your Next Step</h2>
          <p>
            Keep moving forward. The more you use Gensen, the more fluent your brand becomes.
            Every post refines your reach. Every article expands your authority.
            Your voice isn’t a line in a document—it’s a living system built to grow with you.
          </p>
        </div>

        {/* REMINDER */}
        <p className="mt-[40px] text-[18px] text-[#002c71] text-center">
          ⏱ Average creation time: <strong>3 – 4 minutes</strong> to generate your personalized Brand Voice report.
        </p>
      </div>

      {/* ───────── RESULT SECTION ───────── */}
{status === 'done' && html && (
  <div
    className="opacity-0 animate-fade-in absolute top-0 left-0 right-0 bg-[#f5f8ff] text-[#0a0a0a] px-[20px] py-[60px] font-raleway flex flex-col items-center min-h-screen z-50"
    style={{ animation: 'fadeIn 1s forwards' }}
  >
    {/* Omnipressence / Gensen logo */}
    <Image
      src="https://omnipressence.com/wp-content/uploads/2025/09/Gensen-Logo-Final-version-lower-case-logo-and-spaces1-356x295-1.webp"
      alt="Gensen Logo"
      width={250}
      height={100}
      className="rounded-[15px] object-contain mb-[30px]"
    />

    {/* Report box pinned near top */}
    <div className="bg-white rounded-[15px] shadow-md p-[20px] max-w-[950px] w-full border border-[#e0e6f5] mt-[20px]">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  </div>
)}


    </div>
  );
}
