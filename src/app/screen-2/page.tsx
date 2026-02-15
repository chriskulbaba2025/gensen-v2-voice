"use client";

import { useRouter } from "next/navigation";
import { useForm } from "../../context/FormContext";
import { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";

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

  // Fade-out on navigation
  const [isExiting, setIsExiting] = useState(false);

  const navigateWithFade = (path?: string, isBack?: boolean) => {
    setIsExiting(true);
    setTimeout(() => {
      if (isBack) router.back();
      else if (path) router.push(path);
    }, 500);
  };

  // Ensure ALL 7 slider values always exist (prevents partial overwrites)
  const ensureFullSliderScores = (incoming?: Partial<SliderScores> | null): SliderScores => ({
    warmthAuthority: incoming?.warmthAuthority ?? data.sliderScores?.warmthAuthority ?? 5,
    authorityEnergy: incoming?.authorityEnergy ?? data.sliderScores?.authorityEnergy ?? 5,
    warmthEnergy: incoming?.warmthEnergy ?? data.sliderScores?.warmthEnergy ?? 5,
    clarityCreativity: incoming?.clarityCreativity ?? data.sliderScores?.clarityCreativity ?? 5,
    creativityEmpathy: incoming?.creativityEmpathy ?? data.sliderScores?.creativityEmpathy ?? 5,
    clarityEmpathy: incoming?.clarityEmpathy ?? data.sliderScores?.clarityEmpathy ?? 5,
    overall: incoming?.overall ?? data.sliderScores?.overall ?? 5,
  });

  const [sliders, setSliders] = useState<SliderScores>(() =>
    ensureFullSliderScores(data.sliderScores)
  );

  // Keep local sliders synced from context (but always normalized to 7 values)
  useEffect(() => {
    setSliders(ensureFullSliderScores(data.sliderScores));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.sliderScores]);

  const handleChange = (key: keyof SliderScores, value: number) =>
    setSliders((prev) => ({ ...prev, [key]: value }));

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const full = ensureFullSliderScores(sliders);

    // Persist ALL 7 values into context
    setData({ sliderScores: full });

    navigateWithFade("/screen-3");
  };

  const handleBack = () => navigateWithFade(undefined, true);

  // ─────────────────────────────────────────────
  // Description Generators (unchanged content)
  // ─────────────────────────────────────────────

  const getWarmthAuthorityDescription = (v: number) => {
    if (v <= 2)
      return {
        title: "Full Warmth",
        text: `Tone is nurturing and personal.
• We start with understanding before advice.
• Every sentence feels like a conversation, not a pitch.
• Trust grows through calm confidence.`,
      };
    if (v <= 4)
      return {
        title: "Gentle Warmth",
        text: `Warm but structured — empathy with focus.
• We listen first, then guide clearly.
• Language feels human, yet directed.
• Soft tone, steady movement.`,
      };
    if (v <= 6)
      return {
        title: "Balanced Core",
        text: `Equal parts warmth and authority.
• We sound confident without being forceful.
• Logic supports empathy.
• Direction feels natural and earned.`,
      };
    if (v <= 8)
      return {
        title: "Guided Authority",
        text: `Assured and clear but never harsh.
• Statements are precise, not pushy.
• Empathy remains under the structure.
• The reader feels led, not corrected.`,
      };
    return {
      title: "Full Authority",
      text: `Tone is decisive and composed.
• We explain once, cleanly, with purpose.
• Strength shows through brevity.
• Every line lands with clarity.`,
    };
  };

  const getAuthorityEnergyDescription = (v: number) => {
    if (v <= 2)
      return {
        title: "Measured Authority",
        text: `Composed and steady.
• Movement is slow, deliberate, and exact.
• Strength comes from calm focus.
• Ideas unfold with discipline.`,
      };
    if (v <= 4)
      return {
        title: "Controlled Motion",
        text: `Still structured but ready to act.
• Sentences move with quiet rhythm.
• Confidence builds through restraint.
• Focus and pace stay even.`,
      };
    if (v <= 6)
      return {
        title: "Balanced Drive",
        text: `Confident but approachable.
• Action is planned, not rushed.
• We project assurance through clarity.
• Tone balances motion and logic.`,
      };
    if (v <= 8)
      return {
        title: "Driven Authority",
        text: `Commanding but professional.
• Language motivates through clarity.
• Energy sits under control.
• Direction feels like leadership, not pressure.`,
      };
    return {
      title: "Full Energy",
      text: `High clarity and motion combined.
• Each phrase signals intent.
• Words carry momentum.
• Tone moves the reader forward.`,
    };
  };

  const getWarmthEnergyDescription = (v: number) => {
    if (v <= 2)
      return {
        title: "Calm Warmth",
        text: `Gentle and reflective.
• Words create safety and understanding.
• Pace is slow and steady.
• Focus rests on reassurance.`,
      };
    if (v <= 4)
      return {
        title: "Gentle Flow",
        text: `Kind tone with light motion.
• Movement grows through empathy.
• Energy appears through connection.
• Reader feels guided, not hurried.`,
      };
    if (v <= 6)
      return {
        title: "Balanced Warm Energy",
        text: `Friendly and purposeful.
• Words build trust while keeping pace.
• Tone feels warm but alert.
• Emotion supports productivity.`,
      };
    if (v <= 8)
      return {
        title: "Active Energy",
        text: `Empathy with drive.
• We sound caring yet quick.
• Phrases stay concise and forward.
• Movement shows confidence, not haste.`,
      };
    return {
      title: "Full Energy",
      text: `Dynamic and assured.
• Every line creates motion.
• Sentences drive results.
• The tone lifts engagement.`,
    };
  };

  const getClarityCreativityDescription = (v: number) => {
    if (v <= 2)
      return {
        title: "Pure Clarity",
        text: `Simple, factual, grounded.
• Language stays plain and reliable.
• No filler, no flair.
• Ideas stand on precision.`,
      };
    if (v <= 4)
      return {
        title: "Structured Expression",
        text: `Clarity leads, but imagination supports.
• Logic defines rhythm.
• Small creative turns keep it human.
• Every word has purpose.`,
      };
    if (v <= 6)
      return {
        title: "Balanced Expression",
        text: `Clear yet vivid.
• Facts meet flow.
• Creativity works inside structure.
• Tone feels intelligent, not decorative.`,
      };
    if (v <= 8)
      return {
        title: "Creative Logic",
        text: `Inventive clarity.
• Sentences teach and inspire together.
• Imagery supports understanding.
• Precision and style align.`,
      };
    return {
      title: "Full Creativity",
      text: `Expressive but exact.
• Words build vision with control.
• Rhythm keeps clarity alive.
• Ideas feel fresh and confident.`,
    };
  };

  const getCreativityEmpathyDescription = (v: number) => {
    if (v <= 2)
      return {
        title: "Pure Creativity",
        text: `Inventive, bold, independent.
• Ideas come before emotion.
• Expression surprises the reader.
• Connection happens through curiosity.`,
      };
    if (v <= 4)
      return {
        title: "Creative Flow",
        text: `Conceptual yet open.
• Emotion begins to appear.
• Visual rhythm softens structure.
• We connect ideas with human intent.`,
      };
    if (v <= 6)
      return {
        title: "Balanced Creative Empathy",
        text: `Creative and relational.
• Language feels thoughtful and real.
• Imagination meets sincerity.
• Every story builds understanding.`,
      };
    if (v <= 8)
      return {
        title: "Empathic Imagination",
        text: `Emotion drives the story.
• Visuals and feeling work together.
• We sound personal and grounded.
• Creativity feels human, not showy.`,
      };
    return {
      title: "Full Empathy",
      text: `Gentle, emotional, present.
• Ideas begin with understanding.
• We write to include, not impress.
• Every phrase builds connection.`,
    };
  };

  const getClarityEmpathyDescription = (v: number) => {
    if (v <= 2)
      return {
        title: "Pure Clarity",
        text: `Structured and analytical.
• Facts lead, emotion follows later.
• Sentences stay short and precise.
• Confidence replaces comfort.`,
      };
    if (v <= 4)
      return {
        title: "Structured Awareness",
        text: `Balanced logic with light care.
• We deliver facts gently.
• Sentences inform without friction.
• Tone is crisp yet polite.`,
      };
    if (v <= 6)
      return {
        title: "Balanced Clarity and Empathy",
        text: `Equal reason and care.
• Every idea respects the reader.
• We teach through warmth.
• The voice feels capable and kind.`,
      };
    if (v <= 8)
      return {
        title: "Empathic Precision",
        text: `Human but exact.
• Clarity shaped through understanding.
• Logic stays soft at the edges.
• Precision feels personal.`,
      };
    return {
      title: "Full Empathy",
      text: `Understanding first.
• We sound patient and real.
• Emotion shapes the structure.
• Reader comfort defines clarity.`,
    };
  };

  const getOverallDescription = (v: number) => {
    if (v <= 2)
      return {
        title: "Grounded Balance",
        text: `Calm and steady.
• Short, clear sentences guide tone.
• Confidence comes from restraint.
• Every line breathes.`,
      };
    if (v <= 4)
      return {
        title: "Composed Flow",
        text: `Measured and fluent.
• Ideas connect smoothly.
• No forced urgency.
• Voice feels controlled and clear.`,
      };
    if (v <= 6)
      return {
        title: "Dynamic Equilibrium",
        text: `Balanced rhythm and focus.
• Writing feels awake, not loud.
• Flow stays even and natural.
• Clarity meets motion.`,
      };
    if (v <= 8)
      return {
        title: "Driven Momentum",
        text: `Strong pacing, steady tone.
• Each sentence builds to action.
• Focus stays sharp, not rushed.
• We lead by example, not pressure.`,
      };
    return {
      title: "Full Momentum",
      text: `Confident and fast.
• Movement defines message.
• Sentences strike cleanly.
• The reader feels energized.`,
      };
  };

  // ─────────────────────────────────────────────
  // Slider Component (unchanged)
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
