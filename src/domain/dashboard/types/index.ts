export interface DashboardMetrics {
  totalProposals: number;
  pendingProposals: number;
  approvedProposals: number;
  rejectedProposals: number;
  totalValue: number;
  approvalRate: number;
  proposalsByMonth: Array<{
    month: string;
    total: number;
    approved: number;
    rejected: number;
  }>;
  topProducts: Array<{
    name: string;
    count: number;
    value: number;
  }>;
}
