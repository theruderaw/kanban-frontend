import { useMutation } from "@tanstack/react-query";

import { createBoard } from "../../api/board.api";
import type { CreateBoardPayload } from "../../types/board";

export function useCreateBoard() {
    return useMutation({
        mutationFn: ({
            projSlug,
            payload,
        }: {
            projSlug: string;
            payload: CreateBoardPayload;
        }) => createBoard(projSlug, payload),
    });
}
