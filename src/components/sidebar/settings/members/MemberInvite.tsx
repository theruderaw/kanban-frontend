import { useState } from "react";
import { UserPlus } from "lucide-react";

import SearchUser from "../../../ui/SearchUser";
import RoleList from "../../../ui/RoleList";

import type { User } from "../../../../types/user";

interface Props {
    orgSlug: string | null;
    projSlug: string | null;
    mutating: boolean;
    onInvite: (username: string, roleName: string) => Promise<unknown>;
}

export default function MemberInvite({
    orgSlug,
    projSlug,
    mutating,
    onInvite,
}: Props) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [inviteRole, setInviteRole] = useState("");

    async function handleInvite() {
        if (!selectedUser || !inviteRole.trim()) return;

        try {
            await onInvite(selectedUser.username, inviteRole);
            setSelectedUser(null);
            setInviteRole("");
        } catch {
            // handled by parent hook
        }
    }

    return (
        <div>
            <label className="block text-xs text-[#A3A3A3] mb-1">
                Invite member
            </label>

            <div className="flex items-center gap-2">
                <div className="flex-1">
                    <SearchUser
                        value={selectedUser}
                        onChange={setSelectedUser}
                        placeholder="Search username..."
                    />
                </div>

                <div className="w-36 shrink-0">
                    <RoleList
                        orgSlug={orgSlug}
                        projSlug={projSlug}
                        value={inviteRole}
                        onChange={setInviteRole}
                        placeholder="Role"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleInvite}
                    disabled={!selectedUser || !inviteRole || mutating}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-sm rounded-md bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90 transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                    <UserPlus size={15} />
                    Invite
                </button>
            </div>
        </div>
    );
}