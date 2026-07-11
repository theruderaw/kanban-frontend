import { api } from "./axios";
import type { OrgRole } from "../types/org-role";

export async function getRoles(orgSlug: string): Promise<OrgRole[]> {
    const response = await api.get(`org/${orgSlug}/roles`);
    return response.data.roles; // matching your endpoint spec payload structures
}

export async function getPerms() : Promise<string[]> {
    const response = await api.get(`org/permissions`);
    return response.data.permissions;
}

export async function createRole(orgSlug: string,name:string,permissions:string[]) : Promise <boolean> {
    const response = await api.post(`org/${orgSlug}/roles`, {
        name,
        permissions
    })
    return response.status === 201
}

export async function updateRole(orgSlug: string,roleName: string, permissions:string[]) : Promise <boolean > {
    const response = await api.put(`org/${orgSlug}/roles/${roleName}`,{
        roleName,
        permissions
    })
    return response.status === 200
}

export async function deleteRole(orgSlug: string,roleName: string) : Promise <boolean > {
    const response = await api.delete(`org/${orgSlug}/roles/${roleName}`)
    return response.status === 204
}