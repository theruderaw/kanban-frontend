import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole } from "../../api/proj-roles.api";

export function useCreateProjRole(orgSlug: string | null, projSlug: string | null) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ name, perms }: { name: string; perms: string[] }) =>
            createRole(orgSlug!, name, perms, projSlug!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["proj-roles", orgSlug, projSlug] });
        },
    });
}
