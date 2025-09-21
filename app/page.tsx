'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-10 z-10 relative text-white">
      <h1 className="text-4xl font-bold tracking-wide">Welcome to RAWS</h1>

      <img
        src="/logo.png"
        alt="RAWS Logo"
        className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white/30 shadow-lg transition-transform duration-300 hover:scale-105"
      />

      <div className="flex flex-col gap-4 w-48">
        <button
          onClick={() => router.push('/sign-in')}
          className="w-full bg-purple-600/90 text-white py-2 rounded-md font-medium shadow-md hover:shadow-lg hover:bg-purple-700 transition duration-200"
        >
          Existing User
        </button>

        <button
          onClick={() => router.push('/sign-up')}
          className="w-full bg-cyan-600/90 text-white py-2 rounded-md font-medium shadow-md hover:shadow-lg hover:bg-cyan-700 transition duration-200"
        >
          New User
        </button>
      </div>
    </div>
  );
}
