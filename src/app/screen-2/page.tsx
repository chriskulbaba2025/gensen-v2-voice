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
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);

    async function checkReport() {
      try {
        const res = await fetch('/api/report-latest');
        if (res.ok) {
          const text = await res.text();
          if (text.includes('<!DOCTYPE html>')) {
            // ───── FADE OUT EXISTING SECTION ─────
            const loadingSection = document.querySelector('.transition-opacity');
            if (loadingSection) loadingSection.classList.add('opacity-0');

            // ───── AFTER FADE, SHOW STAGE 2 INTRO MESSAGE ─────
            setTimeout(() => {
              const container = document.querySelector('.transition-opacity');
              if (container) {
                container.innerHTML = `
                  <div class="flex flex-col items-center justify-center text-center max-w-2xl px-6 py-12 fade-in">
                    <h1 class="text-3xl font-semibold text-[#002c71] mb-4">
                      Stage 1 Complete &ndash; Your Brand Voice Foundation Is Ready
                    </h1>

                    <p class="text-gray-700 leading-relaxed mb-4">
                      We’ve completed the deep dive into how your brand already sounds — the tone,
                      rhythm, and intent behind every message.
                    </p>

                    <p class="text-gray-700 leading-relaxed mb-4">
                      Now, GENSEN will help you <strong>refine and develop</strong> that foundation
                      into a living Brand Voice Framework.
                    </p>

                    <p class="text-gray-700 leading-relaxed mb-4">
                      There are just <strong>two short steps</strong> ahead:
                    </p>

                    <ul class="text-gray-700 text-left mb-4">
                      <li>1️⃣ Define your tone and personality using a few guided sliders.</li>
                      <li>
                        2️⃣ Apply that tone to your real communication style through examples and
                        focus areas.
                      </li>
                    </ul>

                    <p class="text-gray-700 leading-relaxed mb-6">
                      This stage shapes the precision, warmth, and rhythm of your voice — the
                      signature that will make your content instantly recognizable everywhere it
                      appears.
                    </p>

                    <button 
                      onclick="fadeOutAndContinue()" 
                      class="mt-6 px-8 py-3 bg-[#076aff] text-white rounded-[10px] hover:bg-[#005fe0] transition">
                      Continue →
                    </button>
                  </div>
                `;

                // Inject fade-out + redirect handler into DOM safely
                const script = document.createElement('script');
                script.innerHTML = `
                  function fadeOutAndContinue() {
                    const container = document.querySelector('.transition-opacity');
                    if (container) {
                      container.classList.add('fade-out');
                      setTimeout(() => {
                        window.location.href = 'https://voice.omnipressence.com/generate/screen-2';
                      }, 2000);
                    }
                  }
                `;
                document.body.appendChild(script);

                container.classList.remove('opacity-0');
                container.classList.add('opacity-100');
              }
            }, 800); // match fade duration

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
      {/* LOADING SECTION */}
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

        {/* STAGE 1 MESSAGE */}
        <div className="max-w-[750px] bg-white shadow-soft rounded-[15px] px-[32px] py-[40px] border border-[#e0e6f5] leading-relaxed text-[17px] text-[#0b1320]">
          <h1 className="text-[32px] font-semibold text-[#002c71] mb-[20px] text-center">
            Your GENSEN Brand Voice Is Now Being Blended
          </h1>

          <p className="mb-[16px]">
            GENSEN is analyzing how your brand already communicates &mdash; the tone, rhythm, and
            intent that shape your message. This process builds the foundation of your unique voice
            framework, preparing for Stage 2: Refinement &amp; Development.
          </p>

          <p className="mb-[16px]">
            During this scan, GENSEN identifies how warmth, authority, and clarity balance across
            your existing material. It then models those patterns to create a consistent structure
            your future content will build on.
          </p>

          <p className="mb-[16px] text-[#002c71] font-medium text-center">
            Every pass strengthens your voice system &mdash; confident, human, and unmistakably
            yours.
          </p>

          <p className="mb-[16px]">
            This analysis usually takes a few minutes. Once complete, you&rsquo;ll move to Stage 2 to
            refine tone, add examples, and define focus areas that make your communication framework
            practical and actionable.
          </p>

          <p className="text-center italic text-gray-600">
            Stay here &mdash; Stage 2 will open automatically when the scan completes.
          </p>
        </div>
      </div>
    </div>
  );
}

/* Tailwind custom animations */
<style jsx global>{`
  .fade-in {
    animation: fadeIn 2s ease-in forwards;
  }
  .fade-out {
    animation: fadeOut 2s ease-out forwards;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
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
