import { useOrgStore } from "../store/orgStore";

/**
 * Convenience hook — matches the old useOrg() API so callsites don't change.
 * Returns { orgSlug, setOrgSlug, clearOrg }.
 */
export function useOrg() {
    return useOrgStore();
}