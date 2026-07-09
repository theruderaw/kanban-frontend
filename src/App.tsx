import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./components/auth/Auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import AppLayout from "./layout/AppLayout";
import DashboardLayout from "./layout/DashboardLayout";
import OrgLayout from "./layout/OrgLayout";

import DashboardPage from "./pages/DashboardPage";
// import ProjectPage from "./pages/ProjectPage";
// import BoardPage from "./pages/BoardPage";

import OrgProvider from "./context/org/OrgProvider";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Auth />} />

                <Route element={<ProtectedRoute />}>
                    <Route element={<OrgProvider />}>
                        <Route element={<AppLayout />}>

                            <Route path="/dashboard" element={<DashboardLayout />}>
                                <Route index element={<DashboardPage />} />
                            </Route>

                            <Route path="/:orgSlug" element={<OrgLayout />}>
                                {/* <Route path=":projectSlug" element={<ProjectPage />} /> */}
                                {/* <Route path=":projectSlug/:boardSlug" element={<BoardPage />} /> */}
                            </Route>

                        </Route>
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}