'use client';

import { useEffect, useState } from 'react';
import { useForm } from '@/context/FormContext';

export default function ReportPage() {
  const { data } = useForm(); // data.email must be set on Page 1

  // 4-minute countdown
  const totalSeconds = 4 * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [html, setHtml] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    if (!data?.email) return; // wait until email exists

    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);

    async function checkReport() {
      try {
        const res = await fetch(`/api/report-latest?email=${encodeURIComponent(String(data.email))}`, {
          cache: 'no-store',
        });

        // 202 = pending; 404 = no record; 200 = html ready
        if (res.ok) {
          const text = await res.text();
          // crude but reliable readiness check for full HTML docs
          if (text.includes('<!DOCTYPE html') || text.includes('<html')) {
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

    // start polling after 2 minutes, every 10 seconds
    let poll: NodeJS.Timeout;
    const startPolling = setTimeout(() => {
      poll = setInterval(checkReport, 10000);
      checkReport(); // also fire once immediately
    }, 120000);

    return () => {
      clearInterval(timer);
      clearInterval(poll);
      clearTimeout(startPolling);
    };
  }, [data?.email]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="relative min-h-screen bg-[#f5f8ff] text-[#0a0a0a] font-raleway flex flex-col items-center px-[40px] py-[60px] overflow-hidden">

      {status === 'done' && html ? (
        <iframe
          title="GENSEN Report"
          srcDoc={html}
          className="w-full h-[90vh] max-w-[1100px] bg-white rounded-[12px] shadow-soft border border-[#e0e6f5]"
        />
      ) : (
        // LOADING SECTION + STAGE 1 MESSAGE
        <div className="transition-opacity duration-1000 ease-in-out opacity-100 relative flex flex-col items-center justify-start w-full">
          {/* TIMER */}
          <div className="relative w-[160px] h-[160px] flex items-center justify-center mb-[40px] mt-[40px]">
            <div className="absolute inset-0 rounded-full border-[8px] border-[#076aff] border-t-transparent animate-spin-slow"></div>
            <div className="absolute inset-[12px] rounded-full border-[8px] border-[#c7d8ff] border-b-transparent animate-spin-reverse-slower"></div>
            <div className="absolute text-center text-[#002c71] font-semibold text-[28px]">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
          </div>

          {/* STAGE 1 MESSAGE */}
          <div className="max-w-[750px] bg-white shadow-soft rounded-[15px] px-[32px] py-[40px] border border-[#e0e6f5] leading-relaxed text-[17px] text-[#0b1320]">
            <h1 className="text-[32px] font-semibold text-[#002c71] mb-[20px] text-center">
              Your GENSEN Brand Intelligence Report Is Now in Development
            </h1>

            <p className="mb-[16px]">
              Every brand has a voice long before it’s defined. It lives in your words, your visuals, your tone, and how people feel when they encounter your message. GENSEN is now mapping that voice—how it sounds, where it shows up, and what it’s saying about you.
            </p>

            <p className="mb-[16px]">
              We start by studying your digital footprint: your website, social channels, and other public content. From this, we uncover the patterns that reveal how your brand communicates—the rhythm of your sentences, the balance of warmth and authority, and the emotional texture behind your language.
            </p>

            <p className="mb-[16px]">
              Then, GENSEN moves beyond description to interpretation. We translate data into insight, identifying where your message already performs with strength and where clarity, tone, or positioning can open new ground.
            </p>

            <ul className="list-disc ml-[24px] mb-[16px] space-y-[8px]">
              <li>
                <strong>Brand Voice Analysis</strong> – A detailed reading of how your tone, structure, and phrasing express your core identity.
              </li>
              <li>
                <strong>Presence Mapping</strong> – A diagnostic view of your online ecosystem, measuring alignment and consistency across platforms.
              </li>
              <li>
                <strong>Opportunity Framework</strong> – Actionable insight showing how to extend reach, deepen resonance, and strengthen brand trust.
              </li>
            </ul>

            <p className="mb-[16px]">
              When complete, your report will appear here <strong>and will also be stored in your dashboard for ongoing access and future reference.</strong> It becomes the foundation for your next campaigns, your creative decisions, and every message your brand sends forward.
            </p>

            <p className="text-center italic text-gray-600">
              Please stay on this page while GENSEN finalizes your analysis. In a few moments, you’ll see a living blueprint of your communication system—one designed to help your brand sound, look, and perform at its absolute best.
            </p>
          </div>
        </div>
      )}

      {/* Tailwind custom animations */}
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
