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

  const headingText = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-900';
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
          <h1 className={`text-4xl font-extrabold mb-8 tracking-tight ${headingText}`}>Settings</h1>
          <div className='divide-y divide-zinc-400'>
            <div className={clsx('flex flex-row items-center justify-between px-4 h-16 border border-gray-200 rounded-md',{
              "border-zinc-800":theme==='dark',
              "border-gray-200":theme==='light',
            })}>
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
