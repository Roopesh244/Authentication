'use client';

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/sign-in'); // redirect if not logged in
      } else {
        setUserEmail(user.email);
      }
      setLoading(false);
    };
    getUser();
  }, [supabase, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/sign-in');
  };

  if (loading) return <p className="text-white text-center mt-20">Loading...</p>;

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex flex-col justify-between p-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">RAWS Dashboard</h2>
          <nav className="flex flex-col gap-3">
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-700 transition"
              onClick={() => router.push('/dashboard')}
            >
              Home
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-700 transition"
              onClick={() => router.push('/profile')}
            >
              Profile
            </button>
            {/* Add more navigation buttons here */}
          </nav>
        </div>

        <div>
          <button
            onClick={handleSignOut}
            className="w-full bg-red-600 py-2 rounded-md font-medium hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, {userEmail}</h1>

        {/* Dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Users Info</h2>
            <p>Logged-in user email: {userEmail}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Stats</h2>
            <p>Some dummy stats or cards here...</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Activity</h2>
            <p>Recent activities can go here...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
