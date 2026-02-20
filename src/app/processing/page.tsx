"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FormContext";
import LoadingTimer from "@/components/LoadingTimer";

export default function NewUserPage() {
  const { data, setData } = useForm();
  const router = useRouter();

  const [stage, setStage] = useState<"loading" | "complete">("loading");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  // ───────────────────────────────────────────────
  // FADE + NAVIGATION HELPER
  // ───────────────────────────────────────────────
  const navigateWithFade = (path: string) => {
    setIsExiting(true);
    setTimeout(() => {
      router.push(path);
    }, 500); // match Tailwind duration-500
  };

  // ───────────────────────────────────────────────
  // HARD AUTO-ADVANCE
  // ───────────────────────────────────────────────
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigateWithFade("/screen-2");
    }, 300000);

    return () => clearTimeout(redirectTimer);
  }, []);

  // ───────────────────────────────────────────────
  // POLLING
  // ───────────────────────────────────────────────
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const checkReport = async () => {
      try {
        const res = await fetch("/api/report-complete", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const json = await res.json();

        if (json?.htmlContent) {
          setWelcomeMessage(json.welcomeMessage || "");
          setHtmlContent(json.htmlContent || "");
          setData({ ...data });
          setStage("complete");

          if (intervalId) clearInterval(intervalId);

          navigateWithFade("/screen-2");
        }
      } catch {}
    };

    intervalId = setInterval(checkReport, 5000);
    checkReport();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <main
      className={`flex flex-col items-center justify-start p-8 text-center bg-gray-50 transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`flex flex-col items-center transition-opacity duration-1500 ease-in-out ${
          stage === "complete"
            ? "opacity-0 pointer-events-none h-0 overflow-hidden"
            : "opacity-100"
        }`}
      >
        <Image
          src="/gensen-logo.webp"
          alt="GENSEN logo"
          width={220}
          height={180}
          className="rounded-[20px] mb-8"
          priority
        />

        <h1 className="text-2xl font-semibold mb-3">
          Mapping Your Voice Before Amplifying It…
        </h1>

        <p className="text-gray-600 max-w-lg mb-4 leading-relaxed">
          You can’t rush meaningful storytelling.
          Give us a moment while we analyze your digital presence.
        </p>

        <p className="text-gray-400 text-xs mt-1">
          This page updates automatically.
        </p>

        <LoadingTimer key="gensen-loading-timer" />
      </div>

      <div
        className={`flex flex-col items-center justify-start text-center px-5 pt-[5px] pb-5 transition-opacity duration-1500 ease-in-out ${
          stage === "complete"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <Image
          src="/gensen-logo.webp"
          alt="GENSEN logo"
          width={180}
          height={130}
          className="w-[140px] mb-2.5 rounded-xl"
        />

        {welcomeMessage && (
          <p className="text-gray-700 mb-4 max-w-[700px] whitespace-pre-line leading-relaxed text-left">
            {welcomeMessage}
          </p>
        )}

        {htmlContent && (
          <div
            className="report-container bg-white border border-[#e0e6f5] rounded-xl shadow-soft p-6 mb-6 max-w-[760px] text-left opacity-0 animate-[fadeIn_1.0s_ease_forwards]"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}

        <button
          onClick={() => navigateWithFade("/screen-2")}
          className="mt-4 inline-block px-8 py-3 rounded-[10px] border border-[#076aff] text-[#076aff] bg-transparent hover:bg-[#076aff] hover:text-white transition-colors duration-300"
        >
          Continue to Step 2 →
        </button>
      </div>

      <footer className="my-[50px] text-gray-500 italic text-sm text-center">
        Consistency builds credibility — and credibility builds connection.
      </footer>
    </main>
  );
}
