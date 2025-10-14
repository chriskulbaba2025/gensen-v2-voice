// src/app/layout.tsx
import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';   // ✅ Load Font Awesome globally
import { ReactNode } from 'react';
import { FormProvider } from '@/context/FormContext';
import Navbar from '@/components/Navbar';

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
          <img
            src="https://omnipressence.com/wp-content/uploads/2025/09/op-logo-full-script.webp"
            alt="Omnipressence Logo"
            className="w-88 h-auto mb-[20px] mt-[20px] rounded-[15px]"
          />
          <h1 className="text-2xl font-bold text-gray-800">
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
