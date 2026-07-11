import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRole } from "../../api/org-roles.api";

export function useDeleteOrgRole(orgSlug: string | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (name: string) => deleteRole(orgSlug!, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["org-roles", orgSlug] });
        },
    });
}
