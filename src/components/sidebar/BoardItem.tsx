import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { Board } from "../../types/board";
import { useInlineEdit } from "../../hooks/useInlineEdit";

interface BoardItemProps {
    board: Board;
    orgSlug: string;
    projectSlug: string;
    onRename?: (board: Board, projectSlug: string, newName: string) => void;
    onDelete?: (board: Board, projectSlug: string) => void | Promise<void>;
}

export default function BoardItem({
    board,
    orgSlug,
    projectSlug,
    onRename,
    onDelete,
}: BoardItemProps) {
    const edit = useInlineEdit(board.name, (name) =>
        onRename?.(board, projectSlug, name)
    );
    const [isDeleting, setIsDeleting] = useState(false);

    if (edit.isEditing) {
        return (
            <div className="flex items-center gap-1.5 px-3 py-1.5">
                <input
                    ref={edit.inputRef}
                    value={edit.draft}
                    onChange={(e) => edit.setDraft(e.target.value)}
                    onKeyDown={edit.handleKeyDown}
                    onBlur={edit.commit}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 min-w-0 bg-[#1E1E1E] border border-[#3B82F6] rounded px-1 py-0 text-sm text-white outline-none"
                />
            </div>
        );
    }

    return (
        <div className="group flex items-center gap-1 rounded-md hover:bg-[#1E1E1E] transition">
            <NavLink
                to={`/${orgSlug}/${projectSlug}/${board.slug}`}
                className={({ isActive }) =>
                    `flex-1 min-w-0 block px-3 py-1.5 text-sm truncate rounded-md transition-all ${isActive
                        ? "bg-[#3B82F6] text-white font-medium shadow-md shadow-[#3B82F6]/10"
                        : "text-[#A3A3A3] hover:text-white"
                    }`
                }
            >
                {board.name}
            </NavLink>

            {/* TODO: swap for BoardActions matching ProjActions styling once ProjActions.tsx is available */}
            <div className="hidden group-hover:flex items-center gap-1 pr-2">
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        edit.start();
                    }}
                    className="text-[#525252] hover:text-white"
                    title="Rename board"
                >
                    <Pencil size={13} />
                </button>
                <button
                    type="button"
                    disabled={isDeleting}
                    onClick={async (e) => {
                        e.stopPropagation();
                        if (isDeleting) return;
                        setIsDeleting(true);
                        try {
                            await onDelete?.(board, projectSlug);
                        } finally {
                            setIsDeleting(false);
                        }
                    }}
                    className="text-[#525252] hover:text-red-400 disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Delete board"
                >
                    <Trash2 size={13} />
                </button>
            </div>
        </div>
    );
}