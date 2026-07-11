import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMember } from "../../api/proj-members.api";

export function useUpdateProjMember(orgSlug: string | null, projSlug: string | null) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ username, roleName }: { username: string; roleName: string }) =>
            updateMember(orgSlug!, projSlug!, username, roleName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["proj-members", orgSlug, projSlug] });
        },
    });
}
