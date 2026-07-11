import { useState } from "react";

import {
    createBoard,
    deleteBoard,
    updateBoard,
} from "../api/board.api";

import type {
    CreateBoardPayload,
    UpdateBoardPayload,
} from "../types/board";

export function useBoard() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function execute<T>(
        action: () => Promise<T>,
        fallbackMessage: string
    ): Promise<T> {

        try {

            setLoading(true);
            setError(null);

            return await action();

        } catch (err) {

            setError(
                err instanceof Error
                    ? err.message
                    : fallbackMessage
            );

            throw err;

        } finally {

            setLoading(false);

        }

    }

    function create(
        projSlug: string,
        payload: CreateBoardPayload
    ) {
        return execute(
            () => createBoard(projSlug, payload),
            "Failed to create board"
        );
    }

    function update(
        projSlug: string,
        boardSlug: string,
        payload: UpdateBoardPayload
    ) {
        return execute(
            () => updateBoard(projSlug, boardSlug, payload),
            "Failed to update board"
        );
    }

    function del(
        projSlug: string,
        boardSlug: string
    ) {
        return execute(
            () => deleteBoard(projSlug, boardSlug),
            "Failed to delete board"
        );
    }

    return {
        create,
        update,
        del,
        loading,
        error,
    };

}