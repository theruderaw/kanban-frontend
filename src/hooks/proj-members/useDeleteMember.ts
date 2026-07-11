import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "../../api/proj-members.api";

export function useDeleteProjMember(orgSlug: string | null, projSlug: string | null) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (username: string) => deleteMember(orgSlug!, projSlug!, username),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["proj-members", orgSlug, projSlug] });
        },
    });
}
