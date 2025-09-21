'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserSupabase } from '@/utils/supabase/browser';

export default function ResetPasswordPage() {
  const supabase = getBrowserSupabase();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      router.push('/sign-in');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-bold text-white mb-6">Reset Password</h2>

      <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="New Password"
          className="px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>

      {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
    </div>
  );
}
