import { api } from "./axios";
import type { ProjMember } from "../types/proj-member";

export async function getProjMembers(
    orgSlug: string,
    projSlug: string
): Promise<ProjMember[]> {
    const response = await api.get(`proj/${orgSlug}/${projSlug}/members`);
    return response.data.members;
}

// Phase 2 — Verified Frontend Invitation Endpoint
export async function inviteMember(
    orgSlug: string,
    projSlug: string, 
    username: string, 
    roleName: string
): Promise<void> {
    await api.post(`proj/${orgSlug}/${projSlug}/members`, {
        username,
        roleName
    });
}

export async function updateMember(
    orgSlug: string, 
    projSlug: string,
    username: string, 
    roleName: string
): Promise<void> {
    await api.patch(`proj/${orgSlug}/${projSlug}/members/${username}`, {
        roleName
    });
}

export async function deleteMember(
    orgSlug: string, 
    projSlug: string,
    username: string
): Promise<void> {
    await api.delete(`proj/${orgSlug}/${projSlug}/members/${username}`);
}