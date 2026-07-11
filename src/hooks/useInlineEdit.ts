import { useEffect, useRef, useState } from "react";

export function useInlineEdit(
    initialValue: string,
    onCommit: (value: string) => void
) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(initialValue);
    const inputRef = useRef < HTMLInputElement > (null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isEditing]);

    const start = (value: string = initialValue) => {
        setDraft(value);
        setIsEditing(true);
    };

    const commit = () => {
        const trimmed = draft.trim();
        setIsEditing(false);

        if (trimmed === "" || trimmed === initialValue) {
            setDraft(initialValue);
            return;
        }

        onCommit(trimmed);
    };

    const cancel = () => {
        setDraft(initialValue);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            commit();
        } else if (e.key === "Escape") {
            e.preventDefault();
            cancel();
        }
    };

    return { isEditing, draft, setDraft, inputRef, start, commit, cancel, handleKeyDown };
}