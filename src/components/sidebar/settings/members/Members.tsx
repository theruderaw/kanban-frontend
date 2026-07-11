import MemberInvite from "./MemberInvite";
import MemberRow from "./MemberRow";

import { useGetProjMembers } from "../../../../hooks/proj-members/useGetMembers";
import { useInviteProjMember } from "../../../../hooks/proj-members/useInviteMember";
import { useUpdateProjMember } from "../../../../hooks/proj-members/useUpdateMember";
import { useDeleteProjMember } from "../../../../hooks/proj-members/useDeleteMember";

interface MembersProps {
    orgSlug: string | null;
    projSlug: string | null;
}

export default function Members({
    orgSlug,
    projSlug,
}: MembersProps) {
    const { data: members = [], isFetching: loading, error: queryError } = useGetProjMembers(orgSlug, projSlug);
    const { mutateAsync: inviteMut, isPending: inviteLoading, error: inviteErr } = useInviteProjMember(orgSlug, projSlug);
    const { mutateAsync: updateMut, isPending: updateLoading, error: updateErr } = useUpdateProjMember(orgSlug, projSlug);
    const { mutateAsync: deleteMut, isPending: deleteLoading, error: deleteErr } = useDeleteProjMember(orgSlug, projSlug);

    const mutating = inviteLoading || updateLoading || deleteLoading;
    const error = queryError?.message || inviteErr?.message || updateErr?.message || deleteErr?.message;

    const invite = async (username: string, roleName: string) => { await inviteMut({ username, roleName }); return true; };
    const updateRole = async (username: string, roleName: string) => { await updateMut({ username, roleName }); return true; };
    const remove = async (username: string) => { await deleteMut(username); return true; };

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