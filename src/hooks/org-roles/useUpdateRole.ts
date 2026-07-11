import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRole } from "../../api/org-roles.api";

export function useUpdateOrgRole(orgSlug: string | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ name, perms }: { name: string; perms: string[] }) =>
            updateRole(orgSlug!, name, perms),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["org-roles", orgSlug] });
        },
    });
}
