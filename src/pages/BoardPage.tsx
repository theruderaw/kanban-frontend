import { useParams } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";
import { useGetLists } from "../hooks/list/useGetLists";
import { useCreateList } from "../hooks/list/useCreateList";
import { useUpdateList } from "../hooks/list/useUpdateList";
import { useDeleteList } from "../hooks/list/useDeleteList";
import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import type { List } from "../types/list";

export default function BoardPage() {
    const { orgSlug, projectSlug, boardSlug } = useParams();
    const { data: dashboard, isLoading: isDashboardLoading } = useDashboard();
    
    const org = dashboard?.organizations.find(o => o.slug === orgSlug);
    const proj = org?.projects.find(p => p.slug === projectSlug);
    const board = proj?.boards.find(b => b.slug === boardSlug);
    
    const boardId = board?._id;
    
    const { data: lists = [], isLoading: isListsLoading } = useGetLists(boardId);
    
    const { mutate: createList, isPending: isCreating } = useCreateList(boardId);
    const { mutate: updateList } = useUpdateList(boardId);
    const { mutate: deleteList } = useDeleteList(boardId);
    
    const [newListTitle, setNewListTitle] = useState("");
    const [editingListId, setEditingListId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");

    const handleCreateList = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newListTitle.trim() || !boardId) return;
        createList({ title: newListTitle, boardId }, {
            onSuccess: () => setNewListTitle("")
        });
    };

    const handleUpdateList = (listId: string) => {
        if (!editTitle.trim()) {
            setEditingListId(null);
            return;
        }
        updateList({ listId, payload: { title: editTitle } }, {
            onSuccess: () => setEditingListId(null)
        });
    };
    
    if (isDashboardLoading) return <div className="p-8 text-[#A3A3A3]">Loading board...</div>;
    if (!board) return <div className="p-8 text-red-400">Board not found</div>;

    return (
        <div className="h-full flex flex-col bg-[#121212] font-sans">
            <header className="px-6 py-4 border-b border-[#262626] flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-xl font-bold text-white">{board.name}</h1>
                    <p className="text-sm text-[#A3A3A3] mt-0.5">{board.description || 'No description'}</p>
                </div>
            </header>
            
            <main className="flex-1 overflow-x-auto overflow-y-hidden p-6 flex gap-4 items-start">
                {isListsLoading ? (
                    <div className="text-[#A3A3A3]">Loading lists...</div>
                ) : (
                    <>
                        {lists.map((list: List) => (
                            <div key={list._id} className="w-72 shrink-0 bg-[#1E1E1E] rounded-lg border border-[#262626] flex flex-col max-h-full">
                                <div className="p-3 border-b border-[#262626] flex items-center justify-between group">
                                    {editingListId === list._id ? (
                                        <input
                                            autoFocus
                                            className="bg-[#121212] text-sm text-white px-2 py-1 rounded w-full outline-none border border-[#3B82F6]"
                                            value={editTitle}
                                            onChange={e => setEditTitle(e.target.value)}
                                            onBlur={() => handleUpdateList(list._id)}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') handleUpdateList(list._id);
                                                if (e.key === 'Escape') setEditingListId(null);
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <h3 className="text-sm font-semibold text-white px-2">{list.title}</h3>
                                            <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                                                <button onClick={() => { setEditingListId(list._id); setEditTitle(list.title); }} className="p-1 text-[#A3A3A3] hover:text-white rounded hover:bg-[#262626]">
                                                    <Edit2 size={14} />
                                                </button>
                                                <button onClick={() => deleteList(list._id)} className="p-1 text-[#A3A3A3] hover:text-red-400 rounded hover:bg-[#262626]">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="flex-1 p-2 overflow-y-auto space-y-2 min-h-[4rem]">
                                    {/* Items go here */}
                                    <div className="text-xs text-[#525252] text-center italic p-4">No items yet</div>
                                </div>
                                <div className="p-2 pt-0">
                                    <button className="w-full text-left px-2 py-1.5 text-sm text-[#A3A3A3] hover:bg-[#262626] hover:text-white rounded flex items-center gap-2 transition">
                                        <Plus size={14} /> Add a card
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        <div className="w-72 shrink-0">
                            <form onSubmit={handleCreateList} className="bg-[#1E1E1E] rounded-lg border border-[#262626] p-2">
                                <input
                                    className="w-full bg-[#121212] text-sm text-white px-3 py-2 rounded outline-none border border-[#333333] focus:border-[#3B82F6] placeholder:text-[#525252]"
                                    placeholder="+ Add another list"
                                    value={newListTitle}
                                    onChange={e => setNewListTitle(e.target.value)}
                                    disabled={isCreating}
                                />
                            </form>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
