import { FilePlus } from "lucide-react";
import type { ProjectWithBoards } from "../../types/dashboard";
import type { Board } from "../../types/board";
import ProjActions from "./ProjActions";
import BoardItem from "./BoardItem";
import { useInlineEdit } from "../../hooks/useInlineEdit";

interface ProjectTreeProps {
    project: ProjectWithBoards;
    orgSlug: string;
    isOpen: boolean;
    onToggle: () => void;
    onRename?: (project: ProjectWithBoards, newName: string) => void;
    onDelete?: (project: ProjectWithBoards) => void;
    onSettings?: (project: ProjectWithBoards) => void;
    onBoardRename?: (board: Board, projectSlug: string, newName: string) => void;
    onBoardDelete?: (board: Board, projectSlug: string) => void;
    onBoardCreate?: (project: ProjectWithBoards, name: string) => void;
}

export default function ProjectTree({
    project,
    orgSlug,
    isOpen,
    onToggle,
    onRename,
    onSettings,
    onBoardRename,
    onBoardDelete,
    onBoardCreate,
}: ProjectTreeProps) {
    const projectEdit = useInlineEdit(project.name, (name) =>
        onRename?.(project, name)
    );

    const boardCreate = useInlineEdit("", (name) =>
        onBoardCreate?.(project, name)
    );

    return (
        <div className="mb-2">
            <div className="group w-full flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-[#1E1E1E] transition">
                {projectEdit.isEditing ? (
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <span className="inline-block text-[#525252]">›</span>
                        <input
                            ref={projectEdit.inputRef}
                            value={projectEdit.draft}
                            onChange={(e) => projectEdit.setDraft(e.target.value)}
                            onKeyDown={projectEdit.handleKeyDown}
                            onBlur={projectEdit.commit}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 min-w-0 bg-[#1E1E1E] border border-[#3B82F6] rounded px-1 py-0 text-sm text-white outline-none"
                        />
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={onToggle}
                        className="flex items-center gap-1.5 flex-1 min-w-0 text-sm font-medium text-[#A3A3A3] hover:text-white transition"
                        aria-expanded={isOpen}
                    >
                        <span
                            className={`inline-block transition-transform text-[#525252] ${isOpen ? "rotate-90 text-white" : ""
                                }`}
                        >
                            ›
                        </span>
                        <span className="truncate text-left">{project.name}</span>
                    </button>
                )}

                {!projectEdit.isEditing && (
                    <div className="hidden group-hover:flex items-center gap-1">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isOpen) onToggle();
                                boardCreate.start();
                            }}
                            className="text-[#525252] hover:text-white"
                            title="New board"
                        >
                            <FilePlus size={14} />
                        </button>
                        <ProjActions
                            project={project}
                            onEdit={projectEdit.start}
                            onSettings={onSettings}
                        />
                    </div>
                )}
            </div>

            {isOpen && (
                <div className="mt-1 ml-4 border-l border-[#262626] pl-2 space-y-1">
                    {project.boards.map((board) => (
                        <BoardItem
                            key={board.slug}
                            board={board}
                            orgSlug={orgSlug}
                            projectSlug={project.slug}
                            onRename={onBoardRename}
                            onDelete={onBoardDelete}
                        />
                    ))}

                    {boardCreate.isEditing && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5">
                            <input
                                ref={boardCreate.inputRef}
                                value={boardCreate.draft}
                                onChange={(e) => boardCreate.setDraft(e.target.value)}
                                onKeyDown={boardCreate.handleKeyDown}
                                onBlur={boardCreate.commit}
                                placeholder="Board name"
                                className="flex-1 min-w-0 bg-[#1E1E1E] border border-[#3B82F6] rounded px-1 py-0 text-sm text-white outline-none"
                            />
                        </div>
                    )}

                    {project.boards.length === 0 && !boardCreate.isEditing && (
                        <p className="px-3 py-1 text-xs text-[#525252]">No boards yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}