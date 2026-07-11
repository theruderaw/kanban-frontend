import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMember } from "../../api/org-members.api";

export function useUpdateOrgMember(orgSlug: string | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ username, roleName }: { username: string; roleName: string }) =>
            updateMember(orgSlug!, username, roleName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["org-members", orgSlug] });
        },
    });
}
