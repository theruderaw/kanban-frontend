import {api} from "./axios";
import type { CreateProjectPayload, UpdateProjectPayload } from "../types/project";


export async function createProject(
    orgSlug: string,
    payload: CreateProjectPayload
) {
    const response = await api.post(
        `/proj/${orgSlug}`,
        payload
    );

    return response.data;
}

export async function updateProject(
    orgSlug: string,
    projSlug: string,
    payload: UpdateProjectPayload
) {
    const response = await api.patch(
        `/proj/${orgSlug}/${projSlug}`,
        payload
    );

    return response.data
}


export async function deleteProject(
    orgSlug: string,
    projSlug: string
) {
    const response = await api.delete(
        `/proj/${orgSlug}/${projSlug}`
    );

    return response.data
}