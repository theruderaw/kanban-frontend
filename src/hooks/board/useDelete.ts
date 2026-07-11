import { useMutation } from "@tanstack/react-query";

import { deleteBoard } from "../../api/board.api";

export function useDeleteBoard() {
    return useMutation({
        mutationFn: ({
            projSlug,
            boardSlug,
        }: {
            projSlug: string;
            boardSlug: string;
        }) => deleteBoard(projSlug, boardSlug),
    });
}
