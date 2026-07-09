export interface Project {
    name: string;
    slug: string;
    description?: string;
    orgId?: string
}

export interface CreateProjectPayload {
    name: string;
    description?: string;
}

export interface UpdateProjectPayload {
    name: string;
    description?: string;
}