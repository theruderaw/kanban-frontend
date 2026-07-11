import { useCallback, useEffect, useState } from "react";

import {
    getProjMembers,
    inviteMember,
    updateMember,
    deleteMember
} from "../api/proj-members.api";

import type { ProjMember } from "../types/proj-member";

export function useMembers(orgSlug: string | null, projSlug: string | null) {
    const [members, setMembers] = useState<ProjMember[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mutating, setMutating] = useState(false);

    const load = useCallback(async () => {
        if (!orgSlug || !projSlug) return;

        try {
            setLoading(true);
            setError(null);

            const result = await getProjMembers(orgSlug, projSlug);
            setMembers(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load members");
        } finally {
            setLoading(false);
        }
    }, [orgSlug, projSlug]);

    useEffect(() => {
        load();
    }, [load]);

    async function mutate<T>(action: () => Promise<T>, fallbackMessage: string): Promise<T> {
        try {
            setMutating(true);
            setError(null);

            const result = await action();
            await load();

            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : fallbackMessage);
            throw err;
        } finally {
            setMutating(false);
        }
    }

    function invite(username: string, roleName: string) {
        if (!orgSlug || !projSlug) {
            return Promise.reject(new Error("Missing orgSlug or projSlug"));
        }
        return mutate(
            () => inviteMember(orgSlug, projSlug, username, roleName),
            "Failed to invite member"
        );
    }

    function updateRole(username: string, roleName: string) {
        if (!orgSlug || !projSlug) {
            return Promise.reject(new Error("Missing orgSlug or projSlug"));
        }
        return mutate(
            () => updateMember(orgSlug, projSlug, username, roleName),
            "Failed to update member"
        );
    }

    function remove(username: string) {
        if (!orgSlug || !projSlug) {
            return Promise.reject(new Error("Missing orgSlug or projSlug"));
        }
        return mutate(
            () => deleteMember(orgSlug, projSlug, username),
            "Failed to remove member"
        );
    }

    return {
        members,
        loading,
        mutating,
        error,
        refresh: load,
        invite,
        updateRole,
        remove,
    };
}