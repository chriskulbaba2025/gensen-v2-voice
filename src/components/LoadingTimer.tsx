"use client";

import { useEffect, useState, memo } from "react";

function LoadingTimer() {
  const TOTAL_SECONDS = 240; // 4 minutes

  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const messages = [
    "Measuring the maturity in your messaging…",
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

  // ROTATE MESSAGES — add messages.length as dependency
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 1500);
    }, 7000);

    return () => clearInterval(interval);
  }, [messages.length]);

  // COUNTDOWN TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center mt-8 space-y-4">

      {/* Rotating Conic Gradient Rings */}
      <div className="relative w-24 h-24">

        {/* Outer Ring */}
        <div
          className="absolute inset-0 rounded-full animate-spin-slow"
          style={{
            background: "conic-gradient(#076aff 0deg, transparent 90deg)",
            mask: "radial-gradient(farthest-side, transparent 60%, black 61%)"
          }}
        ></div>

        {/* Inner Ring */}
        <div
          className="absolute inset-3 rounded-full animate-spin-reverse-slower"
          style={{
            background: "conic-gradient(#40a9ff 0deg, transparent 100deg)",
            mask: "radial-gradient(farthest-side, transparent 55%, black 56%)"
          }}
        ></div>
      </div>

      {/* Countdown */}
      <p className="text-[#444444] text-base font-semibold tracking-wide">
        {minutes}:{seconds}
      </p>

      {/* Script Message */}
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
