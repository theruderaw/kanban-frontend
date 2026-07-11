import { useEffect, useState } from "react";
import { AlertTriangle, Shield, SlidersHorizontal, Users, X } from "lucide-react";
import type { ProjectWithBoards } from "../../../types/dashboard";
import General from "./General";
import Members from "./members/Members";
import Roles from "./roles/Roles";
import DangerZone from "./DangerZone";

type SettingsTab = "general" | "members" | "roles" | "danger";

const TABS: { id: SettingsTab; label: string; icon: typeof SlidersHorizontal }[] = [
    { id: "general", label: "General", icon: SlidersHorizontal },
    { id: "members", label: "Members", icon: Users },
    { id: "roles", label: "Roles", icon: Shield },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
];

interface ProjectSettingsModalProps {
    project: ProjectWithBoards;
    orgSlug: string;
    isOpen: boolean;
    onClose: () => void;
    onSaved?: () => void;
}

export default function ProjectSettingsModal({
    project,
    orgSlug,
    isOpen,
    onClose,
    onSaved,
}: ProjectSettingsModalProps) {
    const [activeTab, setActiveTab] = useState<SettingsTab>("general");

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={onClose}
        >
            <div
                className="w-[720px] max-w-[92vw] h-[480px] max-h-[85vh] bg-[#121212] border border-[#262626] rounded-lg shadow-2xl flex overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Tab sidebar */}
                <div className="w-48 shrink-0 border-r border-[#262626] bg-[#161616] p-3 flex flex-col">
                    <div className="px-2 pb-3 mb-2 border-b border-[#262626]">
                        <p className="text-xs text-[#525252] uppercase tracking-wide">Settings</p>
                        <p className="text-sm text-white truncate">{project.name}</p>
                    </div>

                    <nav className="flex flex-col gap-0.5">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            const isDanger = tab.id === "danger";
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-left transition ${
                                        isActive
                                            ? isDanger
                                                ? "bg-red-500/10 text-red-400"
                                                : "bg-[#1E1E1E] text-white"
                                            : isDanger
                                                ? "text-red-400/70 hover:bg-[#1E1E1E] hover:text-red-400"
                                                : "text-[#A3A3A3] hover:bg-[#1E1E1E] hover:text-white"
                                    }`}
                                >
                                    <Icon size={14} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-[#262626]">
                        <h2 className="text-sm font-medium text-white">
                            {TABS.find((t) => t.id === activeTab)?.label}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1 rounded text-[#525252] hover:text-white hover:bg-[#1E1E1E] transition"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5">
                        {activeTab === "general" && (
                            <General project={project} orgSlug={orgSlug} onSaved={onSaved} />
                        )}

                        {activeTab === "members" && (
                            <Members projSlug={project.slug} orgSlug={orgSlug}/>
                        )}

                        {activeTab === "roles" && (
                            <Roles projSlug={project.slug} orgSlug={orgSlug}/>
                        )}

                        {activeTab === "danger" && (
                            <DangerZone 
                                project={project} 
                                orgSlug={orgSlug}
                                onDeleted={onClose}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}