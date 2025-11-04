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
  We don’t push for attention - we earn it.
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
  The tone feels human but guided by both warmth and authority - half warmth, half authority. It shows confidence without dominance.
  
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
  Your audience feels guided, not managed -led by expertise that listens.`,
      };
  
    return {
      title: "Full Authority",
      text: `You communicate with total conviction and clarity. 
  Every word feels intentional and sharp. The tone is professional, decisive, and inspiring—built for trust and action.
  
  Example:
  We don’t wait for clarity - we create it.
  Each sentence defines direction and moves work forward.
  Your message stands firm, setting pace and confidence for everyone listening.`,
    };
  };
  

  // ─────────────────────────────────────────────
  // Authority ↔ Energy
  // ─────────────────────────────────────────────
  const getAuthorityEnergyDescription = (value: number) => {
    if (value <= 2)
      return {
        title: "Measured Authority",
        text: `You move with deliberate calm. The tone projects confidence through precision, not pace. 
  Every line sounds composed and dependable - no urgency, just steady leadership.
  
  Example:
  We plan, prepare, and deliver with purpose.
  Each step follows logic and trust.
  Progress comes from focus, not force.`,
      };
  
    if (value <= 4)
      return {
        title: "Confident Control",
        text: `You keep authority at the center but introduce momentum. 
  The message feels structured and active, balancing patience with forward intent.
  
  Example:
  We move when direction is clear.
  Every choice follows reasoning, not reaction.
  Your words set order before acceleration.`,
      };
  
    if (value <= 6)
      return {
        title: "Balanced Drive",
        text: `You sound like a poised leader in motion - calm yet compelling. 
  Authority and energy are equal partners: decisions come quickly, but never carelessly.
  
  Example:
  You build movement through focus.
  Each idea finds its pace naturally.
  Energy follows clarity, never the other way around.`,
      };
  
    if (value <= 8)
      return {
        title: "Driven Authority",
        text: `Momentum now leads. The tone feels active, direct, and clear. 
  You’re still composed, but every sentence carries velocity and direction.
  
  Example:
  We act when others wait.
  Our plans move with purpose and precision.
  Speed matters, but alignment matters more - and we keep both.`,
      };
  
    return {
      title: "Full Energy",
      text: `You speak with decisive action and conviction. 
  The language is tight, rhythmic, and forward-leaning. Authority fuels urgency, creating a voice that mobilizes others.
  
  Example:
  We start fast and stay focused.
  Every line signals motion and intent.
  The tone doesn’t pause - it performs.`,
    };
  };
  

  // ─────────────────────────────────────────────
  // Warmth ↔ Energy (V2.1)
  // ─────────────────────────────────────────────
  const getWarmthEnergyDescription = (value: number) => {
    if (value <= 2)
      return {
        title: "Full Warmth",
        text: `You speak slowly, gently, and with care. The tone prioritizes comfort and understanding over momentum. 
  Your presence is calm and genuine - readers feel supported before inspired.
  
  Example:
  We take time to listen before we lead.
  The goal isn't speed; it's strength that lasts.
  Clarity grows when calm leads the way.`,
      };
  
    if (value <= 4)
      return {
        title: "Gentle Flow",
        text: `Warmth still guides, but the message begins to move. 
  The tone feels kind yet purposeful, encouraging progress without losing empathy.
  
  Example:
  We lead with heart, then with motion.
  Every idea moves forward at a human pace.
  You bring calm energy - steady, confident, and clear.`,
      };
  
    if (value <= 6)
      return {
        title: "Balanced Warm Energy",
        text: `You sound approachable yet active. The voice carries empathy wrapped in momentum - soft edges with firm direction. 
  It feels friendly and productive at once.
  
  Example:
  You already know where you're headed; we help you move with intention.
  Each line blends encouragement and drive.
  Action feels natural, never forced.`,
      };
  
    if (value <= 8)
      return {
        title: "Active Energy",
        text: `Energy starts leading, but warmth keeps tone human. 
  You move quickly while staying kind - showing that urgency and empathy can coexist.
  
  Example:
  We act with empathy and pace.
  Momentum builds trust when every move feels considered.
  Your tone inspires motion, not pressure.`,
      };
  
    return {
      title: "Full Energy",
      text: `You communicate with vitality and speed. The tone is bright, confident, and forward. 
  You drive action through conviction while still sounding alive and human.
  
  Example:
  Momentum doesn't wait.
  Each sentence moves with intent and rhythm.
  People follow because they feel your energy translating into progress.`,
    };
  };
  
// ─────────────────────────────────────────────
// Clarity ↔ Creativity (V2.1)
// ─────────────────────────────────────────────
const getClarityCreativityDescription = (value: number) => {
  if (value <= 2)
    return {
      title: "Pure Clarity",
      text: `You write with surgical precision. Every word has a job; every line has logic. 
