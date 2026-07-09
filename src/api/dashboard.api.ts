import {api} from "./axios";
import type { DashboardResponse } from "../types/dashboard";


export async function getDashboard(): Promise<DashboardResponse> {
    const response = await api.get<DashboardResponse>("/org");

    return response.data;
}