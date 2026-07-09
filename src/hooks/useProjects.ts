import { useState } from "react";

import {
    createProject,
    deleteProject,
    updateProject,
} from "../api/proj.api";

import type {
    CreateProjectPayload,
    UpdateProjectPayload,
} from "../types/project";

export function useProjects() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function execute<T>(
        action: () => Promise<T>,
        fallbackMessage: string
    ): Promise<T> {

        try {

            setLoading(true);
            setError(null);

            return await action();

        } catch (err) {

            setError(
                err instanceof Error
                    ? err.message
                    : fallbackMessage
            );

            throw err;

        } finally {

            setLoading(false);

        }

    }

    function create(
        orgSlug: string,
        payload: CreateProjectPayload
    ) {
        return execute(
            () => createProject(orgSlug, payload),
            "Failed to create project"
        );
    }

    function update(
        orgSlug: string,
        projSlug: string,
        payload: UpdateProjectPayload
    ) {
        return execute(
            () => updateProject(orgSlug, projSlug, payload),
            "Failed to update project"
        );
    }

    function del(
        orgSlug: string,
        projSlug: string
    ) {
        return execute(
            () => deleteProject(orgSlug, projSlug),
            "Failed to delete project"
        );
    }

    return {
        create,
        update,
        del,
        loading,
        error,
    };

}