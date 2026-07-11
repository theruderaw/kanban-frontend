import type { User } from "./user";
import type { OrgRole } from "./org-role";

export interface Member {
    userId: User;
    orgRoleId: OrgRole;
}