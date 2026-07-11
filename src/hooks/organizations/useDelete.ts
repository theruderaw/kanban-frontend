import { useMutation } from "@tanstack/react-query";

import { deleteOrganization } from "../../api/org.api";

export function useDeleteOrganization() {
    return useMutation({
        mutationFn: deleteOrganization,
    });
}