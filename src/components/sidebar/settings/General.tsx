import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateProject } from "../../../hooks/project/useUpdate";
import type { ProjectWithBoards } from "../../../types/dashboard";

interface GeneralProps {
    project: ProjectWithBoards;
    orgSlug: string;
    onSaved?: () => void;
}

export default function General({ project, orgSlug, onSaved }: GeneralProps) {
    const queryClient = useQueryClient();
    const { mutateAsync: update, isPending: loading, error } = useUpdateProject();

    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description ?? "");

    const isDirty =
        name.trim() !== project.name || description.trim() !== (project.description ?? "");
    const isValid = name.trim().length > 0;

    const handleSave = async () => {
        if (!isDirty || !isValid) return;

        try {
            await update(orgSlug, project.slug, {
                payload: {
                    name: name.trim(),
                    description: description.trim(),
                },
            });
            await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
            onSaved?.();
        } catch {
            // error is already captured by useProjects and shown below
        }
    };

    const handleCancel = () => {
        setName(project.name);
        setDescription(project.description ?? "");
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">Project name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1E1E1E] border border-[#262626] rounded-md px-3 py-1.5 text-sm text-white outline-none focus:border-[#3B82F6]"
                />
                {!isValid && (
                    <p className="mt-1 text-xs text-red-400">Project name can't be empty.</p>
                )}
            </div>

            <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">Description</label>
                <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What's this project about?"
                    className="w-full bg-[#1E1E1E] border border-[#262626] rounded-md px-3 py-1.5 text-sm text-white outline-none focus:border-[#3B82F6] resize-none placeholder:text-[#525252]"
                />
            </div>

            {error && <p className="text-xs text-red-400">{error.message || "Failed to update project"}</p>}

            <div className="flex items-center gap-2 pt-1">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={!isDirty || !isValid || loading}
                    className="px-3 py-1.5 text-sm rounded-md bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {loading ? "Saving..." : "Save changes"}
                </button>

                {isDirty && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                        className="px-3 py-1.5 text-sm rounded-md text-[#A3A3A3] hover:text-white hover:bg-[#1E1E1E] transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
}