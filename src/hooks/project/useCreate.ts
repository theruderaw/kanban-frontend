import { useMutation } from "@tanstack/react-query";

import { createProject } from "../../api/proj.api";
import type { CreateProjectPayload } from "../../types/project";

export function useCreateProject() {
    return useMutation({
        mutationFn: ({
            orgSlug,
            payload,
        }: {
            orgSlug: string;
            payload: CreateProjectPayload;
        }) => createProject(orgSlug, payload),
    });
}