import { useState } from "react";
import { Outlet } from "react-router-dom";
import { OrgContext } from "./OrgContext";

export default function OrgProvider() {
    // Read directly from localStorage on initialization. 
    // If your auth file cleared it on login, this will safely start as null.
    const [orgSlug, setOrgSlugState] = useState<string | null>(
        localStorage.getItem("orgSlug")
    );

    function setOrgSlug(slug: string) {
        setOrgSlugState(slug);
        localStorage.setItem("orgSlug", slug);
    }

    return (
        <OrgContext.Provider
            value={{
                orgSlug,
                setOrgSlug,
            }}
        >
            <Outlet />
        </OrgContext.Provider>
    );
}