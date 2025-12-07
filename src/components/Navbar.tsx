'use client';

import Image from 'next/image';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-[40px] py-[20px] border-b border-[#00000020] bg-white z-50">

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
          className="rounded-[8px]"
        />

        <span className="ml-[40px] text-[24px] font-semibold text-black">
          GENSEN
        </span>
      </a>

      {/* No nav items */}
      <div className="flex items-center space-x-[40px]"></div>
    </nav>
  );
}
