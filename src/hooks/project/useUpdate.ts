import { useMutation } from "@tanstack/react-query";

import { updateProject } from "../../api/proj.api";
import type { UpdateProjectPayload } from "../../types/project";

export function useUpdateProject() {
    return useMutation({
        mutationFn: ({
            orgSlug,
            projSlug,
            payload,
        }: {
            orgSlug: string;
            projSlug: string;
            payload: UpdateProjectPayload;
        }) =>
            updateProject(orgSlug, projSlug, payload),
    });
}