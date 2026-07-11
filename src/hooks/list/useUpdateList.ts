import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateList } from "../../api/list.api";
import type { UpdateListPayload } from "../../types/list";

export function useUpdateList(boardId: string | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ listId, payload }: { listId: string; payload: UpdateListPayload }) => updateList(listId, payload),
        onSuccess: () => {
            if (boardId) {
                queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
            }
        },
    });
}
