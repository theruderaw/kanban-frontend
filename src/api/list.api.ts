import { api } from "./axios";
import type { CreateListPayload, UpdateListPayload, ReorderListPayload, List } from "../types/list";

export async function createList(payload: CreateListPayload): Promise<List> {
    const response = await api.post('/list', payload);
    return response.data.list || response.data;
}

export async function getLists(boardId: string): Promise<List[]> {
    const response = await api.get(`/list/board/${boardId}`);
    return response.data.lists || response.data;
}

export async function updateList(listId: string, payload: UpdateListPayload): Promise<List> {
    const response = await api.patch(`/list/${listId}`, payload);
    return response.data.list || response.data;
}

export async function reorderList(listId: string, payload: ReorderListPayload): Promise<List> {
    const response = await api.patch(`/list/${listId}/reorder`, payload);
    return response.data.list || response.data;
}

export async function deleteList(listId: string): Promise<void> {
    await api.delete(`/list/${listId}`);
}
