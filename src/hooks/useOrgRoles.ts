// hooks/useOrgRoles.ts
import { useState, useEffect, useCallback } from "react";
import { getRoles, getPerms, createRole,updateRole, deleteRole } from "../api/org-roles.api";
import type { OrgRole } from "../types/org-role";

interface UseOrgRolesResult {
  roles: OrgRole[];
  permissions: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addOrgRole: (name: string, permissions: string[]) => Promise<boolean | undefined>;
  updateOrgRole: (name: string, permissions: string[]) => Promise<boolean | undefined>;
  deleteOrgRole: (name: string) => Promise<boolean | undefined>;
}

export function useOrgRoles(orgSlug: string | undefined): UseOrgRolesResult {
  const [roles, setRoles] = useState<OrgRole[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!orgSlug) return;
    setLoading(true);
    setError(null);
    try {
      const [rolesData, permsData] = await Promise.all([
        getRoles(orgSlug),
        getPerms(),
      ]);
      setRoles(rolesData);
      setPermissions(permsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load roles/permissions");
    } finally {
      setLoading(false);
    }
  }, [orgSlug]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const addOrgRole = useCallback(
    async (name: string, permissions: string[]) => {
      if (!orgSlug) return;
      setLoading(true);
      setError(null);
      try {
        const ok = await createRole(orgSlug, name, permissions);
        if (ok) {
          await fetchAll(); 
          return true;
        }
        setError("Failed to create role: Server rejected the request.");
        return false;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create role");
        return false; // Return false so the component knows it failed
      } finally {
        setLoading(false);
      }
    },
    [orgSlug, fetchAll]
  );

  const updateOrgRole = useCallback(
    async (name: string, permissions: string[]) => {
      if (!orgSlug) return;
      setLoading(true);
      setError(null);
      try {
        const ok = await updateRole(orgSlug, name, permissions);
        if (ok) {
          await fetchAll(); 
          return true;
        }
        setError("Failed to create role: Server rejected the request.");
        return false;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create role");
        return false; // Return false so the component knows it failed
      } finally {
        setLoading(false);
      }
    },
    [orgSlug,fetchAll]
  );

  const deleteOrgRole = useCallback(
    async (name: string) => {
      if (!orgSlug) throw new Error("orgSlug is required");
      setLoading(true);
      setError(null);
      try {
        const ok = await deleteRole(orgSlug, name);
        if (ok) {
          await fetchAll(); 
          return true;
        }
        setError("Failed to create role: Server rejected the request.");
        return false;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create role");
        return false; // Return false so the component knows it failed
      } finally {
        setLoading(false);
      }
    },
    [orgSlug,fetchAll]
  );

  return { roles, permissions, loading, error, refetch: fetchAll, addOrgRole , updateOrgRole, deleteOrgRole};
}