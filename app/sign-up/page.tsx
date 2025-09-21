'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SignUpPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (password !== confirm) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Sign up in Supabase auth
      const { data, error: signUpError } = await supabase.auth.signUp(
        { email, password },
        { data: { username } }
      );

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Insert user info into profiles table
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          email,
          username,
        });

        if (profileError) {
          if (profileError.code === '23505') {
            // Email already exists
            setError(
              'This email is already linked with another user. Please try signing in.'
            );
          } else {
            setError(profileError.message);
          }
          setLoading(false);
          return;
        }

        setMessage(
          'Sign up successful! Please check your email to verify your account.'
        );
        setEmail('');
        setPassword('');
        setConfirm('');
        setUsername('');
      }
    } catch (err: any) {
      setError(err.message);
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
      <h3 className="text-xl font-bold text-white mb-5 tracking-wide">
        Create Account
      </h3>

      <form className="flex flex-col gap-3" onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 hover:bg-white/30"
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 hover:bg-white/30"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-600/90 text-white py-2 rounded-md font-medium hover:bg-cyan-700 transition duration-200 shadow-md hover:shadow-lg"
        >
          {loading ? 'Signing Up...' : 'New User'}
        </button>
      </form>

      {message && (
        <p className="mt-3 text-green-400 text-sm font-medium">{message}</p>
      )}
      {error && <p className="mt-3 text-red-400 text-sm font-medium">{error}</p>}
    </div>
  );
}
