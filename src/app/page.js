"use client"
import Image from "next/image";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { CheckCircleIcon} from '@heroicons/react/24/outline';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering until mounted (to prevent hydration mismatch)
  if (!mounted) return null;
  return (
    <div className={clsx(" items-center justify-items-start min-h-screen font-[family-name:var(--font-geist-sans)]",
      {
        "light": theme === 'light',
        "dark": theme === 'dark',
      }
    )}>
      <main className={clsx("flex w-full flex-col sm:h-screen p-8 pb-20  sm:p-20 gap-[16px] md:gap-[32px] row-start-2  justify-center sm:items-start",
        {
          "bg-[url(/images/bg-rose.png)]": theme === 'light',
          " bg-[url(/images/bg-dark.png)]": theme === 'dark',
        }
      )}>
        <h1 className="text-4xl md:text-8xl font-bold">AgileIT</h1>
        <h1 className="text-4xl md:text-8xl font-bold">Project management tool</h1>
        <button className={clsx("cursor-pointer rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2",
          {
            " bg-slate-800 focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700": theme === 'light',
            " bg-blue-800 focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700": theme === 'dark',
          })} onClick={() => {
            theme == 'light' ? setTheme('dark') : setTheme('light')
          }}>Toggle Theme</button>
      </main>
      <section className="flex flex-row row-start-2 p-8 pb-20 sm:p-20 w-full ">
        <div className="flex flex-1/2 justify-center items-center">
          <div className="flex sm:flex-1/2 flex-col ">
          <span className="text-2xl font-light pb-8">Ideate, Plan, Execute</span>
          <h1 className="text-4xl pb-4">Made for comlpex projects and everyday tasks</h1>
          <p className="pb-8">Discover a sleek, professional platform designed for seamless user experience. This app allows you to collaborate and manage projects and teams.</p>
          <ul className="pb-8">
            <li>
              <span className="flex items-center gap-2">
                <CheckCircleIcon className="h-8 w-8" /> Sprint Backlog
              </span>
            </li>
            <li>
              <span className="flex items-center gap-2">
                <CheckCircleIcon className="h-8 w-8" /> Task Tracker
              </span>
            </li>
            <li>
              <span className="flex items-center gap-2">
                <CheckCircleIcon className="h-8 w-8" /> Easy Project Creation
              </span>
            </li>
          </ul>
          <button className={clsx("cursor-pointer rounded-md py-2 px-4 max-w-fit border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
          {
            " bg-slate-800 focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700": theme === 'light',
            " bg-blue-800 focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700": theme === 'dark',
          })}>
            Get Started
          </button>
        </div>
        </div>
        <div className="hidden sm:flex flex-1/2">
          <Image src={'/images/project_board_bg.png'} width="1024" height={1024} alt="Project management board" className="h-full w-full"></Image>
        </div>
      </section>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
