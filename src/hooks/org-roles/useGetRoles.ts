import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../api/org-roles.api";

export function useGetOrgRoles(orgSlug: string | undefined) {
    return useQuery({
        queryKey: ["org-roles", orgSlug],
        queryFn: () => getRoles(orgSlug!),
        enabled: Boolean(orgSlug),
    });
}
