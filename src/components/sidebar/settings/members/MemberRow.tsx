import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import RoleList from "../../../ui/RoleList";

import type { ProjMember } from "../../../../types/proj-member";

interface Props {
    member: ProjMember;
    orgSlug: string | null;
    projSlug: string | null;
    onUpdateRole: (username: string, roleName: string) => Promise<unknown>;
    onRemove: (username: string) => Promise<unknown>;
}

function initials(username: string) {
    return username.slice(0, 2).toUpperCase();
}

export default function MemberRow({
    member,
    orgSlug,
    projSlug,
    onUpdateRole,
    onRemove,
}: Props) {
    const { username, email, avatarUrl } = member.userId;
    const roleName = member.projRoleId.name;

    const [editing, setEditing] = useState(false);
    const [roleDraft, setRoleDraft] = useState(roleName);

    async function handleRoleChange(role: string) {
        setRoleDraft(role);
        setEditing(false);

        if (!role.trim()) return;

        try {
            await onUpdateRole(username, role);
        } catch {
            // handled by parent hook
            setRoleDraft(roleName);
        }
    }

    async function handleRemove() {
        if (!window.confirm(`Remove ${username} from this project?`)) return;

        try {
            await onRemove(username);
        } catch {
            // handled by parent hook
        }
    }

    return (
        <div className="group flex items-center gap-3 px-4 py-3 hover:bg-[#1E1E1E] transition">
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt={username}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                />
            ) : (
                <div className="w-9 h-9 rounded-full bg-[#262626] text-[#A3A3A3] text-xs font-medium flex items-center justify-center shrink-0">
                    {initials(username)}
                </div>
            )}

            <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{username}</p>
                <p className="text-xs text-[#525252] truncate">{email}</p>
            </div>

            {editing ? (
                <div className="w-36 shrink-0">
                    <RoleList
                        orgSlug={orgSlug}
                        projSlug={projSlug}
                        value={roleDraft}
                        onChange={handleRoleChange}
                    />
                </div>
            ) : (
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#262626] text-[#A3A3A3] shrink-0">
                    {roleName}
                </span>
            )}

            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                    type="button"
                    onClick={() => setEditing(true)}
                    title="Change role"
                    className="p-1.5 rounded text-[#525252] hover:text-white hover:bg-[#262626] transition"
                >
                    <Pencil size={13} />
                </button>

                <button
                    type="button"
                    onClick={handleRemove}
                    title="Remove member"
                    className="p-1.5 rounded text-[#525252] hover:text-red-400 hover:bg-[#262626] transition"
                >
                    <Trash2 size={13} />
                </button>
            </div>
        </div>
    );
}