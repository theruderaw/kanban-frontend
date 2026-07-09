import { useCallback, useEffect, useState } from "react";

import { getDashboard } from "../api/dashboard.api";
import type { DashboardResponse } from "../types/dashboard";


export function useDashboard() {

    const [data, setData] = useState<DashboardResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const loadDashboard = useCallback(async () => {

        try {
            setLoading(true);
            setError(null);

            const response = await getDashboard();

            setData(response);

        } catch (err) {

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load dashboard"
            );

        } finally {

            setLoading(false);

        }

    }, []);


    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);


    return {
        data,
        loading,
        error,
        refresh: loadDashboard
    };
}