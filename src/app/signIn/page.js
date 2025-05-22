'use client'
import { signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { PresentationChartLineIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Theme-based classes
    const bgGradient = theme === 'dark'
        ? 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950'
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-100';
    const cardBg = theme === 'dark'
        ? 'bg-zinc-950 border-zinc-800'
        : 'bg-white/80 border-gray-200';
    const inputBg = theme === 'dark'
        ? 'bg-gray-800 border-gray-700 placeholder-zinc-400 text-zinc-200'
        : 'bg-gray-100 border-gray-300 placeholder-zinc-400 text-zinc-600';
    const loginBtn = theme === 'dark'
        ? 'bg-gradient-to-r from-blue-800 to-purple-800'
        : 'bg-gradient-to-r from-blue-600 to-purple-600';
    const labelText = theme === 'dark'
        ? 'text-gray-200'
        : 'text-gray-700';
    const headingText = theme === 'dark'
        ? 'text-gray-100'
        : 'text-gray-900';
    const githubBtn = theme === 'dark'
        ? 'bg-gray-800 hover:bg-gray-700 text-white'
        : 'bg-gray-900 hover:bg-gray-800 text-white';
    const googleBtn = theme === 'dark'
        ? 'bg-gray-900 border-gray-700 hover:bg-gray-800 text-gray-100'
        : 'bg-white border-gray-300 hover:bg-gray-100 text-gray-800';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        if (res?.error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center ${bgGradient} transition-colors duration-300`}>
            <div className={`shadow-2xl rounded-2xl p-10 flex flex-col items-center w-full max-w-md border backdrop-blur-md ${cardBg} transition-colors duration-300`}>
                <div className='flex flex-row gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" weight="40" viewBox="0 0 48 48"><g data-name="Agile (looping arrow)"><path d="m41 14.71-10.8-1.55 2.07-2.08a15.35 15.35 0 0 0-19.11 2.08l.77-5.42-7.15 1a23 23 0 0 1 31-3.17l1.72-1.72c.81 5.72.74 5.29 1.5 10.86z" style={{ fill: '#db5669' }} /><path d="M44.91 38.71c-14 2 4.25-.59-10.84 1.55l1.55-10.84 1.87 1.88a15.36 15.36 0 0 0-1.94-17.38l5.49.79c-1.18-8.27-1.14-7.34-.78-7a23 23 0 0 1 2.8 29.12z" style={{ fill: '#ffde76' }} /><path d="M41.22 39.25a23 23 0 0 1-30.08 3.81l-1.85 1.85c-.7-4.87-.86-6-1.55-10.84 3.64.51 10.39 1.48 10.84 1.55l-1.88 1.87a15.34 15.34 0 0 0 18.14-2.65l-.77 5.42z" style={{ fill: '#9dcc6b' }} /><path d="M10.51 16.7a15.34 15.34 0 0 0 2.65 18.14l-5.42-.77 1 7.15a23 23 0 0 1-3.8-30.08L3.09 9.29C7 8.72 6.18 8.83 13.93 7.74c-.92 6.5-.57 4-1.55 10.84z" style={{ fill: '#9fdbf3' }} /><path d="m41 14.71-10.8-1.55 2.07-2.08a15.35 15.35 0 0 0-19.11 2.08l.77-5.42-3.34.47A23.11 23.11 0 0 1 18 1.8a23 23 0 0 1 19.77 3.78l1.72-1.72c.82 5.71.75 5.28 1.51 10.85z" style={{ fill: '#f26674' }} /><path d="M10.51 16.7a15.34 15.34 0 0 0 2.65 18.14l-3.56-.5a23 23 0 0 1 1-26.12l3.34-.47c-.92 6.5-.57 4-1.55 10.84z" style={{ fill: '#b2e5fb' }} /><path d="M41.22 39.25a23.08 23.08 0 0 1-6.22 5 23 23 0 0 1-25.4-9.91c4.48.63 2.47.34 9 1.28l-1.9 1.87a15.34 15.34 0 0 0 18.14-2.65l-.77 5.42z" style={{ fill: '#b5e08c' }} /><path d="M44.34 36.73A24 24 0 0 0 41 7c-.44-3.09-.33-3.82-1.14-4.09s-1 .18-2.14 1.35A24.09 24.09 0 0 0 6.29 7.82C3 8.28 2.4 8.18 2.14 9s.41 1.19 1.52 2.3a24 24 0 0 0 4.16 30.41C8.28 45 8.18 45.6 9 45.86s1.15-.37 2.3-1.52A24 24 0 0 0 41 41c1.06-1.06 0-.68 4.08-1.26a1 1 0 0 0 .57-1.7zm-7.14-7.14-.88-.88a1 1 0 0 0-1.69.57c-.81 5.63-.61 5-1 5.34a14.46 14.46 0 0 1-15.2 2.58c.9-.9 1.35-1.2 1.12-1.9s-.5-.63-5.88-1.4a14.41 14.41 0 0 1-2.87-15.49l.88.88a1 1 0 0 0 1.69-.57c.81-5.66.61-5 1.05-5.37a14.48 14.48 0 0 1 16.22-2.06c-1.17 1.18-1.64 1.45-1.39 2.18s.67.66 5.77 1.39a14.37 14.37 0 0 1 2.18 14.73zM9.64 7.34a22.08 22.08 0 0 1 27.53-1 1 1 0 0 0 1.31-.09l.3-.3c.19 1.29 1 7 1.08 7.54l-7.54-1.08.66-.66a1 1 0 0 0-.17-1.55 16.51 16.51 0 0 0-18.24.43c-.1.07-.08.26.35-2.79a1 1 0 0 0-1.13-1.13zM5.77 11.7a1 1 0 0 0-.12-1.27L5.21 10l7.54-1.08c-.73 5.15-.46 3.26-1.07 7.55l-.46-.47a1 1 0 0 0-1.59.23 16.51 16.51 0 0 0 1.07 17.25l-2.82-.4a1 1 0 0 0-1.13 1.13l.59 4.16A22 22 0 0 1 5.77 11.7zm5.93 30.53a1 1 0 0 0-1.27.12l-.44.44c-.13-.91-.21-1.41-1.08-7.54l7.55 1.07c-.48.48-.83.73-.74 1.32s.66.84 1.5 1.22a16.5 16.5 0 0 0 16.26-1.56c-.67 4.69-1.14 4.22 4.89 3.36a22 22 0 0 1-26.67 1.57zm23.55-3.14c.73-5.15.46-3.26 1.07-7.55.48.48.73.83 1.32.74s.88-.73 1.26-1.58a16.45 16.45 0 0 0-1.11-15.45c3.28.47 3.25.51 3.59.39a1 1 0 0 0 .62-1.08l-.57-3.94a22 22 0 0 1 .77 25.68 1 1 0 0 0 .12 1.27l.44.44z" /></g></svg>
                    <h1 className={`text-4xl font-extrabold mb-8 tracking-tight ${headingText}`}>
                        AgileIT</h1>
                </div>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 mb-8">
                    <div>
                        <label className={`block font-medium mb-2 ${labelText}`} htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${inputBg}`}
                            required
                        />
                    </div>
                    <div>
                        <label className={`block font-medium mb-2 ${labelText}`} htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${inputBg}`}
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    <button
                        type="submit"
                        className={`cursor-pointer w-full px-4 py-3  hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-md transition-all duration-200 ${loginBtn}`}
                    >
                        Login
                    </button>
                    <span className={`m-auto ${labelText}`}>Don't have an account? <Link href={'/signUp'} className='underline'>Sign Up</Link></span>
                    <div className={`flex flex-row justify-between items-center gap-2 ${labelText}`}>
                        <hr className='w-full '></hr>
                        <span>or</span>
                        <hr className='w-full'></hr>
                    </div>
                </form>
                <div className="w-full flex flex-col gap-4">
                    <button
                        onClick={() => signIn('github')}
                        className={`cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-lg shadow transition-all duration-200 ${githubBtn}`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99.01 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" /></svg>
                        Sign in with GitHub
                    </button>
                    <button
                        onClick={() => signIn('google')}
                        className={`cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-lg shadow transition-all duration-200 ${googleBtn}`}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.23l6.9-6.9C35.6 2.1 30.1 0 24 0 14.8 0 6.7 5.8 2.7 14.1l8.1 6.3C12.7 13.2 17.9 9.5 24 9.5z" /><path fill="#34A853" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.4c-.5 2.7-2.1 5-4.5 6.6l7 5.4c4.1-3.8 6.5-9.4 6.5-16.4z" /><path fill="#FBBC05" d="M10.8 28.5c-1.1-3.2-1.1-6.8 0-10l-8.1-6.3C.6 16.1 0 19 0 22s.6 5.9 1.7 8.8l9.1-7.3z" /><path fill="#EA4335" d="M24 48c6.1 0 11.2-2 14.9-5.5l-7-5.4c-2 1.4-4.6 2.3-7.9 2.3-6.1 0-11.3-4.1-13.2-9.6l-9.1 7.3C6.7 42.2 14.8 48 24 48z" /></g></svg>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    )
}