// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { FormProvider } from '@/context/FormContext';
import Navbar from '@/components/Navbar'; // ✅ Injected import

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
        <Navbar /> {/* ✅ Navbar injected */}
        
        <header className="w-full py-4 bg-white flex flex-col items-center shadow-sm">
          <img
            src="https://responsegenerators.ca/wp-content/uploads/2025/07/Gensen-Logo-Final-version-lower-case-logo-and-spaces1.webp"
            alt="GENSEN Logo"
            className="w-48 h-auto mb-2"
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
