import { useCallback, useEffect, useState } from "react";

import {
    getOrgMembers,
    inviteMember,
    updateMember,
    deleteMember
} from "../api/org-members.api";

import type { Member } from "../types/org-member";

interface UseProjMembersResult {
    members: Member[];
    loading: boolean;
    error: string | null;

    refetch: () => Promise<void>;

    inviteProjMember: (
        username: string,
        roleName: string
    ) => Promise<boolean>;

    updateProjMember: (
        username: string,
        roleName: string
    ) => Promise<boolean>;

    deleteProjMember: (
        username: string
    ) => Promise<boolean>;
}

export function useOrgMembers(
    orgSlug: string | undefined,
    projSlug: string | undefined
): UseProjMembersResult {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMembers = useCallback(async () => {
        if (!orgSlug || !projSlug) return;

        setLoading(true);
        setError(null);

        try {
            const data = await getOrgMembers(orgSlug);
            setMembers(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load members."
            );
        } finally {
            setLoading(false);
        }
    }, [orgSlug, projSlug]);

    useEffect(() => {
        void fetchMembers();
    }, [fetchMembers]);

    const inviteProjMember = useCallback(
        async (username: string, roleName: string) => {
            if (!orgSlug || !projSlug) return false;

            setLoading(true);
            setError(null);

            try {
                await inviteMember(orgSlug, username, roleName);
                await fetchMembers();
                return true;
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to invite member."
                );
                return false;
            } finally {
                setLoading(false);
            }
        },
        [orgSlug, projSlug, fetchMembers]
    );

    const updateProjMember = useCallback(
        async (username: string, roleName: string) => {
            if (!orgSlug || !projSlug) return false;

            setLoading(true);
            setError(null);

            try {
                await updateMember(orgSlug, username, roleName);
                await fetchMembers();
                return true;
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to update member."
                );
                return false;
            } finally {
                setLoading(false);
            }
        },
        [orgSlug, projSlug, fetchMembers]
    );

    const deleteProjMember = useCallback(
        async (username: string) => {
            if (!orgSlug || !projSlug) return false;

            setLoading(true);
            setError(null);

            try {
                await deleteMember(orgSlug, username);
                await fetchMembers();
                return true;
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to update member."
                );
                return false;
            } finally {
                setLoading(false);
            }
        },
        [orgSlug, projSlug, fetchMembers]
    );

    return {
        members,
        loading,
        error,
        refetch: fetchMembers,
        inviteProjMember,
        updateProjMember,
        deleteProjMember
    };
}