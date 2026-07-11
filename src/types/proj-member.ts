import type { ProjRole } from "./proj-role";
import type { User } from "./user";

export interface ProjMember{
    userId: User
    projRoleId: ProjRole
}