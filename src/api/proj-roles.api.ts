import { api } from "./axios";
import type { ProjRole } from "../types/proj-role";

export async function getRoles(orgSlug: string, projSlug: string): Promise<ProjRole[]> {
    const response = await api.get(`proj/${orgSlug}/${projSlug}/roles`);
    return response.data.roles; // matching your endpoint spec payload structures
}

export async function getPerms(): Promise<string[]> {
    const response = await api.get(`proj/permissions`);
    return response.data.permissions;
}

export async function createRole(orgSlug: string, name: string, permissions: string[], projSlug: string): Promise<boolean> {
    const response = await api.post(`proj/${orgSlug}/${projSlug}/roles`, {
        name,
        permissions
    })
    return response.status === 201
}

export async function updateRole(orgSlug: string, roleName: string, permissions: string[], projSlug: string): Promise<boolean> {
    const response = await api.put(`proj/${orgSlug}/${projSlug}/roles/${roleName}`, {
        roleName,
        permissions
    })
    return response.status === 200
}

export async function deleteRole(orgSlug: string, roleName: string, projSlug: string): Promise<boolean> {
    const response = await api.delete(`proj/${orgSlug}/${projSlug}/roles/${roleName}`)
    return response.status === 204
}