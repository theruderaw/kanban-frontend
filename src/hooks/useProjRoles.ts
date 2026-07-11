import { useCallback, useEffect, useState } from "react";
import {
    getRoles,
    getPerms,
    createRole,
    updateRole,
    deleteRole,
} from "../api/proj-roles.api";
import type { ProjRole } from "../types/proj-role";

interface UseProjRolesResult {
    roles: ProjRole[];
    permissions: string[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    addRole: (name: string, permissions: string[]) => Promise<boolean>;
    updateProjRole: (name: string, permissions: string[]) => Promise<boolean>;
    deleteRole: (name: string) => Promise<boolean>;
}

export function useProjRoles(
    orgSlug: string | null,
    projSlug: string | null
): UseProjRolesResult {
    const [roles, setRoles] = useState<ProjRole[]>([]);
    const [permissions, setPermissions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = useCallback(async () => {
        if (!orgSlug || !projSlug) return;
        setLoading(true);
        setError(null);
        try {
            const [rolesData, permsData] = await Promise.all([
                getRoles(orgSlug, projSlug),
                getPerms(),
            ]);
            setRoles(rolesData);
            setPermissions(permsData);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load roles/permissions"
            );
        } finally {
            setLoading(false);
        }
    }, [orgSlug, projSlug]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const addRole = useCallback(
        async (name: string, perms: string[]) => {
            if (!orgSlug || !projSlug) return false;
            setLoading(true);
            setError(null);
            try {
                const ok = await createRole(orgSlug, name, perms, projSlug);
                if (ok) {
                    await fetchAll();
                    return true;
                }
                setError("Failed to create role: server rejected the request.");
                return false;
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to create role"
                );
                return false;
            } finally {
                setLoading(false);
            }
        },
        [orgSlug, projSlug, fetchAll]
    );

    const updateProjRole = useCallback(
        async (name: string, perms: string[]) => {
            if (!orgSlug || !projSlug) return false;
            setLoading(true);
            setError(null);
            try {
                const ok = await updateRole(orgSlug, name, perms, projSlug);
                if (ok) {
                    await fetchAll();
                    return true;
                }
                setError("Failed to update role: server rejected the request.");
                return false;
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to update role"
                );
                return false;
            } finally {
                setLoading(false);
            }
        },
        [orgSlug, projSlug, fetchAll]
    );

    const deleteProjRole = useCallback(
        async (name: string) => {
            if (!orgSlug || !projSlug) return false;
            setLoading(true);
            setError(null);
            try {
                const ok = await deleteRole(orgSlug, name, projSlug);
                if (ok) {
                    await fetchAll();
                    return true;
                }
                setError("Failed to delete role: server rejected the request.");
                return false;
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to delete role"
                );
                return false;
            } finally {
                setLoading(false);
            }
        },
        [orgSlug, projSlug, fetchAll]
    );

    return {
        roles,
        permissions,
        loading,
        error,
        refetch: fetchAll,
        addRole,
        updateProjRole,
        deleteRole: deleteProjRole,
    };
}
