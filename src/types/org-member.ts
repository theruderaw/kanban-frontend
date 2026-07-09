import type { User } from "./user";
import type { Role } from "./role";

export interface Member {
    userId: User;
    orgRoleId: Role;
}