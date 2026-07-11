import { useState } from "react";
import type { ProjRole } from "../../../../types/proj-role";
import { Check, Trash2, X } from "lucide-react";

interface Props {
    role: ProjRole;
    onClick: () => void;
    onDelete: () => void; // Added delete handler prop
}

export default function RoleRow({
    role,
    onClick,
    onDelete,
}: Props) {
    const [isConfirming, setIsConfirming] = useState(false);
    if (!role) return;
    return (
        <div className="w-full flex items-center justify-between hover:bg-[#1E1E1E] transition group">
            {/* Left: Main Action / Name Button */}

            <button
                type="button"
                onClick={onClick}
                className="flex-1 text-left px-4 py-4"
            >
                <p className="text-sm font-medium text-white">
                    {role.name}
                </p>
                <p className="text-xs text-[#A3A3A3] mt-0.5">
                    {role.permissions?.length || 0} permissions assigned
                </p>
            </button>

            {/* Right: Actions Section */}
            <div className="px-4 shrink-0 flex items-center">
                {!isConfirming ? (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation(); // Stop click from triggering parent row onClick
                            setIsConfirming(true);
                        }}
                        className="px-2.5 py-1.5 text-xs font-medium text-red-400 rounded-md hover:bg-red-950/30 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-150"
                    >
                        <Trash2 className="w-4 h-4"/>
                    </button>
                ) : (
                    // Inline confirmation state
                    <div className="flex items-center gap-1.5 animate-fadeIn">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            className="px-2.5 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition"
                        >
                            <Check className="w-4 h-4"/>
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsConfirming(false);
                            }}
                            className="px-2.5 py-1.5 text-xs font-medium text-[#A3A3A3] bg-[#262626] rounded-md hover:text-white transition"
                        >
                            <X className="w-4 h-4"/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}