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

  const handleChange = (key: keyof SliderScores, value: number) => {
    setSliders((prev) => ({ ...prev, [key]: value }));
  };

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
        text: `You lead entirely with empathy and trust. Every sentence feels like conversation—patient, kind, and grounded. 
  The message reassures before it persuades. People feel cared for, not directed.
  
  Example:
  We don’t push for attention—we earn it.
  Each message starts with understanding and ends with calm clarity.
  Your tone gives readers room to breathe and believe.`,
      };
  
    if (value <= 4)
      return {
        title: "Gentle Warmth",
        text: `You keep connection first but start to show structure. The language stays compassionate yet purposeful. 
  You sound approachable, thoughtful, and reliable without losing softness.
  
  Example:
  We listen before we guide.
  Each plan begins with care and builds toward clarity.
  Your voice reminds people that empathy and confidence can coexist.`,
      };
  
    if (value <= 6)
      return {
        title: "Balanced Core",
        text: `You sound like a steady professional who leads with care and finishes with conviction. 
  The tone feels human but guided—half warmth, half authority. It shows confidence without dominance.
  
  Example:
  You already know what matters; we help you say it clearly.
  Every line teaches through trust, blending heart and structure until the message feels both credible and kind.`,
      };
  
    if (value <= 8)
      return {
        title: "Guided Authority",
        text: `Direction becomes clearer now. You speak with confidence and purpose while keeping the edges smooth. 
  The tone commands respect but never sacrifices understanding.
  
  Example:
  We clarify before we convince.
  Each idea lands with precision and poise.
  Your audience feels guided, not managed—led by expertise that listens.`,
      };
  
    return {
      title: "Full Authority",
      text: `You communicate with total conviction and clarity. 
  Every word feels intentional and sharp. The tone is professional, decisive, and inspiring—built for trust and action.
  
  Example:
  We don’t wait for clarity—we create it.
  Each sentence defines direction and moves work forward.
  Your message stands firm, setting pace and confidence for everyone listening.`,
    };
  };
  

  // ─────────────────────────────────────────────
  // Authority ↔ Energy
  // ─────────────────────────────────────────────
  const getAuthorityEnergyDescription = (value: number) => {
    if (value <= 3)
      return {
        title: "Measured Authority",
        text: `You stay composed and deliberate. Your message moves with purpose, not urgency. Every statement feels grounded, intentional, and confident without pressure.\n\nExample:\nProgress comes from steady focus.\nEach plan unfolds with logic and trust.\nYou don’t rush decisions - you guide them.\nThat’s how strong direction becomes lasting momentum.`,
      };
    if (value <= 7)
      return {
        title: "Balanced Drive",
        text: `You stay in motion with purpose in your stride. Each plan starts clear, gains pace, and keeps its line. The tone feels alive yet measured enough to listen.\n\nExample:\nYou make progress visible, one confident decision at a time.\nPeople follow because you balance speed with sense.\nYour clarity keeps the pace productive, not frantic.`,
      };
    return {
      title: "Full Energy",
      text: `You speak with visible intent. Each message sparks urgency and drive. You keep clarity high but momentum higher - pushing ideas forward with conviction and rhythm.\n\nExample:\nEvery choice signals action.\nWe move when others wait.\nEach message propels people to act - fast, clear, and focused on the next step.`,
    };
  };

  // ─────────────────────────────────────────────
  // Warmth ↔ Energy (V2.1)
  // ─────────────────────────────────────────────
  const getWarmthEnergyDescription = (value: number) => {
    if (value <= 3)
      return {
        title: "Pure Warmth",
        text: `You speak with steady calm that earns trust before you ever make a point. The tone feels like a guide’s hand - patient, kind, always composed. You make complexity simple by slowing the pace until clarity appears.\n\nExample:\nWe take time to listen before we lead.\nThe goal isn’t speed: it’s strength that lasts.\nWhen people feel supported and understood, they move forward naturally.\nThat’s how lasting progress begins.`,
      };
    if (value <= 7)
      return {
        title: "Balanced Warm Energy",
        text: `Your tone walks the line between warmth and motion. There’s empathy in your rhythm and confidence in your direction. You move people by showing that action can feel calm, and calm can still create change.\n\nExample:\nYou already know where you’re headed - we just help you move with purpose.\nEvery message carries balance: part encouragement, part direction.\nStep by step, clarity turns into progress.`,
      };
    return {
      title: "Pure Energy",
      text: `You sound sharp, focused, alive. The language carries weight and movement - fast but never rushed. Every word pushes forward with intent, turning clarity into drive.\n\nExample:\nMomentum doesn’t wait.\nIt starts with the next word, the next idea, the next step.\nSpeak with conviction, act with rhythm, and let motion do the talking.`,
    };
  };
