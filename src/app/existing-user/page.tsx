'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function ExistingUserPage() {
  const searchParams = useSearchParams();
  const [firstName, setFirstName] = useState('there');

  // Avoid SSR mismatch by reading searchParams in effect
  useEffect(() => {
    const name = searchParams.get('name');
    if (name) setFirstName(name);
  }, [searchParams]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-16 pb-20 bg-white text-gray-800">
      
      {/* Logo */}
      <Image
        src="https://omnipressence.com/wp-content/uploads/2025/09/Gensen-Logo-Final-version-lower-case-logo-and-spaces1-356x295-1.webp"
        alt="GENSEN Logo"
        width={260}
        height={215}
        priority
        className="mb-6 rounded-[20px]"
      />

      {/* Title */}
      <p className="text-2xl text-center max-w-2xl leading-relaxed mb-8">
        Welcome back, <span className="font-semibold">{firstName}</span>.  
        Your Brand Voice profile already exists in the Omnipressence system.
      </p>

      {/* Body Copy */}
      <div className="max-w-2xl text-center mb-10 text-[18px] text-gray-700 leading-relaxed">
        <p className="mb-4">
          Your brand voice should feel like a steady rhythm. Once it’s established, 
          maintaining that consistency creates trust and recognition. Creating a new 
          version splits your presence and weakens that clarity.
        </p>

        <p className="mb-6">
          A single, unified voice carries your message across every channel with strength.  
          If your business evolves, we can refine and update your existing voice rather than restart.
        </p>

        <p className="mb-8 text-gray-600 italic">
          If anything shifts in your brand, we can adjust your voice together.  
          There’s no need to rebuild — just reach out.
        </p>

        <p className="mb-10">
          For updates, contact{' '}
          <a
            href="mailto:brad@omnipressence.com"
            className="text-[#076aff] underline font-semibold"
          >
            Brad Grant, Chief Client Officer
          </a>.
        </p>
      </div>

      {/* Continue to Step 2 */}
 <a
  href="/screen-2"
  className="px-6 py-3 bg-[#076aff] text-[#ffffff] rounded-md hover:bg-[#002c71] transition text-lg font-medium shadow"
>
  Continue
</a>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 mt-12 w-full max-w-2xl text-center">
        <p className="text-lg text-gray-500">
          Reliable consistency is part of your edge. GENSEN keeps it that way.
        </p>
      </div>
    </main>
  );
}
