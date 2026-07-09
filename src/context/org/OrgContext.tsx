import { createContext } from "react";

export interface OrgContextType {
    orgSlug: string | null;
    setOrgSlug: (slug: string) => void;
}

export const OrgContext = createContext<OrgContextType | null>(null);