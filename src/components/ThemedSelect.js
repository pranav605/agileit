import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

export default function ThemedSelect({ options, value, onChange, className, name }) {
    const [open, setOpen] = useState(false);
    const { theme } = useTheme();
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={clsx(
                    "cursor-pointer w-full text-left rounded-md py-2 px-4 border text-sm transition-all shadow-md hover:shadow-lg active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none border border-gray-200 dark:border-zinc-700 rounded-md",
                    "border-transparent ",
                    className
                )}
            >
                {options.find((opt) => opt.value === value)?.label || "Select..."}
            </button>
            {open && (
                <ul className="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => {
                                onChange({
                                    target: {
                                        name: name,
                                        value: option.value
                                    }
                                });

                                setOpen(false);
                            }}
                            className={clsx(
                                "cursor-pointer px-4 py-2 text-sm transition hover:bg-gray-100 dark:bg-zinc-900 dark:hover:bg-zinc-700",
                                value === option.value && "font-semibold bg-gray-100 dark:bg-zinc-700"
                            )}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
