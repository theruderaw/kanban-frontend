import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createList } from "../../api/list.api";

export function useCreateList(boardId: string | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createList,
        onSuccess: () => {
            if (boardId) {
                queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
            }
        },
    });
}
