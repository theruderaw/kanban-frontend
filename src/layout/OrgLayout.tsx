import { Outlet } from "react-router-dom";
import Sidebar  from "../components/sidebar/Sidebar";
 
export default function OrgLayout() {
    return (
        <div className="flex h-full">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}