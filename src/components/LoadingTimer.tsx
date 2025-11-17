"use client";

import { useEffect, useState } from "react";

const messages = [
  "Microwaving maturity…",
  "Sharpening your signal…",
  "Tuning your digital presence…",
  "Aligning your brand fundamentals…",
  "Mapping what your audience actually sees…",
  "Adjusting the narrative threads…",
  "Refining your voice texture…"
];

export default function LoadingTimer() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(id);
  }, []);

  return (
    <p className="text-gray-500 text-sm mt-6 italic transition-opacity duration-500">
      {messages[index]}
    </p>
  );
}
