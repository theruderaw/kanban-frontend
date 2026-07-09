import type { Organization } from "./org";
import type { Project } from "./project";
import type { Board } from "./board";

export interface ProjectWithBoards extends Project {
    boards: Board[];
}

export interface OrganizationWithProjects extends Organization {
    projects: ProjectWithBoards[];
}

export interface DashboardResponse {
    organizations: OrganizationWithProjects[];
}