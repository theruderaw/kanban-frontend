import {api} from "./axios";
import type { CreateOrganizationPayload, UpdateOrganizationPayload } from "../types/org";




export async function createOrganization(
    payload: CreateOrganizationPayload
) {
    const response = await api.post(
        "/org",
        payload
    );

    return response.data;
}


export async function updateOrganization(
    orgSlug: string,
    payload: UpdateOrganizationPayload
) {
    const response = await api.patch(
        `org/${orgSlug}`,
        payload
    );

    return response.data
}


export async function deleteOrganization(
    orgSlug: string
) {
    const response = await api.delete(
        `org/${orgSlug}`
    )

    return response.status == 204
}

export async function checkOrganizationSlug(slug: string) {
    const response = await api.get(
        `org/check/${slug}`
    );

    return response.data;
}