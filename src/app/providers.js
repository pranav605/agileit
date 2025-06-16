'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
