import clsx from 'clsx'
import { useTheme } from 'next-themes'
import React from 'react'

export default function ThemedButton({ onClick, type, className, label}) {
    const {theme} = useTheme();
    return (
        <button
            onClick={onClick}
            type={type}
            className={clsx("cursor-pointer rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 bg-slate-800 focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 dark:bg-blue-800 dark:focus:bg-blue-700 dark:focus:shadow-none dark:active:bg-blue-700 dark:hover:bg-blue-700",className)}
        >
            {label}
        </button>
    )
}
