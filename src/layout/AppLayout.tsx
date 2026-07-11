import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OrgSelectModal from "../components/org/OrgSelectModal";
import { useOrg } from "../hooks/useOrg";

export default function AppLayout() {
    const { orgSlug } = useOrg(); 
    const [orgModalOpen, setOrgModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!orgSlug) {
            setOrgModalOpen(true);
        }
    }, [orgSlug, navigate]);

    // Keyboard shortcut listener for Ctrl + O / Cmd + O
useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
        // Ensure we match 'o' or 'O' reliably
        const isOKey = e.key === 'o' || e.key === 'O';
        const isModifier = e.ctrlKey || e.metaKey;

        if (isModifier && isOKey) {
            // Stop browser default "Open File" dialogue instantly
            e.preventDefault();
            e.stopPropagation();
            
            setOrgModalOpen(true);
        }
        if (e.key === "Escape") {
            if (orgSlug) {
                e.preventDefault();
                e.stopPropagation();
                setOrgModalOpen(false);
            }
        }
    }

    // Use capture phase (true) to intercept the event before other elements can block it
    window.addEventListener("keydown", handleKeyDown, true);
    
    return () => {
        window.removeEventListener("keydown", handleKeyDown, true);
    };
}, []);

    return (
        <div className="h-screen w-screen bg-[#000000] text-white overflow-hidden flex flex-col font-sans">
            
            {/* Top Navigation Control */}
            {orgSlug && (
                <div className="p-4 border-b border-[#262626] bg-[#121212] shrink-0 flex justify-between items-center">
                    <button 
                        onClick={() => setOrgModalOpen(true)}
                        className="px-4 py-2 rounded-md bg-[#1E1E1E] border border-[#333333] text-sm text-[#A3A3A3] hover:text-white hover:bg-[#262626] transition font-medium"
                    >
                        {orgSlug}
                    </button>
                    <span className="text-xs text-[#525252] font-mono select-none hidden sm:inline">
                        Press <kbd className="bg-[#1E1E1E] px-1.5 py-0.5 rounded border border-[#333333]">Ctrl</kbd> + <kbd className="bg-[#1E1E1E] px-1.5 py-0.5 rounded border border-[#333333]">O</kbd> to change
                    </span>
                </div>
            )}

            {/* Content Area */}
            <div className="flex-1 min-h-0 w-full">
                {orgSlug ? (
                    <Outlet />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full w-full px-8 text-center bg-[#000000]">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Welcome back!</h2>
                        <p className="text-sm text-[#A3A3A3]">Please select an organization to access your dashboard.</p>
                        <span className="mt-4 text-xs text-[#525252] font-mono">
                            Shortcut: <kbd className="bg-[#121212] px-1.5 py-0.5 rounded border border-[#262626]">Ctrl</kbd> + <kbd className="bg-[#121212] px-1.5 py-0.5 rounded border border-[#262626]">O</kbd>
                        </span>
                    </div>
                )}
            </div>

            <OrgSelectModal
                open={orgModalOpen}
                onClose={() => {
                    if (orgSlug) setOrgModalOpen(false);
                }}
            />
        </div>
    );
}