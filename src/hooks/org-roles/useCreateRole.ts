import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole } from "../../api/org-roles.api";

export function useCreateOrgRole(orgSlug: string | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ name, perms }: { name: string; perms: string[] }) =>
            createRole(orgSlug!, name, perms),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["org-roles", orgSlug] });
        },
    });
}
