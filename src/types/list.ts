export interface List {
    _id: string;
    title: string;
    rank: string;
    boardId: string;
}

export interface CreateListPayload {
    title: string;
    boardId: string;
    prevRank?: string;
    nextRank?: string;
}

export interface UpdateListPayload {
    title: string;
}

export interface ReorderListPayload {
    prevRank?: string;
    nextRank?: string;
}
