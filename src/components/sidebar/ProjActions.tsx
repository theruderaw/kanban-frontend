import { Pencil, Settings2 } from "lucide-react";
import type { ProjectWithBoards } from "../../types/dashboard";

interface ProjActionsProps {
    project: ProjectWithBoards;
    onEdit?: () => void;
    onSettings?: (project: ProjectWithBoards) => void;
}

export default function ProjActions({ project, onEdit, onSettings }: ProjActionsProps) {
    return (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
                type="button"
                onClick={() => onEdit?.()}
                title="Rename project"
                className="p-1 rounded text-[#525252] hover:text-white hover:bg-[#262626] transition"
            >
                <Pencil size={13} />
            </button>
            <button
                type="button"
                onClick={() => onSettings?.(project)}
                title="Project settings"
                className="p-1 rounded text-[#525252] hover:text-white hover:bg-[#262626] transition"
            >
                <Settings2 size={13} />
            </button>
        </div>
    );
}