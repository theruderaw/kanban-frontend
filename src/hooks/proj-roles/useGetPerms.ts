import { useQuery } from "@tanstack/react-query";
import { getPerms } from "../../api/proj-roles.api";

export function useGetProjPerms() {
    return useQuery({
        queryKey: ["proj-permissions"],
        queryFn: getPerms,
        staleTime: Infinity,
    });
}
