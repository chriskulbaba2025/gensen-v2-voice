'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the session cookie
    document.cookie = 'gensen_session=; path=/; domain=.omnipressence.com; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax';
    // Redirect to login
    router.push('/login');
  };

  return (
    <nav className="flex justify-between items-center px-10 py-5 border-b border-[#00000020] bg-white z-50">

      {/* Logo → back to voice.omnipressence.com */}
      <a
        href="https://voice.omnipressence.com"
        target="_self"
        className="flex items-center no-underline"
      >
        <Image
          src="https://omnipressence.com/wp-content/uploads/2025/09/Gensen-Logo-Final-version-lower-case-logo-and-spaces1-356x295-1.webp"
          alt="Gensen Logo"
          width={80}
          height={80}
          className="rounded-lg"
        />
        <span className="ml-10 text-[24px] font-semibold text-black">
          GENSEN
        </span>
      </a>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium text-[#076aff] border border-[#076aff] rounded hover:bg-[#076aff] hover:text-white transition-colors duration-200"
      >
        Log Out
      </button>
    </nav>
  );
}
