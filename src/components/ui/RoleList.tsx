import { useEffect, useRef, useState } from "react";
import { useGetProjRoles } from "../../hooks/proj-roles/useGetRoles";

interface Props {
    orgSlug: string | null;
    projSlug: string | null;
    value: string;
    onChange: (roleName: string) => void;
    placeholder?: string;
}

export default function RoleList({
    orgSlug,
    projSlug,
    value,
    onChange,
    placeholder = "Select role…",
}: Props) {
    const { data: roles = [], isFetching: loading } = useGetProjRoles(orgSlug, projSlug);

    const [open, setOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const typedRef = useRef("");
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    useEffect(() => {
        if (open) {
            dropdownRef.current?.focus();
            typedRef.current = "";
        }
    }, [open]);

    const selected = roles.find((r) => r.name === value) ?? null;

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (!open) return;

        if (e.key === "Escape") {
            setOpen(false);
            return;
        }

        if (e.key.length !== 1) return;

        typedRef.current += e.key.toLowerCase();

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            typedRef.current = "";
        }, 500);

        const match = roles.find((role) =>
            role.name.toLowerCase().startsWith(typedRef.current)
        );

        if (match) {
            onChange(match.name);
        }
    }

    return (
        <div ref={containerRef} className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center gap-2 bg-[#1E1E1E] border border-[#262626] rounded-md px-3 py-2.5 text-sm outline-none hover:border-[#333333] focus:border-[#3B82F6] transition"
            >
                {loading ? (
                    <span className="flex-1 text-left text-[#525252]">
                        Loading…
                    </span>
                ) : selected ? (
                    <>
                        
                        <span className="flex-1 text-left text-white">
                            {selected.name}
                        </span>

                        {selected.isSystemRole && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 font-medium shrink-0">
                                system
                            </span>
                        )}
                    </>
                ) : (
                    <span className="flex-1 text-left text-[#525252]">
                        {placeholder}
                    </span>
                )}

                
            </button>

            {open && !loading && roles.length > 0 && (
                <div
                    ref={dropdownRef}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    className="absolute left-0 right-0 top-full mt-1 bg-[#171717] border border-[#262626] rounded-md overflow-hidden shadow-xl z-50 max-h-60 overflow-y-auto outline-none"
                >
                    {roles.map((role) => (
                        <button
                            key={role.name}
                            type="button"
                            onClick={() => {
                                onChange(role.name);
                                setOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition hover:bg-[#262626] ${
                                role.name === value ? "bg-[#1E1E1E]" : ""
                            }`}
                        >
                            

                            <span className="flex-1 text-sm text-white">
                                {role.name}
                            </span>

                            {role.isSystemRole && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 font-medium shrink-0">
                                    system
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {open && !loading && roles.length === 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-[#171717] border border-[#262626] rounded-md px-3 py-3 shadow-xl z-50">
                    <p className="text-sm text-[#525252]">
                        No roles available.
                    </p>
                </div>
            )}
        </div>
    );
}