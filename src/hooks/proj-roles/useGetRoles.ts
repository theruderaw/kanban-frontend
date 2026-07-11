import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../api/proj-roles.api";

export function useGetProjRoles(orgSlug: string | null, projSlug: string | null) {
    return useQuery({
        queryKey: ["proj-roles", orgSlug, projSlug],
        queryFn: () => getRoles(orgSlug!, projSlug!),
        enabled: Boolean(orgSlug && projSlug),
    });
}
