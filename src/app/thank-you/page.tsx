'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-[#076aff] mb-4">
          Your Brand Voice Has Been Activated
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Your brand voice is officially live and making moves.
          <br />
          It’s already on its way to your inbox, and we’ve safely stored a backup in your private GENSENOLOGY folder.
        </p>

        <p className="text-gray-700 mb-4">
          Before diving into content creation, take a moment to review your voice.  
          Want any refinements — tone tweaks or a human polish? Reach out anytime.
        </p>

        <div className="mb-6">
          <Image
            src="https://responsegenerators.ca/wp-content/uploads/2025/07/current-crop-1-1.webp"
            alt="GENSEN Content Types"
            width={600}
            height={400}
            className="rounded-lg shadow mx-auto"
          />
        </div>

        <p className="text-lg font-semibold mb-4">
          Ready to put your voice to work?
        </p>

        <button
          onClick={() => router.push('/generate')} // Placeholder route
          className="px-6 py-3 bg-[#f66630] text-white font-medium rounded hover:bg-[#e6551a] transition-colors duration-200"
        >
          Start Creating with My Brand Voice
        </button>

        <p className="mt-6 text-sm text-gray-600">
          Need adjustments? Contact Brad Grant, Chief Client Officer: <br />
          <a
            href="mailto:brad@rgdirect.com"
            className="text-[#076aff] hover:underline"
          >
            brad@rgdirect.com
          </a>
        </p>
      </div>
    </main>
  );
}
