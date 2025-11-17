"use client";

import { useEffect, useState, memo } from "react";

const messages = [
  "Microwaving maturity…",
  "Sharpening your signal…",
  "Tuning your digital presence…",
  "Aligning your brand fundamentals…",
  "Mapping what your audience actually sees…",
  "Adjusting the narrative threads…",
  "Refining your voice texture…",
  "Pulling clarity out of the static…",
  "Spotlighting the signals that make you unmistakable…",
  "Surfacing the language people trust instinctively…",
  "Separating substance from the scroll-by moments…",
  "Extracting the moments where your brand actually connects…",
  "Smoothing the edges so your voice lands clean…",
  "Locating the tension that makes stories memorable…"
];

function LoadingTimer() {
  const TOTAL_SECONDS = 240; // 4 minutes
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // ───────────────────────────────────────────────
  // MESSAGE ROTATION — 7 seconds, fade 1.5 seconds
  // ───────────────────────────────────────────────
  useEffect(() => {
    const msgInterval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 1500); // fade duration
    }, 7000); // total duration per message

    return () => clearInterval(msgInterval);
  }, []);

  // ───────────────────────────────────────────────
  // COUNTDOWN TIMER — 4 minutes
  // ───────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center mt-8 space-y-4">

      {/* Rotating Rings */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-[#076aff] opacity-40 animate-spin-slow"></div>
        <div className="absolute inset-2 rounded-full border-4 border-[#40a9ff] opacity-40 animate-spin-reverse-slower"></div>
      </div>

      {/* Countdown */}
      <p className="text-[#444444] text-base font-semibold tracking-wide">
        {minutes}:{seconds}
      </p>

      {/* Rotating Script */}
      <p
        className={`text-[#666666] text-[18px] italic transition-opacity duration-[1500ms] ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {messages[index]}
      </p>
    </div>
  );
}

export default memo(LoadingTimer);
