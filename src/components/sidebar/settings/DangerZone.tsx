import { useState } from "react";
import { Trash2 } from "lucide-react";

import { useProjects } from "../../../hooks/useProjects";

import type { ProjectWithBoards } from "../../../types/dashboard";

interface Props {
    project: ProjectWithBoards;
    orgSlug: string;
    onDeleted?: () => void;
}

export default function DangerZone({
    project,
    orgSlug,
    onDeleted,
}: Props) {
    const { del, loading, error } = useProjects();

    const [confirmSlug, setConfirmSlug] = useState("");

    const canDelete = confirmSlug === project.slug;

    async function handleDelete() {
        if (!canDelete || loading) return;

        const ok = await del(orgSlug, project.slug);

        if (ok) {
            onDeleted?.();
        }
    }

    return (
        <div className="border border-red-500/30 rounded-md p-4 space-y-4">
            <div>
                <p className="text-sm font-medium text-white">
                    Delete this project
                </p>

                <p className="text-sm text-[#A3A3A3] mt-1">
                    This permanently deletes the project and all boards.
                    This action cannot be undone.
                </p>
            </div>

            <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">
                    Type <span className="text-white">{project.slug}</span> to confirm
                </label>

                <input
                    value={confirmSlug}
                    onChange={(e) => setConfirmSlug(e.target.value)}
                    placeholder="Project slug..."
                    className="w-full bg-[#1E1E1E]
                    border border-[#262626]
                    rounded-md px-3 py-2.5
                    text-sm text-white
                    outline-none
                    focus:border-red-500"
                />
            </div>

            {error && (
                <p className="text-sm text-red-400">
                    {error}
                </p>
            )}

            <button
                type="button"
                onClick={handleDelete}
                disabled={!canDelete || loading}
                className="
                    flex items-center gap-2
                    px-3 py-2
                    text-sm
                    rounded-md
                    bg-red-500/10
                    text-red-400
                    hover:bg-red-500/20
                    transition
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                "
            >
                <Trash2 size={14} />
                {loading ? "Deleting..." : "Delete project"}
            </button>
        </div>
    );
}