import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getToken } from "../../api/axios";

export default function ProtectedRoute() {
    const location = useLocation();

    if (!getToken()) {
        return (
            <Navigate
                to="/"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
}