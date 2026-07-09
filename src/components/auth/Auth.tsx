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

    async function handleSubmit(e : React.SubmitEvent) {
        e.preventDefault();

        setLoading(true);

        try {
            if (isLogin) {
                const res = await login({
                    identifier:username,
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
                    identifier:username,
                    password,
                });

                setToken(res.token);
            }

            navigate("/dashboard");
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>{isLogin ? "Login" : "Register"}</h1>

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label>Email</label>
                        <input
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>
                )}

                <div>
                    <label>Username</label>
                    <input
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading
                        ? "Loading..."
                        : isLogin
                        ? "Login"
                        : "Register"}
                </button>
            </form>

            <button
                type="button"
                onClick={() => {
                    setIsLogin((v) => !v);
                }}
            >
                {isLogin
                    ? "Need an account?"
                    : "Already have an account?"}
            </button>
        </div>
    );
}