The tone removes friction, replacing flourish with focus. You build trust through structure and calm reasoning.

Example:
Strong ideas speak plainly.
We don't decorate truth - we define it.
Meaning stands on its own when language stays simple.`,
    };

  if (value <= 4)
    return {
      title: "Structured Expression",
      text: `You still lead with clarity but start to shape rhythm and tone. 
The message reads cleanly yet has subtle cadence. The writing feels confident, not mechanical.

Example:
We explain before we impress.
Each idea unfolds with order and ease.
Your tone guides readers step by step until understanding feels natural.`,
    };

  if (value <= 6)
    return {
      title: "Balanced Expression",
      text: `Clarity and creativity share equal ground. The structure stays strong while imagination adds color. 
You sound intelligent, modern, and alive - never abstract or rigid.

Example:
Facts earn trust; tone keeps it.
We build logic into rhythm so ideas stay memorable.
Clarity and creativity work as one voice.`,
    };

  if (value <= 8)
    return {
      title: "Creative Logic",
      text: `Creativity now leads but still respects order. 
You play with phrasing, pacing, and visuals to make information breathe. Each idea feels both crafted and clear.

Example:
We paint with precision.
Every insight becomes a story that teaches and inspires.
Structure frames the art - it doesn't limit it.`,
    };

  return {
    title: "Full Creativity",
    text: `You communicate through imagination and movement. 
Meaning becomes experience - words carry rhythm, color, and surprise while staying intelligible.

Example:
An idea isn't finished until it moves someone.
We turn insight into story and pattern into pulse.
The message doesn't just inform - it resonates.`,
  };
};

