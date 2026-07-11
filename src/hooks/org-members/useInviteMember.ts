import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteMember } from "../../api/org-members.api";

export function useInviteOrgMember(orgSlug: string | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ username, roleName }: { username: string; roleName: string }) =>
            inviteMember(orgSlug!, username, roleName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["org-members", orgSlug] });
        },
    });
}
