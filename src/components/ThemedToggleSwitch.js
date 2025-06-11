import clsx from 'clsx';
import { useTheme } from 'next-themes';
import React from 'react';

export default function ThemedToggleSwitch({ checked, onChange, className, label }) {
    const { theme } = useTheme();

    return (
        <label
            className={clsx(
                "inline-flex items-center cursor-pointer select-none",
                className
            )}
        >
            <span className="mr-2 text-sm">{label}</span>
            <span
                className={clsx(
                    "relative w-10 h-6 flex-shrink-0 rounded-full transition-colors duration-200 border-2",
                    {
                        "bg-slate-300 border-slate-400": theme === 'light' && !checked,
                        "bg-slate-800 border-slate-700": theme === 'light' && checked,
                        "bg-blue-300 border-blue-400": theme === 'dark' && !checked,
                        "bg-blue-800 border-blue-700": theme === 'dark' && checked,
                    }
                )}
            >
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                />
                <span
                    className={clsx(
                        "absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200",
                        {
                            "translate-x-0": !checked,
                            "translate-x-4": checked,
                        }
                    )}
                />
            </span>
        </label>
    );
}