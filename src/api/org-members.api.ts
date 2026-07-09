import { api } from "./axios";
import type { Member } from "../types/org-member";

export async function getOrgMembers(orgSlug: string): Promise<Member[]> {
    const response = await api.get(`org/${orgSlug}/members`);
    return response.data.members;
}

// Phase 2 — Verified Frontend Invitation Endpoint
export async function inviteMember(
    orgSlug: string, 
    username: string, 
    roleName: string
): Promise<void> {
    await api.post(`org/${orgSlug}/members`, {
        username,
        roleName
    });
}

export async function updateMember(
    orgSlug: string, 
    username: string, 
    roleName: string
): Promise<void> {
    await api.patch(`org/${orgSlug}/members/${username}`, {
        roleName
    });
}

export async function deleteMember(
    orgSlug: string, 
    username: string
): Promise<void> {
    await api.delete(`org/${orgSlug}/members/${username}`);
}