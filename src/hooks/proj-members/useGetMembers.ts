import { useQuery } from "@tanstack/react-query";
import { getProjMembers } from "../../api/proj-members.api";

export function useGetProjMembers(orgSlug: string | null, projSlug: string | null) {
    return useQuery({
        queryKey: ["proj-members", orgSlug, projSlug],
        queryFn: () => getProjMembers(orgSlug!, projSlug!),
        enabled: Boolean(orgSlug && projSlug),
    });
}
