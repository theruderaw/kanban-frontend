import MemberInvite from "./MemberInvite";
import MemberRow from "./MemberRow";

import { useMembers } from "../../../../hooks/useProjMembers";

interface MembersProps {
    orgSlug: string | null;
    projSlug: string | null;
}

export default function Members({
    orgSlug,
    projSlug,
}: MembersProps) {
    const {
        members,
        loading,
        mutating,
        error,
        invite,
        updateRole,
        remove,
    } = useMembers(orgSlug, projSlug);

    return (
        <div className="space-y-6">
            <MemberInvite
                orgSlug={orgSlug}
                projSlug={projSlug}
                mutating={mutating}
                onInvite={invite}
            />

            {error && (
                <p className="text-sm text-red-400">
                    {error}
                </p>
            )}

            <div>
                <label className="block text-xs text-[#A3A3A3] mb-2">
                    {loading
                        ? "Loading members…"
                        : `${members.length} member${members.length === 1 ? "" : "s"}`}
                </label>

                {loading ? (
                    <div className="space-y-2">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="h-14 rounded-md bg-[#1E1E1E] animate-pulse"
                            />
                        ))}
                    </div>
                ) : members.length === 0 ? (
                    <div className="border border-[#262626] rounded-md px-4 py-6 text-center">
                        <p className="text-sm text-[#A3A3A3]">
                            No members yet.
                        </p>
                    </div>
                ) : (
                    <div className="border border-[#262626] rounded-md divide-y divide-[#262626] overflow-hidden">
                        {members.map((member) => (
                            <MemberRow
                                key={member.userId.username}
                                member={member}
                                orgSlug={orgSlug}
                                projSlug={projSlug}
                                onUpdateRole={updateRole}
                                onRemove={remove}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}