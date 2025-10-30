'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ReportPage() {
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [html, setHtml] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    const totalSeconds = 20 * 60;
    setTimeLeft(totalSeconds);

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

  if (status === 'loading') {
    const totalSeconds = 20 * 60;
    const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

    return (
      <div className="min-h-screen bg-[#f5f8ff] text-[#0a0a0a] px-[40px] py-[60px] font-raleway flex flex-col items-center">
        {/* Logo */}
        <Image
          src="https://omnipressence.com/wp-content/uploads/2025/09/Gensen-Logo-Final-version-lower-case-logo-and-spaces1-356x295-1.webp"
          alt="Gensen Logo"
          width={250}
          height={100}
          className="rounded-[15px] object-contain mb-[30px]"
        />

        {/* Heading */}
        <h1 className="text-[34px] font-semibold mb-[8px] text-[#002c71] text-center">
          Building Your Unified Brand Voice Report
        </h1>
        <p className="text-[18px] text-[#333] mb-[40px] text-center">
          Please wait while we process your data. This takes about 4 minutes.
        </p>

        {/* Spinner */}
        <div className="w-[60px] h-[60px] border-4 border-[#d0d7f5] border-t-[#076aff] rounded-full animate-spin mb-[25px]" />

        {/* Progress Bar */}
        <div className="w-full max-w-[600px] bg-gray-200 h-3 rounded">
          <div
            className="bg-[#076aff] h-3 rounded transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="mt-[10px] text-[16px] text-[#333]">
          Estimated time remaining: {(timeLeft / 60).toFixed(1)} minutes
        </p>
      </div>
    );
  }

  // When complete
  return (
    <div className="min-h-screen bg-[#f5f8ff] text-[#0a0a0a] px-[20px] py-[40px] font-raleway flex flex-col items-center">
      <div className="bg-white rounded-[15px] shadow-md p-[20px] max-w-[950px] w-full border border-[#e0e6f5]">
        <div dangerouslySetInnerHTML={{ __html: html || '' }} />
      </div>
    </div>
  );
}
