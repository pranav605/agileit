'use client'
import ThemedToggleSwitch from '@/components/ThemedToggleSwitch';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

export default function Settings() {

  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Show a loading state while the session is being fetched.
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading session...</p>
      </div>
    );
  }
  if (status) {
    return (
      <div className='w-full h-full'>
      <div className='flex flex-col'>
        <h1 className={`text-4xl font-extrabold mb-8 tracking-tight text-gray-900 dark:text-gray-100`}>Settings</h1>
        {/* User Info Section */}
        <div className="flex items-center space-x-4 mb-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-md dark:bg-zinc-900">
        {session?.user?.image && (
          <img
          src={session.user.image}
          alt={session.user.name || "Profile Photo"}
          className="w-14 h-14 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
          />
        )}
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{session?.user?.name || "User"}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
        </div>
        </div>
        <div className='divide-y divide-zinc-400'>
        <div className='flex flex-row items-center justify-between px-4 h-16 border border-zinc-200 dark:border-zinc-800 rounded-md'>
          <span>Dark Theme</span>
          <ThemedToggleSwitch
          checked={theme === 'dark'}
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
        </div>
        </div>
      </div>
      </div>
    )
  }
}
