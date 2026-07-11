import { useMutation } from "@tanstack/react-query";

import { updateOrganization } from "../../api/org.api";
import type { UpdateOrganizationPayload } from "../../types/org";

export function useUpdateOrganization() {
    return useMutation({
        mutationFn: ({
            slug,
            payload,
        }: {
            slug: string;
            payload: UpdateOrganizationPayload;
        }) => updateOrganization(slug, payload),
    });
}