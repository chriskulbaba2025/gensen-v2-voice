'use client';

import Image from 'next/image';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 border-b border-[#00000020] bg-white z-50">
      <a
        href="https://voice.omnipressence.com"
        target="_self"
        className="flex items-center no-underline"
      >
        <Image
          src="/gensen-logo.webp"
          alt="Gensen Logo"
          width={80}
          height={80}
          className="rounded-lg"
          priority
        />

        <span className="ml-10 text-[24px] font-semibold text-black">
          GENSEN
        </span>
      </a>

      <div className="flex items-center space-x-10"></div>
    </nav>
  );
}
