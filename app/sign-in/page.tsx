'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // new import

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Invalid credentials. Redirecting to Sign Up...');
      setTimeout(() => router.push('/sign-up'), 2000);
    } else if (data?.user) {
      router.push('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="relative z-10 w-[300px] md:w-[350px] bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-2xl text-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
      <img
        src="/logo.png"
        alt="User Avatar"
        className="w-24 h-24 mx-auto rounded-full mb-4 border-2 border-white/40 shadow-md transition-transform duration-300 hover:scale-110"
      />
      <h3 className="text-xl font-bold text-white mb-5 tracking-wide">Sign In</h3>

      <form className="flex flex-col gap-3" onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 hover:bg-white/30"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 hover:bg-white/30"
          required
        />

        {/* Forgot Password Link */}
        <button
          type="button"
          className="text-cyan-300 text-sm text-right mt-1 hover:text-cyan-400 transition self-end"
          onClick={() => router.push('/forgot-password')}
        >
          Forgot Password?
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600/90 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition duration-200 shadow-md hover:shadow-lg mt-2"
        >
          {loading ? 'Signing In...' : 'Existing User'}
        </button>
      </form>

      {error && <p className="mt-3 text-red-400 text-sm font-medium">{error}</p>}
    </div>
  );
}
