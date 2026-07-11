import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { ProjRole } from "../../../../types/proj-role";

interface Props {
    open: boolean;
    role: ProjRole | null;
    permissions: string[];
    loading: boolean;
    onCreate: (name: string, permissions: string[]) => Promise<boolean>;
    onUpdate: (name: string, permissions: string[]) => Promise<boolean>;
    onClose: () => void;
}

export default function RoleForm({
    open,
    role,
    permissions,
    loading,
    onCreate,
    onUpdate,
    onClose,
}: Props) {
    const [name, setName] = useState("");
    const [selected, setSelected] = useState<string[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (!open) return;

        if (role) {
            setName(role.name);
            setSelected(role.permissions);
        } else {
            setName("");
            setSelected([]);
        }

        setQuery("");
    }, [open, role]);

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    if (!open) return null;

    const filtered = permissions.filter((permission) => {
        const value = query.toLowerCase().trim();

        return (
            value &&
            permission.toLowerCase().startsWith(value) &&
            !selected.includes(permission)
        );
    });

    async function submit() {
        if (!name.trim()) return;

        const ok = role
            ? await onUpdate(name, selected)
            : await onCreate(name, selected);

        if (ok) {
            onClose();
        }
    }

    function addPermission(permission: string) {
        if (selected.includes(permission)) return;

        setSelected((prev) => [...prev, permission]);
        setQuery("");
    }

    function removePermission(permission: string) {
        setSelected((prev) =>
            prev.filter((item) => item !== permission)
        );
    }

    function handleNameKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            submit();
        }
    }

    function handlePermissionKey(
        e: React.KeyboardEvent<HTMLInputElement>
    ) {
        if (e.key !== "Enter") return;

        e.preventDefault();

        const first = filtered[0];

        if (first) {
            addPermission(first);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={onClose}
        >
            <div
                className="w-[420px] max-w-[90vw] bg-[#121212] border border-[#262626] rounded-lg shadow-xl p-5 space-y-5"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-white">
                        {role ? "Edit Role" : "Create Role"}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#525252] hover:text-white transition"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">
                        Role name
                    </label>

                    <input
                        value={name}
                        disabled={!!role || loading}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleNameKey}
                        placeholder="Role name..."
                        className="w-full bg-[#1E1E1E] border border-[#262626] rounded-md px-3 py-2.5 text-sm text-white outline-none disabled:opacity-50"
                    />
                </div>

                <div>
                    <label className="block text-xs text-[#A3A3A3] mb-2">
                        Permissions
                    </label>

                    <div className="flex flex-wrap gap-2 mb-2">
                        {selected.map((permission) => (
                            <span
                                key={permission}
                                className="flex items-center gap-1 px-2 py-1 rounded bg-[#262626] text-xs text-white"
                            >
                                {permission}

                                <button
                                    type="button"
                                    onClick={() =>
                                        removePermission(permission)
                                    }
                                    className="text-[#A3A3A3] hover:text-white"
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                    </div>

                    <input
                        value={query}
                        disabled={loading}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handlePermissionKey}
                        placeholder="Search permission..."
                        className="w-full bg-[#1E1E1E] border border-[#262626] rounded-md px-3 py-2.5 text-sm text-white outline-none"
                    />

                    {query && filtered.length > 0 && (
                        <div className="mt-1 border border-[#262626] rounded-md bg-[#171717] overflow-hidden">
                            {filtered.map((permission) => (
                                <button
                                    key={permission}
                                    type="button"
                                    onClick={() =>
                                        addPermission(permission)
                                    }
                                    className="w-full px-3 py-2 text-left text-sm text-white hover:bg-[#262626]"
                                >
                                    {permission}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={submit}
                        disabled={loading || !name.trim()}
                        className="px-4 py-2 rounded-md bg-[#3B82F6] text-sm text-white disabled:opacity-40"
                    >
                        {role ? "Save" : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}