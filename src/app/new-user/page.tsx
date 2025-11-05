"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "@/context/FormContext";

export default function NewUserPage() {
  const router = useRouter();
  const { data } = useForm();

  const [seconds, setSeconds] = useState(240);
  const [stage, setStage] = useState<"loading" | "complete">("loading");

  // countdown
  useEffect(() => {
    if (stage !== "loading" || seconds <= 0) return;
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds, stage]);

  // poll for webhook completion
  useEffect(() => {
    let poll: NodeJS.Timeout;
    const startPolling = setTimeout(() => {
      poll = setInterval(async () => {
        try {
          const res = await fetch("/api/report-latest", { cache: "no-store" });
          if (res.ok) {
            setStage("complete");
            clearInterval(poll);
          }
        } catch {
          /* ignore */
        }
      }, 10000);
    }, 120000);
    return () => {
      clearInterval(poll);
      clearTimeout(startPolling);
    };
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gray-50 transition-all duration-700 relative overflow-hidden">
      {/* ─────────── LOADING STAGE ─────────── */}
      <div
        className={`transition-opacity duration-[1500ms] ease-in-out ${
          stage === "complete" ? "opacity-0 pointer-events-none" : "opacity-100"
        } flex flex-col items-center`}
      >
        <Image
          src="https://omnipressence.com/wp-content/uploads/2025/09/Gensen-Logo-Final-version-lower-case-logo-and-spaces1-356x295-1.webp"
          alt="GENSEN logo"
          width={220}
          height={180}
          className="rounded-[20px] mb-8"
        />

        <div className="flex flex-col items-center max-w-xl transition-opacity duration-1000">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-4 border-gray-300 border-t-[#076aff] rounded-full animate-spin-slow"></div>
            <div className="absolute inset-1 border-4 border-gray-200 border-b-[#40a9ff] rounded-full animate-spin-reverse-slower"></div>
            <div className="absolute inset-0 flex items-center justify-center font-mono text-[#076aff] text-lg font-semibold">
              {minutes}:{remainingSeconds.toString().padStart(2, "0")}
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
        </div>
      </div>

      {/* ─────────── COMPLETE STAGE ─────────── */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-[40px] transition-opacity duration-[1500ms] ease-in-out ${
          stage === "complete" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <img
          src="https://omnipressence.com/wp-content/uploads/2025/09/Gensen-Logo-Final-version-lower-case-logo-and-spaces1-356x295-1.webp"
          alt="GENSEN logo"
          className="w-[180px] mb-[20px]"
        />

        <h1 className="text-3xl font-semibold text-[#002c71] mb-4">
          Stage 1 Complete &ndash; Your Brand Voice Foundation Is Ready
        </h1>

        <p className="text-gray-700 leading-relaxed mb-4 max-w-[600px]">
          We’ve completed the deep dive into how your brand already sounds — the
          tone, rhythm, and intent behind every message.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4 max-w-[600px]">
          Now, GENSEN will help you <strong>refine and develop</strong> that
          foundation into a living Brand Voice Framework.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4 max-w-[600px]">
          There are just <strong>two short steps</strong> ahead:
        </p>

        <ul className="text-gray-700 text-left mb-4 max-w-[600px] mx-auto">
          <li>1️⃣ Define your tone and personality using a few guided sliders.</li>
          <li>
            2️⃣ Apply that tone to your real communication style through examples
            and focus areas.
          </li>
        </ul>

        <p className="text-gray-700 leading-relaxed mb-6 max-w-[600px]">
          This stage shapes the precision, warmth, and rhythm of your voice —
          the signature that will make your content instantly recognizable
          everywhere it appears.
        </p>

        <Link
          href="/screen-2"
          className="mt-6 inline-block px-8 py-3 rounded-[10px] border border-[#076aff] text-[#076aff] bg-transparent hover:bg-[#076aff] hover:text-[#ffffff] transition-colors duration-300"
        >
          Continue to Step 2 →
        </Link>
      </div>

      <footer className="mt-12 text-gray-500 italic text-sm text-center">
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
        /* ensure hover overrides global CSS */
        a:hover {
          color: #ffffff !important;
        }
      `}</style>
    </main>
  );
}
