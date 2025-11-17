"use client";

import { useEffect, useState } from "react";

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

export default function LoadingTimer() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      setFade(false);

      // wait for fade duration
      setTimeout(() => {
        // switch message
        setIndex((prev) => (prev + 1) % messages.length);

        // fade in
        setFade(true);
      }, 600); // must match fade-out duration
    }, 10000); // EXACT 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center mt-8">

      {/* Rotating Rings */}
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-[#076aff] opacity-40 animate-spin-slow"></div>
        <div className="absolute inset-2 rounded-full border-4 border-[#40a9ff] opacity-40 animate-spin-reverse-slower"></div>
      </div>

      {/* Fading Message */}
      <p
        className={`text-[#666666] text-sm italic transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {messages[index]}
      </p>
    </div>
  );
}
