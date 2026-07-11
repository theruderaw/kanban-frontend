export interface Board {
  name: string;
  slug: string;
  description: string;
  archived: boolean;
  projectId: string;
  ownedBy: string;
}

export interface CreateBoardPayload {
  name: string;
  description?: string;
}

export interface UpdateBoardPayload {
  name?: string;
  description?: string;
  archived?: boolean;
}