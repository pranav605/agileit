'use client'
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous error
        setError('');

        // Simple client-side validation
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill out all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match. Please try again.');
            return;
        }

        // Construct the payload
        const formData = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log("Raw response:", response);

            let data;
            try {
                data = await response.json();
                console.log("Parsed JSON:", data);
            } catch (jsonErr) {
                console.error("Failed to parse JSON response:", jsonErr);
                setError('Invalid JSON response from server.');
                return;
            }

            if (!response.ok) {
                setError(data.message || data.error || 'Something went wrong');
            } else {
                // redirect('/signIn');  // useRouter() hook
                router.push('/signIn');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error(err);
        }
    };


    const bgGradient = theme === 'dark'
        ? 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950'
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-100';
    const cardBg = theme === 'dark'
        ? 'bg-zinc-950 border-zinc-800'
        : 'bg-white/80 border-gray-200';
    const inputBg = theme === 'dark'
        ? 'bg-gray-800 border-gray-700 placeholder-zinc-400 text-zinc-200'
        : 'bg-gray-100 border-gray-300 placeholder-zinc-400 text-zinc-600';
    const signUpBtn = theme === 'dark'
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
                        <label className={`block font-medium mb-2 ${labelText}`} htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="name"
                            placeholder="Full Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${inputBg}`}
                            required
                        />
                    </div>
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
                    <div>
                        <label className={`block font-medium mb-2 ${labelText}`} htmlFor="password">Confirm Password</label>
                        <input
                            id="confirm_password"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${inputBg}`}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`cursor-pointer w-full px-4 py-3  hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-md transition-all duration-200 ${signUpBtn}`}
                    >
                        Sign Up
                    </button>
                    {error && <p className="text-red-500 font-medium m-auto">{error}</p>}

                </form>
                <span className={`m-auto ${labelText}`}>Already have an account? <Link href={'/signIn'} className='underline'>Login</Link></span>
            </div>
        </div>
    )
}
