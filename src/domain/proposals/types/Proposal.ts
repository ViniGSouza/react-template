import type { ProposalStatus } from "./ProposalStatus";

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
