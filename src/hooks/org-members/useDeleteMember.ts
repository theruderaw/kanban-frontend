import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "../../api/org-members.api";

export function useDeleteOrgMember(orgSlug: string | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (username: string) => deleteMember(orgSlug!, username),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["org-members", orgSlug] });
        },
    });
}
