import { Outlet } from "react-router-dom";

/**
 * OrgProvider is now a thin layout route wrapper.
 * Org state is managed by Zustand (useOrgStore / useOrg).
 */
export default function OrgProvider() {
    return <Outlet />;
}