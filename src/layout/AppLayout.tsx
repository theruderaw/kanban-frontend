import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OrgSelectModal from "../components/org/OrgSelectModal";
import { useOrg } from "../hooks/useOrg";

export default function AppLayout() {
    const { orgSlug } = useOrg(); // Assuming useOrg or an auth hook gives you the logged-in user state
    const [orgModalOpen, setOrgModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Wait until loading is done


        // 3. POST-LOGIN: They are logged in (user exists), but haven't selected an org yet
        if (!orgSlug) {
            setOrgModalOpen(true);
        }
    }, [orgSlug, navigate]);



    return (
        <div>
            {/* Hide main navigation controls if they haven't picked an org yet */}
            {orgSlug && (
                <button onClick={() => setOrgModalOpen(true)}>
                    Select Org
                </button>
            )}

            {/* Only render the application views once they have chosen an organization */}
            {orgSlug ? (
                <Outlet />
            ) : (
                <div style={{ padding: "2rem", textAlign: "center" }}>
                    <h2>Welcome back!</h2>
                    <p>Please select an organization to access your dashboard.</p>
                </div>
            )}

            <OrgSelectModal
                open={orgModalOpen}
                onClose={() => {
                    // Prevent closing the modal without a selection post-login
                    if (orgSlug) setOrgModalOpen(false);
                }}
            />
        </div>
    );
}