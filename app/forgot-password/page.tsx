'use client';

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/sign-in`, // redirect after password reset
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for the password reset link!');
    }

    setLoading(false);
  };

  return (
    <div className="relative z-10 w-[300px] md:w-[350px] bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-2xl text-center mx-auto mt-20">
      <img
        src="/logo.png"
        alt="Logo"
        className="w-24 h-24 mx-auto rounded-full mb-4 border-2 border-white/40 shadow-md"
      />
      <h3 className="text-xl font-bold text-white mb-5 tracking-wide">
        Forgot Password
      </h3>

      <form className="flex flex-col gap-3" onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 hover:bg-white/30"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600/90 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition duration-200 shadow-md hover:shadow-lg"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      {message && <p className="mt-3 text-green-400 text-sm">{message}</p>}
      {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}

      <p className="mt-3 text-xs text-gray-300">
        Remembered your password?{' '}
        <a
          href="/sign-in"
          className="text-purple-300 font-semibold hover:text-purple-400 transition"
        >
          Sign In
        </a>
      </p>
    </div>
  );
}
