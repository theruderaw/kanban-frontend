import { useCallback, useEffect, useState } from "react";

import {
    getOrgMembers,
    inviteMember,
    updateMember,
    deleteMember
} from "../api/org-members.api";

import type { Member } from "../types/org-member";

interface UseOrgMembersResult {
    members: Member[];
    loading: boolean;
    error: string | null;

    refetch: () => Promise<void>;

    inviteOrgMember: (
        username: string,
        roleName: string
    ) => Promise<boolean>;

    updateOrgMember: (
        username: string,
        roleName: string
    ) => Promise<boolean>;

    deleteOrgMember: (
        username: string
    ) => Promise<boolean>;
}

export function useOrgMembers(
    orgSlug: string | undefined
): UseOrgMembersResult {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMembers = useCallback(async () => {
        if (!orgSlug) return;

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
    }, [orgSlug]);

    useEffect(() => {
        void fetchMembers();
    }, [fetchMembers]);

    const inviteOrgMember = useCallback(
        async (username: string, roleName: string) => {
            if (!orgSlug) return false;

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
        [orgSlug, fetchMembers]
    );

    const updateOrgMember = useCallback(
        async (username: string, roleName: string) => {
            if (!orgSlug) return false;

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
        [orgSlug, fetchMembers]
    );

    const deleteOrgMember = useCallback(
        async (username: string) => {
            if (!orgSlug) return false;

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
        [orgSlug, fetchMembers]
    );

    return {
        members,
        loading,
        error,
        refetch: fetchMembers,
        inviteOrgMember,
        updateOrgMember,
        deleteOrgMember
    };
}