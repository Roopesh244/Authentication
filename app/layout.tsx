// app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'RAWS',
  description: 'Authentication App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen flex justify-center items-center bg-gray-900 overflow-hidden">
        {/* 🔵 RING ANIMATIONS */}
        <div className="absolute w-[500px] h-[500px] flex justify-center items-center z-0">
          <div className="absolute inset-0 border-2 border-white/40 rounded-[38%_62%_63%_37%/41%_44%_56%_59%] animate-[spin_6s_linear_infinite] hover:border-4 hover:border-cyan-400 hover:drop-shadow-[0_0_20px_#42F3FA] transition-all"></div>
          <div className="absolute inset-0 border-2 border-white/40 rounded-[41%_44%_56%_59%/38%_62%_63%_37%] animate-[spin_4s_linear_infinite] hover:border-4 hover:border-purple-500 hover:drop-shadow-[0_0_20px_#59238F] transition-all"></div>
          <div className="absolute inset-0 border-2 border-white/40 rounded-[41%_44%_56%_59%/38%_62%_63%_37%] animate-[spin_10s_linear_infinite_reverse] hover:border-4 hover:border-pink-400 hover:drop-shadow-[0_0_20px_#ff1aff] transition-all"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full h-full flex justify-center items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
