export type UserRole = "seller" | "manager";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type ProposalStatus = "pending" | "approved" | "rejected" | "draft";

export interface Proposal {
  id: string;
  customerName: string;
  customerEmail: string;
  product: string;
  value: number;
  description: string;
  status: ProposalStatus;
  createdBy: string;
  createdByName: string;
  approvedBy?: string;
  approvedByName?: string;
  createdAt: string;
  updatedAt: string;
}

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
    product: string;
    count: number;
    value: number;
  }>;
}
