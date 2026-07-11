import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login, register } from "../../api/auth.api";
import { setToken } from "../../api/axios";

export default function Auth() {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                const res = await login({
                    identifier: username,
                    password,
                });
                setToken(res.token);
            } else {
                await register({
                    username,
                    email,
                    password,
                });
                const res = await login({
                    identifier: username,
                    password,
                });
                setToken(res.token);
            }
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#000000] p-4 font-sans">
            <div className="w-full max-w-md rounded-xl border border-[#262626] bg-[#121212] p-8 shadow-2xl">
                <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-white">
                    {isLogin ? "Sign In" : "Create Account"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#A3A3A3]">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-md border border-[#333333] bg-[#1E1E1E] px-4 py-3 text-sm text-white placeholder-[#525252] outline-none transition focus:border-[#3B82F6]"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#A3A3A3]">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-md border border-[#333333] bg-[#1E1E1E] px-4 py-3 text-sm text-white placeholder-[#525252] outline-none transition focus:border-[#3B82F6]"
                            placeholder="username"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#A3A3A3]">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md border border-[#333333] bg-[#1E1E1E] px-4 py-3 text-sm text-white placeholder-[#525252] outline-none transition focus:border-[#3B82F6]"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-md bg-[#3B82F6] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#2563EB] disabled:opacity-50"
                    >
                        {loading ? "Please wait..." : isLogin ? "Sign In" : "Register"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => setIsLogin((v) => !v)}
                        className="text-sm text-[#A3A3A3] underline transition hover:text-white"
                    >
                        {isLogin ? "New here? Create an account" : "Already have an account? Sign In"}
                    </button>
                </div>
            </div>
        </div>
    );
}