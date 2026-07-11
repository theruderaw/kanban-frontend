import { useQuery } from "@tanstack/react-query";

import { checkOrganizationSlug } from "../../api/org.api";

export function useCheckOrganizationSlug(slug: string) {
    return useQuery({
        queryKey: ["organization-slug", slug],
        queryFn: () => checkOrganizationSlug(slug),
        enabled: slug.trim().length > 2,
        staleTime: 1000 * 60 * 5,
    });
}