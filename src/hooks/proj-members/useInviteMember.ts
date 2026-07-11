import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteMember } from "../../api/proj-members.api";

export function useInviteProjMember(orgSlug: string | null, projSlug: string | null) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ username, roleName }: { username: string; roleName: string }) =>
            inviteMember(orgSlug!, projSlug!, username, roleName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["proj-members", orgSlug, projSlug] });
        },
    });
}
