export interface Organization {
    name: string;
    slug: string;
    description?: string;
    deletedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateOrganizationPayload {
    name: string;
    description?: string;
}

export interface UpdateOrganizationPayload {
    name?: string;
    description?: string;
}