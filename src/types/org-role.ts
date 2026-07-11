export interface OrgRole {
    name: string;
    permissions: string[]; // Updated to match your service's key name
    isSystemRole: boolean;
}

