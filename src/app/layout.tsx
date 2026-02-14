// src/app/layout.tsx
import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ReactNode } from 'react';
import { FormProvider } from '@/context/FormContext';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export const metadata = {
  title: 'GENSEN Voice Forge',
  description: 'MVP wizard for agency brand voice creation',
  icons: {
<<<<<<< HEAD
    icon: '/op-favicon.ico',
=======
    icon: 'https://omnipressence.com/wp-content/uploads/2025/09/favicon-logo-64-x-64.webp',
>>>>>>> abf393fe59a68da090701b09ad91942e06b2e4dc
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[#f5f8ff] text-[#0a0a0a] font-raleway">
        <FormProvider>
<<<<<<< HEAD
          <Navbar />

          <header className="w-full py-4 bg-white flex flex-col items-center shadow-sm">
            <div className="relative w-[320px] h-[100px] mt-5 mb-5">
              <Image
                src="/oplogo.webp"
                alt="Omnipressence Logo"
                fill
                className="object-contain"
=======
          {/* Global Navbar */}
          <Navbar />

          {/* Omnipressence Header */}
          <header className="w-full py-4 bg-white flex flex-col items-center shadow-sm">
            <div className="relative w-[320px] h-[100px] mb-[20px] mt-[20px] rounded-[15px] overflow-hidden">
              <Image
                src="https://omnipressence.com/wp-content/uploads/2025/09/op-logo-full-script.webp"
                alt="Omnipressence Logo"
                fill
                className="object-contain rounded-[15px]"
>>>>>>> abf393fe59a68da090701b09ad91942e06b2e4dc
                priority
              />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 text-center">
              GENSEN Brand-Voice Builder
            </h1>
          </header>

<<<<<<< HEAD
=======
          {/* Main Content */}
>>>>>>> abf393fe59a68da090701b09ad91942e06b2e4dc
          <main className="flex-1">{children}</main>
        </FormProvider>
      </body>
    </html>
  );
}
