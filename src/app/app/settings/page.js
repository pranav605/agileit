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
