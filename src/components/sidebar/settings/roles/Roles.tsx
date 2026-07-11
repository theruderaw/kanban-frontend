import { useState } from "react";

import { Plus } from "lucide-react";

import { useProjRoles } from "../../../../hooks/useProjRoles";

import RoleRow from "./RoleRow";
import RoleForm from "./RoleForm";

import type { ProjRole } from "../../../../types/proj-role";

interface Props {
    orgSlug: string;
    projSlug: string;
}

export default function Roles({
    orgSlug,
    projSlug,
}: Props) {
    const {
        roles,
        permissions,
        loading,
        addRole,
        updateProjRole,
        deleteRole,
    } = useProjRoles(orgSlug, projSlug);

    const [formOpen, setFormOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<ProjRole | null>(null);

    function openCreate() {
        setEditingRole(null);
        setFormOpen(true);
    }

    function openEdit(role: ProjRole) {
        setEditingRole(role);
        setFormOpen(true);
    }

    function closeForm() {
        setFormOpen(false);
        setEditingRole(null);
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-white">
                        Roles
                    </p>
                    <p className="text-xs text-[#525252]">
                        Manage project roles and permissions.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreate}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#3B82F6] text-sm text-white hover:bg-[#3B82F6]/90 transition"
                >
                    <Plus size={14} />
                    Create Role
                </button>
            </div>


            <div className="border border-[#262626] rounded-md overflow-hidden">
                {roles.length === 0 ? (
                    <div className="px-4 py-6 text-center">
                        <p className="text-sm text-[#525252]">
                            No roles found.
                        </p>
                    </div>
                ) : (
                    roles.map((role) => (
                        <RoleRow
                            key={role.name}
                            role={role}
                            onClick={() => openEdit(role)}
                            onDelete={() => deleteRole(role.name)}
                        />
                    ))
                )}
            </div>


            <RoleForm
                open={formOpen}
                role={editingRole}
                permissions={permissions}
                loading={loading}
                onCreate={addRole}
                onUpdate={updateProjRole}
                onClose={closeForm}
            />
        </div>
    );
}