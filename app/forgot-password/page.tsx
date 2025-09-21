'use client';

import React, { useState } from 'react';
import { getBrowserSupabase } from '@/utils/supabase/browser';

export default function ForgotPasswordPage() {
  const supabase = getBrowserSupabase();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`, // where user will land after clicking email link
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for the password reset link!');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-bold text-white mb-6">Forgot Password</h2>

      <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      {message && <p className="mt-3 text-green-400 text-sm">{message}</p>}
      {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}

      <p className="mt-4 text-sm text-gray-300">
        Remembered your password?{' '}
        <a href="/sign-in" className="text-purple-300 hover:underline">
          Sign In
        </a>
      </p>
    </div>
  );
}
