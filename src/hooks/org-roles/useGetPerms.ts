import { useQuery } from "@tanstack/react-query";
import { getPerms } from "../../api/org-roles.api";

export function useGetOrgPerms() {
    return useQuery({
        queryKey: ["org-permissions"],
        queryFn: getPerms,
        staleTime: Infinity,
    });
}
