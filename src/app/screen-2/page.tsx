"use client";

import { useRouter } from "next/navigation";
import { useForm } from "../../context/FormContext";
import { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface SliderScores {
  warmthAuthority: number;
  authorityEnergy: number;
  warmthEnergy: number;
  clarityCreativity: number;
  creativityEmpathy: number;
  clarityEmpathy: number;
  overall: number;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function Step2() {
  const router = useRouter();
  const { data, setData } = useForm();

  const [isExiting, setIsExiting] = useState(false);

  const navigateWithFade = (path?: string, isBack?: boolean) => {
    setIsExiting(true);
    setTimeout(() => {
      if (isBack) {
        router.back();
      } else if (path) {
        router.push(path);
      }
    }, 500);
  };

  const [sliders, setSliders] = useState<SliderScores>(
    data.sliderScores || {
      warmthAuthority: 5,
      authorityEnergy: 5,
      warmthEnergy: 5,
      clarityCreativity: 5,
      creativityEmpathy: 5,
      clarityEmpathy: 5,
      overall: 5,
    }
  );

  useEffect(() => {
    if (data.sliderScores) setSliders(data.sliderScores);
  }, [data.sliderScores]);

  const handleChange = (key: keyof SliderScores, value: number) =>
    setSliders((prev) => ({ ...prev, [key]: value }));

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setData({ sliderScores: sliders });
    navigateWithFade("/screen-3");
  };

  const handleBack = () => {
    navigateWithFade(undefined, true);
  };

  // (All your description generator functions remain unchanged)

  // ─────────────────────────────────────────────
  // Slider Component
  // ─────────────────────────────────────────────
  interface SliderProps {
    title: string;
    leftLabel: string;
    rightLabel: string;
    value: number;
    description: string;
    onChange: (val: number) => void;
    dynamicText?: { title: string; text: string } | null;
  }

  const Slider = ({
    title,
    leftLabel,
    rightLabel,
    value,
    description,
    onChange,
    dynamicText,
  }: SliderProps) => (
    <section className="bg-gray-50 border rounded-lg p-6 shadow-sm w-full max-w-3xl mb-6 select-none">
      <h2 className="text-lg font-semibold mb-1 text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none accent-[#076aff] cursor-grab active:cursor-grabbing"
      />
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      {dynamicText && (
        <div className="mt-3 p-4 bg-white border rounded-md shadow-sm transition-all duration-200">
          <p className="text-sm font-semibold text-[#076aff] mb-1">
            {dynamicText.title}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {dynamicText.text}
          </p>
        </div>
      )}
    </section>
  );

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <main
      className={`min-h-screen flex flex-col items-center px-4 pt-12 mb-20 transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <ProgressBar step={2} total={4} />

      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 2: Tune Your Brand Voice
      </h1>

      <p className="text-gray-600 text-center max-w-2xl mb-10 leading-relaxed">
        Adjust each slider to define how your brand feels and sounds. Each control
        moves between two traits that shape tone, pace, and emotion.
      </p>

      {/* All Slider components remain unchanged */}

      <div className="flex justify-between w-full max-w-3xl mt-10">
        <button
          onClick={handleBack}
          className="px-6 py-2 rounded border border-[#076aff] bg-transparent text-[#076aff] hover:bg-[#076aff] hover:text-white transition-colors duration-300"
        >
          ← Back
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-2 rounded border border-[#076aff] bg-transparent text-[#076aff] hover:bg-[#076aff] hover:text-white transition-colors duration-300"
        >
          Next →
        </button>
      </div>
    </main>
  );
}
