import { useQuery } from "@tanstack/react-query";
import { getOrgMembers } from "../../api/org-members.api";

export function useGetOrgMembers(orgSlug: string | undefined) {
    return useQuery({
        queryKey: ["org-members", orgSlug],
        queryFn: () => getOrgMembers(orgSlug!),
        enabled: Boolean(orgSlug),
    });
}
