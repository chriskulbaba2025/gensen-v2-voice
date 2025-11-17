"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "@/context/FormContext";

export default function NewUserPage() {
  const { data, setData } = useForm();

  const [stage, setStage] = useState<"loading" | "complete">("loading");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  // ───────────────────────────────────────────────
  // STABLE POLLING FOR n8n REPORT
  // ───────────────────────────────────────────────
  useEffect(() => {
    if (!data?.email) return;

    const email = data.email.trim().toLowerCase();

    const checkReport = async () => {
      try {
        const res = await fetch(
          `/api/report-latest?email=${encodeURIComponent(email)}&meta=1`,
          { cache: "no-store" }
        );

        if (!res.ok) return;

        const record = await res.json();

        if (record?.htmlContent) {
          const wm = record.welcomeMessage || "";
          const html = record.htmlContent || "";

          setWelcomeMessage(wm);
          setHtmlContent(html);

          setData({
            ...data,
            welcomeMessage: wm,
            htmlContent: html,
          });

          setStage("complete");
          clearInterval(intervalId);
        }
      } catch {}
    };

    // eslint fix: declare + assign in same statement
    const intervalId = setInterval(checkReport, 5000);

    checkReport();

    return () => clearInterval(intervalId);
  }, [data, setData]);

  // ───────────────────────────────────────────────
  // UI
  // ───────────────────────────────────────────────
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gray-50 transition-all duration-700 relative overflow-hidden">

      {/* LOADING STAGE */}
      <div
        className={`transition-opacity duration-[1500ms] ease-in-out ${
          stage === "complete"
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        } flex flex-col items-center`}
      >
        <Image
          src="https://omnipressence.com/wp-content/uploads/2025/09/Gensen-Logo-Final-version-lower-case-logo-and-spaces1-356x295-1.webp"
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
      </div>

      {/* COMPLETE STAGE */}
      <div
        className={`flex flex-col items-center justify-start text-center px-[40px] py-[80px] transition-opacity duration-[1500ms] ease-in-out ${
          stage === "complete"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <Image
          src="https://omnipressence.com/wp-content/uploads/2025/09/Gensen-Logo-Final-version-lower-case-logo-and-spaces1-356x295-1.webp"
          alt="GENSEN logo"
          width={220}
          height={180}
          className="w-[180px] mb-[20px] rounded-[20px]"
        />

        {welcomeMessage && (
          <p className="text-gray-700 mb-6 max-w-[700px] whitespace-pre-line leading-relaxed text-left">
            {welcomeMessage}
          </p>
        )}

        {htmlContent && (
          <div
            className="bg-white border border-[#e0e6f5] rounded-[12px] shadow-soft p-[24px] mb-[40px] max-w-[760px] text-left"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}

        <Link
          href="/screen-2"
          className="mt-6 inline-block px-8 py-3 rounded-[10px] border border-[#076aff] text-[#076aff] bg-transparent hover:bg-[#076aff] hover:text-white transition-colors duration-300"
        >
          Continue to Step 2 →
        </Link>
      </div>

      <footer className="my-[50px] text-gray-500 italic text-sm text-center">
        Consistency builds credibility — and credibility builds connection.
      </footer>
    </main>
  );
}
