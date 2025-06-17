import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function MemberSelector({ member, index, onChange, onRemove, currentEmail }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef(null);

    // Fetch suggestions with debounce
    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/projects/users/search?query=${query}`);
                const currentUserEmail = currentEmail;
                // Filter out current user from suggestions
                const filtered = res.data.filter(user => user.email !== currentUserEmail);
                setSuggestions(filtered);
                setShowDropdown(true);
            } catch (err) {
                console.error(err);
            }
        };

        const timeout = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    // Dismiss dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <input
                type="text"
                placeholder="Enter user email"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
                onFocus={() => {
                    if (suggestions.length > 0) setShowDropdown(true);
                }}
                className="px-2 py-1 w-full border border-gray-200 dark:border-zinc-700 rounded-md"
            />

            {showDropdown && suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white dark:bg-zinc-800 w-full border border-gray-200 dark:border-zinc-700 rounded-md mt-1 max-h-40 overflow-auto">
                    {suggestions.map((user) => (
                        <li
                            key={user._id}
                            onClick={() => {
                                onChange(index, 'user', user._id);
                                setQuery(user.email);
                                setSuggestions([]);
                                setShowDropdown(false);
                            }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700"
                        >
                            {user.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
