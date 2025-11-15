'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function ExistingUserPage() {
  const searchParams = useSearchParams();
  const firstName = searchParams.get('name') || 'there';

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-16 pb-20 bg-white text-gray-800">
      <Image
        src="https://omnipressence.com/wp-content/uploads/2025/09/Gensen-Logo-Final-version-lower-case-logo-and-spaces1-356x295-1.webp"
        alt="GENSEN Logo"
        width={260}
        height={215}
        priority
        className="mb-6 rounded-[20px]"
      />

      <p className="text-2xl text-center max-w-2xl leading-relaxed mb-8">
        Welcome back, <span className="font-semibold">{firstName}</span>. Your Brand Voice
        profile is already active in the Omnipressence system.
      </p>

      <div className="max-w-2xl text-center mb-10 text-[18px] text-gray-700 leading-relaxed">
        <p className="mb-4">
          Your brand voice should feel like a steady rhythm. When it stays consistent, people
          learn to trust it and respond to it. Creating a second version of your voice works
          against that rhythm. It pulls tone in two directions and forces your audience to
          guess which version represents you.
        </p>

        <p className="mb-6">
          One clear voice keeps everything aligned. It helps your content sound like the same
          confident team behind every post, email, and page. That clarity becomes an advantage.
          It removes confusion, strengthens recognition, and lets you grow without diluting
          the message your audience has already connected with.
        </p>

        <p className="mb-8 text-gray-600 italic">
          If anything changes in your business, we can update your voice together. There’s no
          need to start from scratch — just reach out and we’ll guide the update with you.
        </p>

        <p className="mb-10">
          To request an update, contact{' '}
          <a
            href="mailto:brad@omnipressence.com"
            className="text-[#076aff] underline font-semibold"
          >
            Brad Grant, Chief Client Officer
          </a>.
        </p>
      </div>

      <a
        href="https://portal.omnipressence.com/dashboard/brand-voice"
        className="px-6 py-3 bg-[#076aff] text-white rounded-md hover:bg-[#002c71] transition text-lg font-medium shadow"
      >
        Go to Your Brand Voice Dashboard
      </a>

      <div className="border-t border-gray-200 pt-6 mt-12 w-full max-w-2xl text-center">
        <p className="text-lg text-gray-500">
          Reliable consistency is part of your edge. GENSEN keeps it that way.
        </p>
      </div>
    </main>
  );
}
