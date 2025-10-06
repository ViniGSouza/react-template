import { api } from "@/api";
import type { DashboardMetrics } from "../types";

export const dashboardApi = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    const response = await api.get<DashboardMetrics>("/dashboard/metrics");
    return response.data;
  },
};