// ─────────────────────────────────────────────
// Clarity ↔ Creativity (V2.1)
// ─────────────────────────────────────────────
const getClarityCreativityDescription = (value: number) => {
  if (value <= 3)
    return {
      title: "Pure Clarity",
      text: `You write to reveal, not impress. Every sentence has purpose and calm precision. The tone builds instant trust by removing clutter and letting meaning lead. It’s confident, respectful, and easy to follow - a voice people rely on when they need direction.\n\nExample:\nStrong ideas speak plainly.\nYou don’t decorate truth: you define it.\nThe right words build understanding, one clear decision at a time.`,
    };
  if (value <= 7)
    return {
      title: "Balanced Expression",
      text: `Your voice moves with logic and light. Structure gives your ideas shape; tone gives them life. You teach, inspire, and lead through rhythm - showing that clarity and creativity don’t compete; they collaborate.\n\nExample:\nFacts earn attention, but tone keeps it.\nYou turn explanation into engagement, turning each insight into something people can see, feel, and remember.`,
    };
  return {
    title: "Pure Creativity",
    text: `You speak in motion. The words paint, pulse, and connect instantly. Meaning becomes story; insight becomes emotion. You stretch language just enough to wake the reader - never to lose them.\n\nExample:\nAn idea isn’t finished until it moves someone.\nYou bring logic to life, adding rhythm where others stop at reason.\nThe message doesn’t just explain - it resonates.`,
  };
};
// ─────────────────────────────────────────────
// Creativity ↔ Empathy (V2.2)
// ─────────────────────────────────────────────
const getCreativityEmpathyDescription = (value: number) => {
  if (value <= 3)
    return {
      title: "Pure Creativity",
      text: `You think in color and shape. Every idea arrives like a spark - surprising but deliberate. The tone inspires curiosity, turning complex thoughts into something people can see, hear, and almost feel. You write to open minds, not to impress them.\n\nExample:\nYou build bridges out of imagination.\nEach line paints movement, like a brush across water.\nYour stories expand what feels possible, while still keeping both feet on the ground.`,
    };
  if (value <= 7)
    return {
      title: "Balanced Creative Empathy",
      text: `You speak in rhythm - half insight, half heartbeat. Ideas start vivid, then soften into understanding. The tone shows awareness: bold enough to catch attention, gentle enough to keep it. People feel guided, not directed.\n\nExample:\nYou use creativity as connection.\nEvery phrase carries warmth beneath the structure.\nYou turn inspiration into belonging - showing people they are part of the idea, not the audience of it.`,
    };
  return {
    title: "Pure Empathy",
    text: `You write like you’re in the same room as your reader. Each word lands with care, creating calm in the noise. The message doesn’t push: it invites. People listen because they feel seen, not sold to.\n\nExample:\nYou start with listening, then translate what you hear into language that feels human.\nYour writing doesn’t persuade - it understands.\nThat understanding builds trust, and trust opens doors that logic alone never could.`,
  };
};
// ─────────────────────────────────────────────
// Clarity ↔ Empathy (V2.1)
// ─────────────────────────────────────────────
const getClarityEmpathyDescription = (value: number) => {
  if (value <= 3)
    return {
      title: "Pure Clarity",
      text: `You write like an architect - deliberate, structured, exact. Every word fits its place, every line holds weight. You focus on understanding above emotion, building trust through logic and clean rhythm.\n\nExample:\nYou keep your language simple so your message feels strong.\nFacts do the work; tone stays neutral.\nYou make complex ideas sound obvious - that’s your quiet power.`,
    };
  if (value <= 7)
    return {
      title: "Balanced Clarity and Empathy",
      text: `You blend precision with awareness. The tone feels clear but not cold, thoughtful but not hesitant. You explain first, then connect. Each sentence gives people both the “what” and the “why.”\n\nExample:\nYou shape your message so it feels like conversation, not instruction.\nYou guide people through logic and care at once.\nThey finish reading with clarity - and confidence that you understand them.`,
    };
  return {
    title: "Pure Empathy",
    text: `You write to reach people where they are. Your words carry patience, kindness, and respect. Clarity still matters, but understanding leads. The tone feels human, like conversation between equals.\n\nExample:\nYou speak in sentences that listen.\nYou replace authority with understanding.\nReaders feel calm and seen — and that’s what keeps them engaged.`,
  };
};
// ─────────────────────────────────────────────
// Overall Tone Balance (V3.5 — Capstone Field)
// ─────────────────────────────────────────────
const getOverallDescription = (value: number) => {
  if (value <= 3)
    return {
      title: "Grounded Balance",
      text: `You write with measured pace and deliberate rhythm. Each thought feels anchored, considered, and steady. The sentences breathe; they give space for understanding. This tone removes friction and creates psychological safety - the reader never feels rushed or overwhelmed. You communicate confidence by doing less, saying only what must be said, and letting the weight of clarity speak for itself. Your words sound like focus, your rhythm like trust being built in real time.\n\nExample:\nYou open with calm assurance - short, precise sentences that sound composed.\nEach paragraph invites reflection rather than reaction.\nYou use pauses as part of persuasion, allowing people to feel the meaning before they process it.\nThis is the rhythm of expertise: the slower you speak, the faster they believe.`,
    };
  if (value <= 7)
    return {
      title: "Dynamic Equilibrium",
      text: `You balance poise with progress. The message moves forward, but each idea has room to land. This tone feels confident yet conversational - the kind of voice that can energize a team meeting or calm a stakeholder in the same breath. You use cadence as a design tool: alternating tempo, sentence length, and emphasis to keep readers mentally active while emotionally grounded. Every section feels like guidance in motion - measured, clear, alive.\n\nExample:\nYou build rhythm through variation - one short line to focus attention, one longer to expand meaning.\nYour tone rises and settles like breathing - movement without chaos.\nYou sound approachable but composed, blending expert certainty with human rhythm.\nThe result: content that feels alive, not loud; confident, not cold.`,
    };
  return {
    title: "Forward Momentum",
    text: `You write with kinetic energy and clarity fused together. Each paragraph carries pulse and direction, like a well-timed stride. You use movement as meaning - verbs lead, sentences flow, ideas escalate naturally. The tone projects vision and competence: it doesn’t wait for change, it initiates it. Your writing feels awake, physical, and focused - every phrase propels understanding forward. This is where communication turns into leadership.\n\nExample:\nYou start strong, finish stronger - each sentence builds pressure toward action.\nYour verbs carry muscle: move, build, align, deliver.\nParagraphs unfold like momentum you can hear - fast enough to inspire, clear enough to trust.\nReaders don’t just follow your message; they feel themselves accelerate with it.`,
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
