import { api } from "@/api";

export interface DashboardMetrics {
  totalProposals: number;
  pendingProposals: number;
  approvedProposals: number;
  rejectedProposals: number;
  approvalRate: number;
  totalValue: number;
  proposalsByMonth: Array<{
    month: string;
    total: number;
    approved: number;
    rejected: number;
  }>;
  topProducts: Array<{ name: string; count: number; value: number }>;
}

export const dashboardApi = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    const response = await api.get<DashboardMetrics>("/dashboard/metrics");
    return response.data;
  },
};
