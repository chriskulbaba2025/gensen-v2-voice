'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '../../context/FormContext';
import { useState, useEffect } from 'react';
import ProgressBar from '@/components/ProgressBar';

export default function Step2() {
  const router = useRouter();
  const { data, setData } = useForm();

  const [sliders, setSliders] = useState(
    data.sliderScores || {
      emotional: 5,
      expressive: 5,
      overall: 5,
    }
  );

  useEffect(() => {
    setData({ sliderScores: sliders });
  }, [sliders]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setData({ sliderScores: sliders });
    router.push('/screen-3');
  };

  const handleBack = () => router.back();

  const handleSliderChange = (key: keyof typeof sliders, value: number) => {
    setSliders((prev) => ({ ...prev, [key]: value }));
  };

  // === Slider 1: Warmth–Authority–Energy ===
  const getToneDescriptor = (value: number) => {
    if (value <= 2)
      return {
        label: 'Pure Warmth',
        example:
          'Empathetic and steady. Human, calm, grounded. Guides gently, never sells. Example: “We get it. Content takes time. Let’s make that time count.”',
      };
    if (value === 3)
      return {
        label: 'Warm Authority',
        example:
          'Supportive leader. Balances empathy with quiet confidence. Example: “You don’t need louder content. You need content that earns trust.”',
      };
    if (value === 4)
      return {
        label: 'Authoritative with Warmth',
        example:
          'Assured and instructive without edge. Expert who listens first. Example: “Consistency builds confidence. Let’s start there.”',
      };
    if (value >= 5 && value <= 6)
      return {
        label: 'Pure Authority',
        example:
          'Composed, strategic, outcome driven. Minimal emotion, maximum clarity. Example: “The plan is simple. Align your voice. Publish on rhythm. Measure results.”',
      };
    if (value === 7)
      return {
        label: 'Authoritative with Energy',
        example:
          'Confident momentum. Encouraging, not pushy. Example: “You already know the message. Let’s move it into motion.”',
      };
    if (value === 8)
      return {
        label: 'Energetic Authority',
        example:
          'Fast but controlled. Precision with pace. Example: “Momentum matters. Every post should pull the next one forward.”',
      };
    return {
      label: 'Pure Energy',
      example:
        'Focused drive. Sounds like action itself, never chaos. Example: “You’ve got clarity. Now execute before the spark fades.”',
    };
  };

  // === Slider 2: Clarity–Creativity–Empathy ===
  const getExpressionDescriptor = (value: number) => {
    if (value <= 2)
      return {
        label: 'Pure Clarity',
        example:
          'Structured and concise. Every word serves understanding. Example: “Clear ideas build trust faster than clever words.”',
      };
    if (value === 3)
      return {
        label: 'Clarity with Creativity',
        example:
          'Grounded logic with subtle spark. Example: “Facts tell the story, but phrasing gives it rhythm.”',
      };
    if (value === 4)
      return {
        label: 'Balanced Expression',
        example:
          'Measured and intentional. Combines clear reasoning with personality. Example: “Good writing shows its thinking without showing off.”',
      };
    if (value >= 5 && value <= 6)
      return {
        label: 'Pure Creativity',
        example:
          'Inventive but still disciplined. Adds tone and story to structure. Example: “Ideas work harder when language moves with purpose.”',
      };
    if (value === 7)
      return {
        label: 'Creative with Empathy',
        example:
          'Expressive yet emotionally intelligent. Example: “Write like you know who’s on the other side of the screen.”',
      };
    if (value === 8)
      return {
        label: 'Empathetic Creativity',
        example:
          'Warm imagination with awareness. Example: “Stories that care connect faster than statements that prove.”',
      };
    return {
      label: 'Pure Empathy',
      example:
        'Emotion led and people first. Example: “Say it the way your audience needs to hear it, not the way you need to say it.”',
    };
  };

  // === Slider 3: Combined Tone Balance ===
  const getBalanceDescriptor = (value: number) => {
    if (value <= 2)
      return {
        label: 'Grounded Balance',
        example:
          'Calm and deliberate. Reflective tone that values space and thought. Example: “Every message earns attention through clarity, not volume.”',
      };
    if (value === 3)
      return {
        label: 'Measured Rhythm',
        example:
          'Reflective but beginning to build flow. Example: “Keep the pace steady and the message aligned.”',
      };
    if (value === 4)
      return {
        label: 'Assured Flow',
        example:
          'Balanced energy with confidence. Example: “When your tone moves with purpose, people trust your message.”',
      };
    if (value >= 5 && value <= 6)
      return {
        label: 'Pure Balance',
        example:
          'Calm meets drive. Predictable rhythm with flexible tone. Example: “Each piece fits cleanly into the rhythm of your brand.”',
      };
    if (value === 7)
      return {
        label: 'Dynamic Balance',
        example:
          'Smooth momentum, alive but measured. Example: “Energy is valuable when it keeps clarity intact.”',
      };
    if (value === 8)
      return {
        label: 'Energized Rhythm',
        example:
          'Fast yet controlled, agile tone with strategic pacing. Example: “Keep your message sharp enough to move fast and still stay clear.”',
      };
    return {
      label: 'Forward Momentum',
      example:
        'Peak movement and drive. Inspires consistent action without noise. Example: “Your brand speaks like it’s already moving forward.”',
    };
  };

  const tone = getToneDescriptor(sliders.emotional);
  const expression = getExpressionDescriptor(sliders.expressive);
  const balance = getBalanceDescriptor(sliders.overall);

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-12 mb-20">
      <ProgressBar step={2} total={4} />

      <h1 className="text-2xl font-bold mb-4 text-center">
        Step 2: Tune Your Brand Voice
      </h1>

      <p className="text-gray-600 text-center max-w-2xl mb-10 leading-relaxed">
        This section helps define how your voice sounds in practice. Each slider shapes tone,
        clarity, and overall energy so the system understands your natural rhythm.
      </p>

      {/* === Card 1 === */}
      <section className="bg-gray-50 border rounded-lg p-6 shadow-sm w-full max-w-3xl mb-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Warmth ↔ Authority ↔ Energy
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Adjust this to set how confident or relaxed your brand sounds. It balances
          approachability, control, and pace.
        </p>
        <input
          type="range"
          min={1}
          max={10}
          value={sliders.emotional}
          onChange={(e) => handleSliderChange('emotional', Number(e.target.value))}
          className="w-full accent-[#076aff]"
        />
        <div className="flex justify-between items-center mt-2 mb-2">
          <p className="text-sm font-medium text-gray-700">{tone.label}</p>
          <p className="text-sm text-gray-500">Tone Level: {sliders.emotional}</p>
        </div>
        <p className="text-sm italic text-gray-700 leading-relaxed">{tone.example}</p>
      </section>

      {/* === Card 2 === */}
      <section className="bg-gray-50 border rounded-lg p-6 shadow-sm w-full max-w-3xl mb-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Clarity ↔ Creativity ↔ Empathy
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Adjust this to define how imaginative or structured your message feels. It balances
          precision with personality and emotional awareness.
        </p>
        <input
          type="range"
          min={1}
          max={10}
          value={sliders.expressive}
          onChange={(e) => handleSliderChange('expressive', Number(e.target.value))}
          className="w-full accent-[#076aff]"
        />
        <div className="flex justify-between items-center mt-2 mb-2">
          <p className="text-sm font-medium text-gray-700">{expression.label}</p>
          <p className="text-sm text-gray-500">Tone Level: {sliders.expressive}</p>
        </div>
        <p className="text-sm italic text-gray-700 leading-relaxed">{expression.example}</p>
      </section>

      {/* === Card 3 === */}
      <section className="bg-gray-50 border rounded-lg p-6 shadow-sm w-full max-w-3xl mb-10">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Combined Tone Balance
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          This overall slider represents your complete brand tone blend. It helps the system gauge
          your preferred rhythm and balance across messages.
        </p>
        <input
          type="range"
          min={1}
          max={10}
          value={sliders.overall}
          onChange={(e) => handleSliderChange('overall', Number(e.target.value))}
          className="w-full accent-[#076aff]"
        />
        <div className="flex justify-between items-center mt-2 mb-2">
          <p className="text-sm font-medium text-gray-700">{balance.label}</p>
          <p className="text-sm text-gray-500">Tone Level: {sliders.overall}</p>
        </div>
        <p className="text-sm italic text-gray-700 leading-relaxed">{balance.example}</p>
      </section>

      {/* === Navigation Buttons === */}
      <div className="flex justify-between w-full max-w-3xl">
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
