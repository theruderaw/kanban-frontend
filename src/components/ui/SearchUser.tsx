// components/ui/SearchUser.tsx

import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";

import { searchUsers } from "../../api/user.api";
import type { User } from "../../types/user";

interface Props {
    value: User | null;
    onChange: (user: User | null) => void;
    placeholder?: string;
}

function initials(username: string) {
    return username.slice(0, 2).toUpperCase();
}

export default function SearchUser({
    value,
    onChange,
    placeholder = "Search username...",
}: Props) {
    const [query, setQuery] = useState(value?.username ?? "");
    const [results, setResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (value) {
            setQuery(value.username);
        }
    }, [value]);

    useEffect(() => {
        const trimmed = query.trim();

        if (!trimmed) {
            setResults([]);
            setOpen(false);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                setLoading(true);

                const users = await searchUsers(trimmed);

                setResults(users);
                setOpen(true);
            } catch (err) {
                console.error(err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <div className="relative w-full">
            <div className="flex items-center bg-[#1E1E1E] border border-[#262626] rounded-md px-3">
                <Search
                    size={15}
                    className="text-[#525252] mr-2 shrink-0"
                />

                <input
                    value={query}
                    placeholder={placeholder}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        onChange(null);
                    }}
                    className="flex-1 bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-[#525252]"
                />

                {loading && (
                    <Loader2
                        size={15}
                        className="animate-spin text-[#525252]"
                    />
                )}
            </div>

            {open && results.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-[#171717] border border-[#262626] rounded-md overflow-hidden shadow-xl z-50 max-h-72 overflow-y-auto">
                    {results.map((user) => (
                        <button
                            key={user.username}
                            type="button"
                            onClick={() => {
                                onChange(user);
                                setQuery(user.username);
                                setOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#262626] transition text-left"
                        >
                            {user.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt={user.username}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-[#262626] flex items-center justify-center text-xs text-[#A3A3A3]">
                                    {initials(user.username)}
                                </div>
                            )}

                            <div className="min-w-0">
                                <p className="text-sm text-white truncate">
                                    {user.username}
                                </p>
                                <p className="text-xs text-[#525252] truncate">
                                    {user.email}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}