import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRole } from "../../api/proj-roles.api";

export function useDeleteProjRole(orgSlug: string | null, projSlug: string | null) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (name: string) => deleteRole(orgSlug!, name, projSlug!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["proj-roles", orgSlug, projSlug] });
        },
    });
}
