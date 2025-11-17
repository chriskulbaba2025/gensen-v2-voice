'use client';

import { useEffect, useState } from 'react';
import { useForm } from '@/context/FormContext';

export default function ReportPage() {
  const { data } = useForm();

  // 4-minute countdown
  const totalSeconds = 4 * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  // interim data from n8n /report-latest?meta=1
  const [welcome, setWelcome] = useState<string | null>(null);
  const [interimHtml, setInterimHtml] = useState<string | null>(null);

  // final report HTML
  const [finalHtml, setFinalHtml] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'done'>('loading');

  // countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // fetch interim data immediately (welcome + htmlContent)
  useEffect(() => {
    if (!data?.email) return;

    async function fetchInterim() {
      try {
        const res = await fetch(
          `/api/report-latest?email=${encodeURIComponent(String(data.email))}&meta=1`,
          { cache: 'no-store' }
        );

        if (!res.ok) return;

        const json = await res.json();
        if (json.welcomeMessage) setWelcome(json.welcomeMessage);
        if (json.htmlContent) setInterimHtml(json.htmlContent);
      } catch {}
    }

    fetchInterim();
  }, [data?.email]);

  // poll FINAL HTML (full report)
  useEffect(() => {
    if (!data?.email) return;

    async function checkReport() {
      try {
        const res = await fetch(
          `/api/report-latest?email=${encodeURIComponent(String(data.email))}`,
          { cache: 'no-store' }
        );

        if (res.ok) {
          const text = await res.text();
          if (text.includes('<html') || text.includes('<!DOCTYPE html')) {
            setFinalHtml(text);
            setStatus('done');
            clearInterval(poll);
          }
        }
      } catch {}
    }

    let poll: NodeJS.Timeout;

    const startPolling = setTimeout(() => {
      poll = setInterval(checkReport, 10000);
      checkReport(); // trigger once
    }, 120000);

    return () => {
      clearInterval(poll);
      clearTimeout(startPolling);
    };
  }, [data?.email]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // ------------------------------------------
  // FINAL REPORT READY → show iframe
  // ------------------------------------------
  if (status === 'done' && finalHtml) {
    return (
      <div className="min-h-screen bg-[#f5f8ff] p-[40px] flex justify-center">
        <iframe
          title="GENSEN Report"
          srcDoc={finalHtml}
          className="w-full h-[90vh] max-w-[1100px] bg-white rounded-[12px] shadow-soft border border-[#e0e6f5]"
        />
      </div>
    );
  }

  // ------------------------------------------
  // INTERIM (WELCOME + HTML) AVAILABLE
  // ------------------------------------------
  const hasInterim = Boolean(welcome || interimHtml);

  return (
    <div className="relative min-h-screen bg-[#f5f8ff] text-[#0a0a0a] font-raleway flex flex-col items-center px-[40px] py-[60px] overflow-hidden fade-in">

      {/* WELCOME + INTERIM HTML */}
      {hasInterim && (
        <div className="max-w-[900px] w-full mb-[40px]">

          {welcome && (
            <div className="bg-white border border-[#e0e6f5] rounded-[12px] shadow-soft p-[32px] mb-[40px] text-[18px] leading-relaxed whitespace-pre-line">
              {welcome}
            </div>
          )}

          {interimHtml && (
            <div
              className="bg-white border border-[#e0e6f5] rounded-[12px] shadow-soft p-[32px]"
              dangerouslySetInnerHTML={{ __html: interimHtml }}
            />
          )}
        </div>
      )}

      {/* LOADING PANEL */}
      <div className="relative flex flex-col items-center justify-start w-full max-w-[750px]">

        {/* TIMER */}
        <div className="relative w-[160px] h-[160px] flex items-center justify-center mb-[40px] mt-[40px]">
          <div className="absolute inset-0 rounded-full border-[8px] border-[#076aff] border-t-transparent animate-spin-slow"></div>
          <div className="absolute inset-[12px] rounded-full border-[8px] border-[#c7d8ff] border-b-transparent animate-spin-reverse-slower"></div>
          <div className="absolute text-center text-[#002c71] font-semibold text-[28px]">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>

        {/* STAGE 1 MESSAGE */}
        <div className="bg-white shadow-soft rounded-[15px] px-[32px] py-[40px] border border-[#e0e6f5] leading-relaxed text-[17px] text-[#0b1320]">
          <h1 className="text-[32px] font-semibold text-[#002c71] mb-[20px] text-center">
            Your GENSEN Brand Intelligence Report Is Now in Development
          </h1>

          <p className="mb-[16px]">
            Every brand has a voice long before it’s defined. GENSEN is mapping how your
            communication patterns form trust, tone, and perception.
          </p>

          <p className="mb-[16px]">
            We analyze your website and social presence to extract language, positioning,
            and emotional cues.
          </p>

          <p className="mb-[16px]">
            Your full Brand Intelligence Report will appear here automatically.
          </p>

          <p className="text-center italic text-gray-600">
            Please remain on this page while the system completes your analysis.
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        .fade-in { animation: fadeIn 0.8s ease-in forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spinReverse { 0% { transform: rotate(0deg); }
                                 100% { transform: rotate(-360deg); } }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        .animate-spin-reverse-slower { animation: spinReverse 5s linear infinite; }
      `}</style>
    </div>
  );
}
