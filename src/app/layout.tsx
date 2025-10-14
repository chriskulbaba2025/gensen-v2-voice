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
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />

        <header className="w-full py-4 bg-white flex flex-col items-center shadow-sm">
          <div className="relative w-[320px] h-[100px] mb-[20px] mt-[20px] rounded-[15px] overflow-hidden">
            <Image
              src="https://omnipressence.com/wp-content/uploads/2025/09/op-logo-full-script.webp"
              alt="Omnipressence Logo"
              fill
              className="object-contain rounded-[15px]"
              priority
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 text-center">
            GENSEN Brand-Voice Builder
          </h1>
        </header>

        <main className="flex-1">
          <FormProvider>{children}</FormProvider>
        </main>
      </body>
    </html>
  );
}