// src/components/LogoutButton.js
"use client";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function LogoutButton() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <button className={clsx("cursor-pointer rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2",
      {
        " bg-slate-800 focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700": theme === 'light',
        " bg-blue-800 focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700": theme === 'dark',
      })} onClick={() => signOut()}>Sign out</button>
  );
}
