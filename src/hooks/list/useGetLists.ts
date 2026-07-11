import { useQuery } from "@tanstack/react-query";
import { getLists } from "../../api/list.api";

export function useGetLists(boardId: string | undefined) {
    return useQuery({
        queryKey: ["lists", boardId],
        queryFn: () => getLists(boardId!),
        enabled: Boolean(boardId),
    });
}
