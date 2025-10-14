'use client';

import Image from 'next/image';
import { useForm } from '@/context/FormContext';

export default function ExistingUserPage() {
  const { data } = useForm();
  const firstName = data?.firstName || 'there';

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
  Welcome back, <span className="font-semibold">{firstName}</span> — your Brand Voice
  profile is already active in the Omnipressence system.
  <br />
  <br />
  If you’d like to update or refine your Brand Voice, please contact{' '}
  <a
    href="mailto:brad@omnipressence.com"
    className="text-[#076aff] underline font-semibold"
  >
    Brad Grant, Chief Client Officer
  </a>.
</p>


      <div className="border-t border-gray-200 pt-6 mt-8 w-full max-w-2xl text-center">
        <p className="text-lg text-gray-500">
          Reliable consistency is part of your edge. GENSEN keeps it that way.
        </p>
      </div>
    </main>
  );
}
