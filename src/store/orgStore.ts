import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrgState {
    orgSlug: string | null;
    setOrgSlug: (slug: string) => void;
    clearOrg: () => void;
}

export const useOrgStore = create<OrgState>()(
    persist(
        (set) => ({
            orgSlug: null,
            setOrgSlug: (slug) => set({ orgSlug: slug }),
            clearOrg: () => set({ orgSlug: null }),
        }),
        {
            name: "org-storage",
            // Only persist the slug, not the functions
            partialize: (state) => ({ orgSlug: state.orgSlug }),
        }
    )
);
