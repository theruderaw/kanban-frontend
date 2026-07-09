import { useState } from "react";

import {
    createOrganization,
    deleteOrganization,
    updateOrganization,
    checkOrganizationSlug
} from "../api/org.api";

import type {
    CreateOrganizationPayload,
    UpdateOrganizationPayload,
} from "../types/org";

export function useOrganizations() {

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
        payload: CreateOrganizationPayload
    ) {
        return execute(
            () => createOrganization(payload),
            "Failed to create organization"
        );
    }

    function update(
        slug: string,
        payload: UpdateOrganizationPayload
    ) {
        return execute(
            () => updateOrganization(slug, payload),
            "Failed to update organization"
        );
    }

    function del(
        slug: string
    ) {
        return execute(
            () => deleteOrganization(slug),
            "Failed to delete organization"
        );
    }
    async function checkSlug(slug: string) {
        return execute(
            () => checkOrganizationSlug(slug),
            "Failed to check organization slug"
        );
    }

    return {
        create,
        update,
        del,
        checkSlug,
        loading,
        error,
    };

}