// ─────────────────────────────────────────────
// Creativity ↔ Empathy (V2.2)
// ─────────────────────────────────────────────
const getCreativityEmpathyDescription = (value: number) => {
  if (value <= 2)
    return {
      title: "Pure Creativity",
      text: `You think and write in visuals. The tone surprises, using metaphor and rhythm to awaken curiosity. 
Your message feels original, expressive, and daring—but still grounded in meaning.

Example:
You build bridges out of imagination.
Each line feels like movement, not repetition.
You make ideas visible before they're explained.`,
    };

  if (value <= 4)
    return {
      title: "Creative Flow",
      text: `Imagination leads, but connection begins to surface. 
You sound inspired and human, turning abstract thinking into approachable insight.

Example:
You translate vision into understanding.
Every phrase blends art with intent.
Your creativity becomes a doorway, not a wall.`,
    };

  if (value <= 6)
    return {
      title: "Balanced Creative Empathy",
      text: `You speak with rhythm and awareness in equal measure. 
Your ideas start vivid, then settle into human truth. People feel guided, not dazzled.

Example:
We use creativity as connection.
Every phrase carries warmth beneath the structure.
Inspiration becomes belonging when readers see themselves in your story.`,
    };

  if (value <= 8)
    return {
      title: "Empathic Imagination",
      text: `Empathy takes the lead, but creativity still shines. 
You express understanding through story, tone, and emotional precision.

Example:
We write like we're in the same room.
Each story listens before it speaks.
You show care through creativity that feels honest, not ornamental.`,
    };

  return {
    title: "Full Empathy",
    text: `You communicate like a conversation between equals. 
Every word is patient, human, and real. Creativity serves compassion - helping readers feel seen.

Example:
We don't write to impress; we write to connect.
Each line starts with listening.
People stay because they sense understanding in your rhythm.`,
  };
};
// ─────────────────────────────────────────────
// Clarity ↔ Empathy (5-band version)
// ─────────────────────────────────────────────
const getClarityEmpathyDescription = (value: number) => {
  if (value <= 2)
    return {
      title: "Pure Clarity",
      text: `You write like an architect - structured, exact, and intentional. 
Every line aims to inform with zero ambiguity. The tone builds instant trust through order and restraint.

Example:
We remove noise so meaning stands taller.
Each word earns its place.
Readers trust you because nothing feels accidental.`,
    };

  if (value <= 4)
    return {
      title: "Structured Awareness",
      text: `Clarity still leads, but compassion begins to shape delivery. 
Your tone sounds confident and rational yet lightly human. The focus is on helping readers understand easily.

Example:
We keep ideas crisp but kind.
Each point teaches, not just tells.
Understanding feels simple because care shapes the structure.`,
    };

  if (value <= 6)
    return {
      title: "Balanced Clarity and Empathy",
      text: `You blend reason with recognition. 
The tone explains first, then connects. Readers feel guided - not corrected - through precise but approachable language.

Example:
You shape conversation, not instruction.
Each paragraph mixes logic and care.
People finish reading both informed and understood.`,
    };

  if (value <= 8)
    return {
      title: "Empathic Precision",
      text: `Empathy now shapes every clear point. 
You still sound organized, but warmth fills the pauses. The tone feels human and deliberate—connection delivered through structure.

Example:
We explain with kindness.
Our clarity builds comfort as much as comprehension.
Each message proves you can be exact and human at once.`,
    };

  return {
    title: "Full Empathy",
    text: `You write to understand before being understood. 
Logic supports emotion instead of leading it. Every sentence feels like shared space and respect.

Example:
We speak in sentences that listen.
Readers hear care between every line.
When empathy becomes method, clarity follows naturally.`,
  };
};

// ─────────────────────────────────────────────
// Overall Tone Balance (V3.5 — Capstone Field)
// ─────────────────────────────────────────────
const getOverallDescription = (value: number) => {
  if (value <= 2)
    return {
      title: "Grounded Balance",
      text: `You write with calm focus and steady rhythm. 
Every idea feels intentional, every pause deliberate. 
This tone builds safety and credibility - the reader never feels hurried or overwhelmed.

Example:
We speak slowly so meaning has space to land.
Short lines. Clear points.
The rhythm itself builds trust.`,
    };

  if (value <= 4)
    return {
      title: "Composed Flow",
      text: `You maintain poise but add light movement. 
Each section flows smoothly, balancing stillness with progression. 
The writing feels confident and attentive without sounding rigid.

Example:
We move through ideas at a natural pace.
Each sentence clears the way for the next.
Readers feel guided - not managed.`,
    };

  if (value <= 6)
    return {
      title: "Dynamic Equilibrium",
      text: `Clarity and rhythm share equal space. 
You sound calm but active, confident but approachable. 
The tone adapts to context, energizing without losing precision.

Example:
One short sentence to focus attention.
One longer to expand the meaning.
Your tone breathe smoothly - measured, clear, and alive.`,
    };

  if (value <= 8)
    return {
      title: "Driven Momentum",
      text: `The pace quickens. 
You speak with decisive motion while staying articulate and grounded. 
Your writing sounds like leadership in motion - steady but forward.

Example:
We lead through movement, not volume.
Each idea drives the next.
The tone feels fast, but never frantic.`,
    };

  return {
    title: "Full Momentum",
    text: `You write with precision and velocity fused together. 
Each paragraph carries pulse and direction. 
The tone inspires, commands, and drives action without noise.

Example:
We start strong, finish stronger.
Every line propels the reader forward.
You sound like motion turned into message - energy made clear.`,
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
