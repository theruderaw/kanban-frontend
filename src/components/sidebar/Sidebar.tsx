import { useEffect, useState } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateProject } from "../../hooks/project/useUpdate";
import { useCreateBoard } from "../../hooks/board/useCreate";
import { useUpdateBoard } from "../../hooks/board/useUpdate";
import { useDeleteBoard } from "../../hooks/board/useDelete";
import { useOrg } from "../../hooks/useOrg";
import type { OrganizationWithProjects, ProjectWithBoards } from "../../types/dashboard";
import type { Board } from "../../types/board";
import ProjectTree from "./ProjectTree";
import ProjectSettingsModal from "./settings/ProjSettingsModal";

export default function Sidebar() {
    const { orgSlug } = useOrg();
    const queryClient = useQueryClient();
    const { data, isLoading: loading, error, refetch: refresh } = useDashboard();
    
    const { mutateAsync: updateProject } = useUpdateProject();
    const { mutateAsync: createBoard } = useCreateBoard();
    const { mutateAsync: updateBoard } = useUpdateBoard();
    const { mutateAsync: deleteBoard } = useDeleteBoard();

    const invalidateDashboard = () => queryClient.invalidateQueries({ queryKey: ["dashboard"] });

    const [settingsProject, setSettingsProject] = useState<ProjectWithBoards | null>(null);

    const org: OrganizationWithProjects | undefined = data?.organizations.find(
        (o) => o.slug === orgSlug
    );

    const [openProjects, setOpenProjects] = useState<Set<string>>(new Set());

    // Open every project by default whenever the active org changes
    useEffect(() => {
        if (org) {
            setOpenProjects(new Set(org.projects.map((p) => p.slug)));
        }
    }, [org]);

    const toggleProject = (projectSlug: string) => {
        setOpenProjects((prev) => {
            const next = new Set(prev);
            if (next.has(projectSlug)) {
                next.delete(projectSlug);
            } else {
                next.add(projectSlug);
            }
            return next;
        });
    };

    const handleRename = async (project: ProjectWithBoards, newName: string) => {
        if (!orgSlug) return;

        try {
            await updateProject({ orgSlug, projSlug: project.slug, payload: { name: newName } });
            await invalidateDashboard();
        } catch {
            // error is already captured by useProjects; nothing further to do here
        }
    };

    const handleSettings = (project: ProjectWithBoards) => {
        setSettingsProject(project);
    };

    const handleBoardCreate = async (project: ProjectWithBoards, name: string) => {
        try {
            await createBoard({ projSlug: project.slug, payload: { name } });
            await invalidateDashboard();
        } catch {
            // error is already captured by useBoards; nothing further to do here
        }
    };

    const handleBoardRename = async (board: Board, projectSlug: string, newName: string) => {
        try {
            await updateBoard({ projSlug: projectSlug, boardSlug: board.slug, payload: { name: newName } });
            await invalidateDashboard();
        } catch {
            // error is already captured by useBoards; nothing further to do here
        }
    };

    const handleBoardDelete = async (board: Board, projectSlug: string) => {
        try {
            await deleteBoard({ projSlug: projectSlug, boardSlug: board.slug });
            await invalidateDashboard();
        } catch {
            // error is already captured by useBoards; nothing further to do here
        }
    };


    if (!orgSlug) {
        return (
            <aside className="w-64 shrink-0 border-r border-[#262626] bg-[#121212] p-4 h-full">
                <p className="text-sm text-[#A3A3A3]">No organization selected.</p>
            </aside>
        );
    }

    return (
        <>
            <aside className="w-64 min-h-100 shrink-0 border-r border-[#262626] bg-[#121212] h-full overflow-y-auto font-sans">
                {loading && (
                    <div className="p-4 space-y-3">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="h-4 rounded bg-[#1E1E1E] animate-pulse" />
                        ))}
                    </div>
                )}

                {!loading && error && (
                    <div className="p-4">
                        <p className="text-sm text-[#A3A3A3]">Couldn't load this organization.</p>
                        <button
                            type="button"
                            onClick={() => refresh()}
                            className="mt-2 text-sm text-[#3B82F6] hover:underline"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {!loading && !error && !org && (
                    <div className="p-4">
                        <p className="text-sm text-[#A3A3A3]">No organization found for "{orgSlug}".</p>
                    </div>
                )}

                {!loading && !error && org && (
                    <div className="py-3">
                        <div className="px-4 pb-2 border-b border-[#262626] mb-3">
                            <h2 className="text-sm font-semibold text-white truncate">{org.name}</h2>
                        </div>

                        {org.projects.length === 0 ? (
                            <div className="px-4 py-2">
                                <p className="text-sm text-[#A3A3A3]">No projects yet.</p>
                            </div>
                        ) : (
                            <nav className="mt-1 px-2">
                                {org.projects.map((project) => (
                                    <ProjectTree
                                        key={project.slug}
                                        project={project}
                                        orgSlug={orgSlug}
                                        isOpen={openProjects.has(project.slug)}
                                        onToggle={() => toggleProject(project.slug)}
                                        onRename={handleRename}
                                        onSettings={handleSettings}
                                        onBoardCreate={handleBoardCreate}
                                        onBoardRename={handleBoardRename}
                                        onBoardDelete={handleBoardDelete}
                                    />
                                ))}
                            </nav>
                        )}
                    </div>
                )}
            </aside>

            {settingsProject && orgSlug && (
                <ProjectSettingsModal
                    project={settingsProject}
                    orgSlug={orgSlug}
                    isOpen={true}
                    onClose={() => setSettingsProject(null)}
                    onSaved={refresh}
                />
            )}
        </>
    );
}