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

export default function Step2() {
  const router = useRouter();
  const { data, setData } = useForm();

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
    router.push("/screen-3");
  };

  const handleBack = () => router.back();

  // ─────────────────────────────────────────────
  // Warmth ↔ Authority
  // ─────────────────────────────────────────────
  const getWarmthAuthorityDescription = (value: number) => {
    if (value <= 2)
      return {
        title: "Full Warmth",
        text: `You lead entirely with empathy and trust. Every sentence feels conversational and reassuring.
Example:
We don’t push for attention — we earn it.
Understanding comes first; persuasion follows.`,
      };
    if (value <= 4)
      return {
        title: "Gentle Warmth",
        text: `You keep connection first but add light structure. Calm and approachable, never forceful.
Example:
We listen before we guide.
Each plan begins with care and builds toward clarity.`,
      };
    if (value <= 6)
      return {
        title: "Balanced Core",
        text: `Warmth and authority share equal footing. Human tone with clear direction.
Example:
You already know what matters; we help you say it clearly.`,
      };
    if (value <= 8)
      return {
        title: "Guided Authority",
        text: `Confidence leads, but empathy softens the tone. Precision without pressure.
Example:
We clarify before we convince.
Each idea lands with poise and understanding.`,
      };
    return {
      title: "Full Authority",
      text: `You communicate with clarity and conviction. Professional, concise, and decisive.
Example:
We don’t wait for clarity — we create it.`,
    };
  };

  // ─────────────────────────────────────────────
  // Authority ↔ Energy
  // ─────────────────────────────────────────────
  const getAuthorityEnergyDescription = (value: number) => {
    if (value <= 2)
      return {
        title: "Measured Authority",
        text: `Steady, deliberate, composed. Confidence through precision, not pace.
Example:
Progress comes from focus, not force.`,
      };
    if (value <= 4)
      return {
        title: "Controlled Motion",
        text: `Structure holds, but momentum builds. Order and movement coexist.
Example:
We move when direction is clear.`,
      };
    if (value <= 6)
      return {
        title: "Balanced Drive",
        text: `Calm authority with active pacing. Direction that inspires.
Example:
You build movement through focus.`,
      };
    if (value <= 8)
      return {
        title: "Driven Authority",
        text: `Momentum takes lead. Confidence turns to action.
Example:
We act when others wait.`,
      };
    return {
      title: "Full Energy",
      text: `Dynamic and fast. Each line signals motion and intent.
Example:
We start fast and stay focused.`,
    };
  };

  // ─────────────────────────────────────────────
  // Warmth ↔ Energy
  // ─────────────────────────────────────────────
  const getWarmthEnergyDescription = (value: number) => {
    if (value <= 2)
      return {
        title: "Full Warmth",
        text: `Slow, calm, supportive. Comfort over urgency.
Example:
We take time to listen before we lead.`,
      };
    if (value <= 4)
      return {
        title: "Gentle Flow",
        text: `Empathy drives gentle movement.
Example:
We lead with heart, then with motion.`,
      };
    if (value <= 6)
      return {
        title: "Balanced Warm Energy",
        text: `Friendly and productive. Calm energy with focus.
Example:
Action feels natural, never forced.`,
      };
    if (value <= 8)
      return {
        title: "Active Energy",
        text: `Momentum with empathy intact. Fast yet considerate.
Example:
Momentum builds trust when each move feels considered.`,
      };
    return {
      title: "Full Energy",
      text: `Confident and bright. Energy drives persuasion.
Example:
Momentum doesn’t wait — it performs.`,
    };
  };

  // ─────────────────────────────────────────────
  // Clarity ↔ Creativity
  // ─────────────────────────────────────────────
  const getClarityCreativityDescription = (value: number) => {
    if (value <= 2)
      return {
        title: "Pure Clarity",
        text: `Structured, logical, clean.
Example:
Strong ideas speak plainly.`,
      };
    if (value <= 4)
      return {
        title: "Structured Expression",
        text: `Clarity leads but tone softens.
Example:
We explain before we impress.`,
      };
    if (value <= 6)
      return {
        title: "Balanced Expression",
        text: `Logic and creativity merge evenly.
Example:
Facts earn trust; tone keeps it.`,
      };
    if (value <= 8)
      return {
        title: "Creative Logic",
        text: `Creative framing with structure beneath.
Example:
We paint with precision.`,
      };
    return {
      title: "Full Creativity",
      text: `Artful and rhythmic. Ideas become stories.
Example:
An idea isn’t finished until it moves someone.`,
    };
  };

  // ─────────────────────────────────────────────
  // Creativity ↔ Empathy
  // ─────────────────────────────────────────────
  const getCreativityEmpathyDescription = (value: number) => {
    if (value <= 2)
      return {
        title: "Pure Creativity",
        text: `Inventive and visual, yet personal.
Example:
You make ideas visible before they're explained.`,
      };
    if (value <= 4)
      return {
        title: "Creative Flow",
        text: `Imagination with emerging connection.
Example:
Vision becomes understanding.`,
      };
    if (value <= 6)
      return {
        title: "Balanced Creative Empathy",
        text: `Imaginative and caring equally.
Example:
Inspiration becomes belonging.`,
      };
    if (value <= 8)
      return {
        title: "Empathic Imagination",
        text: `Emotional storytelling takes lead.
Example:
Each story listens before it speaks.`,
      };
    return {
      title: "Full Empathy",
      text: `Patient, human, real.
Example:
We don’t write to impress; we write to connect.`,
    };
  };

  // ─────────────────────────────────────────────
  // Clarity ↔ Empathy
  // ─────────────────────────────────────────────
  const getClarityEmpathyDescription = (value: number) => {
    if (value <= 2)
      return {
        title: "Pure Clarity",
        text: `Structured, logical, confident.
Example:
We remove noise so meaning stands taller.`,
      };
    if (value <= 4)
      return {
        title: "Structured Awareness",
        text: `Clarity first, compassion close behind.
Example:
We keep ideas crisp but kind.`,
      };
    if (value <= 6)
      return {
        title: "Balanced Clarity and Empathy",
        text: `Logic with warmth in delivery.
Example:
You guide through understanding, not correction.`,
      };
    if (value <= 8)
      return {
        title: "Empathic Precision",
        text: `Empathy defines each clear point.
Example:
We explain with kindness.`,
      };
    return {
      title: "Full Empathy",
      text: `Understanding first, clarity follows.
Example:
We speak in sentences that listen.`,
    };
  };

  // ─────────────────────────────────────────────
  // Overall Tone Balance
  // ─────────────────────────────────────────────
  const getOverallDescription = (value: number) => {
    if (value <= 2)
      return {
        title: "Grounded Balance",
        text: `Calm and steady. Confidence through restraint.
Example:
Short lines. Clear points.`,
      };
    if (value <= 4)
      return {
        title: "Composed Flow",
        text: `Measured, smooth, poised.
Example:
We move through ideas at a natural pace.`,
      };
    if (value <= 6)
      return {
        title: "Dynamic Equilibrium",
        text: `Balanced rhythm and confidence.
Example:
Your tone breathes smoothly — measured, clear, alive.`,
      };
    if (value <= 8)
      return {
        title: "Driven Momentum",
        text: `Leadership in motion — fast but focused.
Example:
We lead through movement, not volume.`,
      };
    return {
      title: "Full Momentum",
      text: `Sharp, confident, inspiring. Action in every line.
Example:
Every line propels the reader forward.`,
    };
  };

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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(Number(e.target.value))
        }
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
    <main className="min-h-screen flex flex-col items-center px-4 pt-12 mb-20">
      <ProgressBar step={2} total={4} />
      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 2: Tune Your Brand Voice
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mb-10 leading-relaxed">
        Adjust each slider to define how your brand feels and sounds. Each
        control moves between two traits that shape tone, pace, and emotion.
      </p>

      <h3 className="text-xl font-semibold mb-3 text-[#076aff]">Tone Dynamics</h3>

      <Slider
        title="Warmth ↔ Authority"
        leftLabel="Warmth"
        rightLabel="Authority"
        description="Sets whether your message feels gentle and human (Warmth) or confident and directive (Authority)."
        value={sliders.warmthAuthority}
        onChange={(val) => handleChange("warmthAuthority", val)}
        dynamicText={getWarmthAuthorityDescription(sliders.warmthAuthority)}
      />

      <Slider
        title="Authority ↔ Energy"
        leftLabel="Authority"
        rightLabel="Energy"
        description="Controls how composed versus driven your tone is."
        value={sliders.authorityEnergy}
        onChange={(val) => handleChange("authorityEnergy", val)}
        dynamicText={getAuthorityEnergyDescription(sliders.authorityEnergy)}
      />

      <Slider
        title="Warmth ↔ Energy"
        leftLabel="Warmth"
        rightLabel="Energy"
        description="Balances empathy with enthusiasm."
        value={sliders.warmthEnergy}
        onChange={(val) => handleChange("warmthEnergy", val)}
        dynamicText={getWarmthEnergyDescription(sliders.warmthEnergy)}
      />

      <h3 className="text-xl font-semibold mt-8 mb-3 text-[#076aff]">
        Expression Style
      </h3>

      <Slider
        title="Clarity ↔ Creativity"
        leftLabel="Clarity"
        rightLabel="Creativity"
        description="Defines whether writing prioritizes precision or imaginative flow."
        value={sliders.clarityCreativity}
        onChange={(val) => handleChange("clarityCreativity", val)}
        dynamicText={getClarityCreativityDescription(sliders.clarityCreativity)}
      />

      <Slider
        title="Creativity ↔ Empathy"
        leftLabel="Creativity"
        rightLabel="Empathy"
        description="Determines how expressive versus emotionally aware your tone feels."
        value={sliders.creativityEmpathy}
        onChange={(val) => handleChange("creativityEmpathy", val)}
        dynamicText={getCreativityEmpathyDescription(sliders.creativityEmpathy)}
      />

      <Slider
        title="Clarity ↔ Empathy"
        leftLabel="Clarity"
        rightLabel="Empathy"
        description="Controls whether messages sound direct or listener-focused."
        value={sliders.clarityEmpathy}
        onChange={(val) => handleChange("clarityEmpathy", val)}
        dynamicText={getClarityEmpathyDescription(sliders.clarityEmpathy)}
      />

      <h3 className="text-xl font-semibold mt-8 mb-3 text-[#076aff]">
        Overall Balance
      </h3>

      <Slider
        title="Overall Tone Balance"
        leftLabel="Grounded"
        rightLabel="Dynamic"
        description="Represents the general pace and confidence level of your brand’s communication style."
        value={sliders.overall}
        onChange={(val) => handleChange("overall", val)}
        dynamicText={getOverallDescription(sliders.overall)}
      />

      <div className="flex justify-between w-full max-w-3xl mt-10">
        <button
          onClick={handleBack}
          className="px-6 py-2 rounded border border-gray-300 bg-white text-black hover:bg-[#076aff] hover:text-white transition-colors duration-200"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 rounded border border-gray-300 bg-white text-black hover:bg-[#f66630] hover:text-white transition-colors duration-200"
        >
          Next →
        </button>
      </div>
    </main>
  );
}
