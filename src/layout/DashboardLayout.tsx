import { Outlet } from "react-router-dom";

export default function DashboardLayout() {

    return (
        <div className="relative flex h-screen overflow-hidden">

            <aside className="w-72 shrink-0 border-r border-neutral-800">
                Sidebar
            </aside>

            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>

            

        </div>
    );
}