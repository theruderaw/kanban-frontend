import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteList } from "../../api/list.api";

export function useDeleteList(boardId: string | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteList,
        onSuccess: () => {
            if (boardId) {
                queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
            }
        },
    });
}
