import { useMutation } from "@tanstack/react-query";

import { deleteProject } from "../../api/proj.api";

export function useDeleteProject() {
    return useMutation({
        mutationFn: ({
            orgSlug,
            projSlug,
        }: {
            orgSlug: string;
            projSlug: string;
        }) => deleteProject(orgSlug, projSlug),
    });
}