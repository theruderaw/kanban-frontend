import { useMutation } from "@tanstack/react-query";

import { updateBoard } from "../../api/board.api";
import type { UpdateBoardPayload } from "../../types/board";

export function useUpdateBoard() {
    return useMutation({
        mutationFn: ({
            projSlug,
            boardSlug,
            payload,
        }: {
            projSlug: string;
            boardSlug: string;
            payload: UpdateBoardPayload;
        }) => updateBoard(projSlug, boardSlug, payload),
    });
}
