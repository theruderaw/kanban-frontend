import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDashboard } from "../../hooks/useDashboard";
import type { OrganizationWithProjects } from "../../types/dashboard";

export default function Sidebar() {
    const { orgSlug } = useParams<{ orgSlug: string }>();
    const { data, loading, error, refresh } = useDashboard();

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

    const toggleProject = (projectId: string) => {
        setOpenProjects((prev) => {
            const next = new Set(prev);
            if (next.has(projectId)) {
                next.delete(projectId);
            } else {
                next.add(projectId);
            }
            return next;
        });
    };

    if (!orgSlug) {
        return (
            <aside className="w-64 shrink-0 border-r border-neutral-200 p-4">
                <p className="text-sm text-neutral-500">No organization selected.</p>
            </aside>
        );
    }

    return (
        <aside className="w-64 shrink-0 border-r border-neutral-200 h-full overflow-y-auto">
            {loading && (
                <div className="p-4 space-y-3">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="h-4 rounded bg-neutral-100 animate-pulse" />
                    ))}
                </div>
            )}

            {!loading && error && (
                <div className="p-4">
                    <p className="text-sm text-neutral-600">Couldn't load this organization.</p>
                    <button
                        type="button"
                        onClick={refresh}
                        className="mt-2 text-sm text-blue-600 hover:underline"
                    >
                        Retry
                    </button>
                </div>
            )}

            {!loading && !error && !org && (
                <div className="p-4">
                    <p className="text-sm text-neutral-600">No organization found for "{orgSlug}".</p>
                </div>
            )}

            {!loading && !error && org && (
                <div className="py-3">
                    <div className="px-4 pb-2">
                        <h2 className="text-sm font-medium text-neutral-900 truncate">{org.name}</h2>
                    </div>

                    {org.projects.length === 0 ? (
                        <div className="px-4 py-2">
                            <p className="text-sm text-neutral-500">No projects yet.</p>
                        </div>
                    ) : (
                        <nav className="mt-1">
                            {org.projects.map((project) => {
                                const isOpen = openProjects.has(project.slug);
                                return (
                                    <div key={project.slug} className="mb-1">
                                        <button
                                            type="button"
                                            onClick={() => toggleProject(project.slug)}
                                            className="w-full flex items-center gap-1.5 px-4 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
                                            aria-expanded={isOpen}
                                        >
                                            <span
                                                className={`inline-block transition-transform text-neutral-400 ${
                                                    isOpen ? "rotate-90" : ""
                                                }`}
                                            >
                                                ›
                                            </span>
                                            <span className="truncate flex-1 text-left">{project.name}</span>
                                        </button>

                                        {isOpen && (
                                            <div className="ml-6">
                                                {project.boards.length === 0 ? (
                                                    <p className="px-4 py-1 text-xs text-neutral-400">
                                                        No boards yet.
                                                    </p>
                                                ) : (
                                                    project.boards.map((board) => (
                                                        <NavLink
                                                            key={board.slug}
                                                            to={`/${orgSlug}/${project.slug}/${board.slug}`}
                                                            className={({ isActive }) =>
                                                                `block px-4 py-1.5 text-sm truncate rounded-md ${
                                                                    isActive
                                                                        ? "bg-blue-50 text-blue-700 font-medium"
                                                                        : "text-neutral-600 hover:bg-neutral-50"
                                                                }`
                                                            }
                                                        >
                                                            {board.name}
                                                        </NavLink>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </nav>
                    )}
                </div>
            )}
        </aside>
    );
}