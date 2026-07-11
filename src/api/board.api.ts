import { api } from "./axios";
import type { CreateBoardPayload, UpdateBoardPayload } from "../types/board";

export async function createBoard(
    projSlug: string,
    payload: CreateBoardPayload
) {
    const response = await api.post(
        `/board/${projSlug}`,
        payload
    );

    return response.data;
}

export async function getBoards(
    projSlug: string
) {
    const response = await api.get(
        `/board/${projSlug}`
    );

    return response.data;
}

export async function getBoard(
    projSlug: string,
    boardSlug: string
) {
    const response = await api.get(
        `/board/${projSlug}/${boardSlug}`
    );

    return response.data;
}

export async function updateBoard(
    projSlug: string,
    boardSlug: string,
    payload: UpdateBoardPayload
) {
    const response = await api.patch(
        `/board/${projSlug}/${boardSlug}`,
        payload
    );

    return response.data;
}

export async function deleteBoard(
    projSlug: string,
    boardSlug: string
) {
    const response = await api.delete(
        `/board/${projSlug}/${boardSlug}`
    );

    return response.data;
}